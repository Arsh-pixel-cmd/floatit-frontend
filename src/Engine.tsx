import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ToastContainer } from './components/ToastContainer';
import html2canvas from 'html2canvas';

// Core Schema & Logic
import { WORKFLOW_PHASES } from './data/schema';
import { validateGraph } from './lib/graphValidator';
import { computeLayout } from './lib/layoutEngine';

import { useWorkflowStore, type WorkflowStoreState } from './lib/store';
import { callLLM, checkKeyAvailability } from './lib/llm';
import { supabase } from './lib/supabaseClient';
import { useToastStore } from './lib/toastStore';

// Hooks
import { useModalState, usePhaseOverlay, usePromptInput, useCanvasControls } from './hooks/engineHooks';

// Components
import FlowHeader from './components/FlowHeader';
import PhaseTransitionOverlay from './components/Engine/PhaseTransitionOverlay';


import PromptBar from './components/Engine/PromptBar';
import EngineStatusView from './components/Engine/EngineStatusView';
import EngineModalStack from './components/Engine/EngineModalStack';



import ToolDock from './components/ToolDock';
import BuilderCanvas from './components/BuilderCanvas';
import BuilderSidebar from './components/BuilderSidebar';
import TemplatesView from './components/TemplatesView';
import { useBuilderStore, type BuilderStore } from './lib/builderStore';

const Engine = () => {
  const [initError, setInitError] = useState<string | null>(null);

  // Zustand State
  const graphStatus = useWorkflowStore((state: WorkflowStoreState) => state.graphStatus);
  const setGraphStatus = useWorkflowStore((state: WorkflowStoreState) => state.setGraphStatus);

  const nodeResults = useWorkflowStore((state: WorkflowStoreState) => state.nodeResults);


  const viewMode = useBuilderStore((state: BuilderStore) => state.viewMode);
  const deployedTemplateId = useBuilderStore((state: BuilderStore) => state.deployedTemplateId);
  const templates = useBuilderStore((state: BuilderStore) => state.templates);

  const {
    projectPrompt,
    setProjectPrompt,
    projectAttachment,
    setProjectAttachment,
    fileInputRef,
  } = usePromptInput();

  const {
    showKeyModal,
    setShowKeyModal,
    keyModalType,
    setKeyModalType,
    keyInfo,
    setKeyInfo,
    tokenLimitModal,
    setTokenLimitModal,
    phaseOutputModal,
    setPhaseOutputModal,
    showOutputScreen,
    setShowOutputScreen,
  } = useModalState();

  const {
    phaseOverlay,
    setPhaseOverlay,
    completedPhases,
    setCompletedPhases,
    runningPhaseId,
    setRunningPhaseId,
  } = usePhaseOverlay();

  const {
    canvasRef,
    camera,
    setCamera,
    isPanning,
    activeTool,
    setActiveTool,
    stickyNotes,
    setStickyNotes,
    strokes,
    setStrokes,
    currentStroke,
    setCurrentStroke,
    textLabels,
    setTextLabels,
    canvasLocked,
    setCanvasLocked,
    draggingAppElement,
    setDraggingAppElement,
    resizingAppElement,
    setResizingAppElement,
    editingStickyId,
    setEditingStickyId,
    editingLabelId,
    setEditingLabelId,
    preFocusCamera,
    getCanvasCoords,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useCanvasControls();

  const addToast = useToastStore((state) => state.addToast);

  // Boot validation
  useEffect(() => {
    const loadCanvasData = async () => {
      try {
        setGraphStatus('loading');

        // Clear stale state before loading
        useBuilderStore.setState({
          blocks: [],
          connections: [],
          stickyNotes: [],
          textLabels: [],
          selectedElementId: null,
          groups: [],
          selectedBlockIds: new Set(),
          runningGroupId: null,
          completedGroupIds: []
        });

        const seqId = localStorage.getItem('active_sequence_id');
        if (seqId) {
          const { data } = await supabase.from('sequences').select('canvas_state, title').eq('id', seqId).single();
          if (data?.canvas_state) {
            const state = data.canvas_state;
            useBuilderStore.setState({
              blocks: state.blocks || [],
              connections: state.connections || [],
              stickyNotes: state.stickyNotes || [],
              textLabels: state.textLabels || [],
              groups: state.groups || [],
            });

            // Restore the agent outputs and progress!
            if (state.execution) {
              useWorkflowStore.setState({
                nodeStates: state.execution.nodeStates || {},
                nodeResults: state.execution.nodeResults || {},
                currentPhaseIndex: state.execution.currentPhaseIndex || 0,
                projectPrompt: state.execution.projectPrompt || (data.title !== 'New Neural Sequence' ? data.title : '')
              });
            } else if (!state.execution?.projectPrompt && data.title && data.title !== 'Untitled Flow') {
              useWorkflowStore.setState({ projectPrompt: data.title });
            }

            // Initialize flowTitle
            useWorkflowStore.setState({ flowTitle: data.title || 'Untitled Flow' });

            // Restore the deployed template ID if it was saved in canvas_state
            if (state.deployedTemplateId) {
              useBuilderStore.setState({ deployedTemplateId: state.deployedTemplateId });
            }
          } else if (data) {
            // No canvas state yet: hydrate from landing prompt if present.
            try {
              const landingPrompt = window.localStorage.getItem('landing_prompt');
              if (landingPrompt && landingPrompt.trim()) {
                useWorkflowStore.setState({ projectPrompt: landingPrompt, flowTitle: landingPrompt });
              } else {
                useWorkflowStore.setState({ flowTitle: data.title || 'Untitled Flow' });
              }
            } catch {
              useWorkflowStore.setState({ flowTitle: data.title || 'Untitled Flow' });
            }
          }

          // Fetch templates for the user (do this even if canvas_state is empty)
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            const { data: templates } = await supabase.from('templates').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false });
            if (templates) {
              useBuilderStore.setState({ templates });
            }
          }
        } // end if seqId
        validateGraph();
        setGraphStatus('ready');
      } catch (e: any) {
        console.error(e);
        setInitError(e.message);
        setGraphStatus('error');
      }
    };
    loadCanvasData();

    return () => { };
  }, [setGraphStatus, addToast]);

  // --- AUTO-SAVE BACKGROUND ENGINE ---
  const lastSavedHashRef = useRef<string>('');

  useEffect(() => {
    const seqId = localStorage.getItem('active_sequence_id');
    if (!seqId) return;

    const buildSavePayload = () => {
      const state = useBuilderStore.getState();
      const workflowState = useWorkflowStore.getState();

      const getSessionName = (title: string, prompt: string) => {
        if (title && title !== 'Untitled Flow') return title;
        const trimmed = prompt?.trim().replace(/\s+/g, ' ') || '';
        if (!trimmed) return 'Untitled Flow';
        return trimmed.substring(0, 50) + (trimmed.length > 50 ? '...' : '');
      };

      const canvas_state = {
        blocks: state.blocks,
        connections: state.connections,
        stickyNotes: state.stickyNotes,
        textLabels: state.textLabels,
        deployedTemplateId: state.deployedTemplateId || null,
        groups: state.groups,
        execution: {
          nodeStates: workflowState.nodeStates,
          nodeResults: workflowState.nodeResults,
          currentPhaseIndex: workflowState.currentPhaseIndex,
          projectPrompt: workflowState.projectPrompt
        }
      };

      return {
        canvas_state,
        title: getSessionName(workflowState.flowTitle, workflowState.projectPrompt),
        updated_at: new Date().toISOString()
      };
    };

    const interval = setInterval(async () => {
      if (useWorkflowStore.getState().graphStatus === 'loading') return;
      try {
        const payload = buildSavePayload();
        const currentHash = JSON.stringify({ canvas_state: payload.canvas_state, title: payload.title });

        if (currentHash === lastSavedHashRef.current) return;

        await supabase.from('sequences').update(payload).eq('id', seqId);
        lastSavedHashRef.current = currentHash;
        console.log("[Engine] Auto-save synchronized");
      } catch (err: any) {
        console.error("Auto-save failed", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  // Compute Layout 
  const layout = useMemo(() => {
    if (graphStatus === 'error') return null;
    if (deployedTemplateId) {
      // First try to find in the loaded templates array
      let activeTemplate = templates.find((t: any) => t.id === deployedTemplateId);

      // Fallback: If not in templates array yet (e.g. local deploy), build from builderStore blocks directly
      if (!activeTemplate) {
        const builderState = useBuilderStore.getState();
        if (builderState.blocks.length > 0) {
          activeTemplate = {
            id: deployedTemplateId,
            blocks: builderState.blocks,
            connections: builderState.connections,
          };
        }
      }

      if (activeTemplate) {
        const depths: Record<string, number> = {};
        const adj: Record<string, any[]> = {};
        const inDegree: Record<string, number> = {};

        activeTemplate.blocks.forEach((b: any) => {
          adj[b.id] = [];
          inDegree[b.id] = 0;
          depths[b.id] = 0;
        });

        activeTemplate.connections.forEach((c: any) => {
          if (adj[c.sourceBlockId] && inDegree[c.targetBlockId] !== undefined) {
            adj[c.sourceBlockId]!.push(c.targetBlockId);
            inDegree[c.targetBlockId]!++;
          }
        });

        let queue: any[] = [];
        Object.keys(inDegree).forEach(id => {
          if (inDegree[id] === 0) queue.push(id);
        });

        while (queue.length > 0) {
          const curr = queue.shift();
          adj[curr]!.forEach(neighbor => {
            depths[neighbor] = Math.max(depths[neighbor]!, depths[curr]! + 1);
            inDegree[neighbor]!--;
            if (inDegree[neighbor] === 0) queue.push(neighbor);
          });
        }

        const phaseIds = WORKFLOW_PHASES.map(p => p.id);
        const depthGroups: Record<number, any[]> = {};

        activeTemplate.blocks.forEach((block: any) => {
          const d = depths[block.id] || 0;
          const phaseIndex = Math.min(d, phaseIds.length - 1);
          block.dynamicPhase = phaseIds[phaseIndex];
          if (!depthGroups[d]) depthGroups[d] = [];
          depthGroups[d]!.push(block);
        });

        const newLayout: Record<string, any> = {};
        const maxDepth = Math.max(0, ...Object.keys(depthGroups).map(Number));

        for (let d = 0; d <= maxDepth; d++) {
          const blocksInCol = depthGroups[d] || [];
          const x = 350 + (d * 500);
          const startY = 400 - ((blocksInCol.length - 1) * 200) / 2;

          blocksInCol.forEach((block: any, bIdx: any) => {
            const phaseIndex = Math.min(d, phaseIds.length - 1);
            newLayout[block.id] = {
              id: block.id,
              x: x + (bIdx % 2 !== 0 ? 60 : 0),
              y: startY + (bIdx * 200),
              category: { name: block.name, description: block.description },
              phase: phaseIds[phaseIndex],
              tools: [],
              blockRef: block
            };
          });
        }
        return newLayout;
      }
    }
    return computeLayout('desktop', 2000, 1000);
  }, [graphStatus, deployedTemplateId, templates]);





  const runSingleGroup = useCallback(async (groupId: string, prevGroupOutputContext = '') => {
    const store = useWorkflowStore.getState();
    const builderStore = useBuilderStore.getState();
    
    if (!projectPrompt || projectPrompt.trim() === '') {
      addToast('info', 'Please enter a project directive in the top bar.');
      return null;
    }

    // --- PRE-CHECK API KEY ---
    const seqId = localStorage.getItem('active_sequence_id');
    if (seqId) {
      const status = await checkKeyAvailability(seqId);
      setKeyInfo(status);
      if (!status.any) {
        setKeyModalType('NO_KEY');
        setShowKeyModal(true);
        return null;
      }
    }

    const group = builderStore.groups.find(g => g.id === groupId);
    if (!group) return null;

    builderStore.setRunningGroupId(groupId);
    store.setGraphStatus('running');

    const groupBlockIds = [...group.blockIds, group.outputBlockId];
    store.resetExecution(groupBlockIds);

    const currentBlocks = builderStore.blocks;
    const activeAgents = currentBlocks.filter(b => group.blockIds.includes(b.id));

    const CONCURRENCY_LIMIT = 2;
    for (let batchIdx = 0; batchIdx < activeAgents.length; batchIdx += CONCURRENCY_LIMIT) {
      const batch = activeAgents.slice(batchIdx, batchIdx + CONCURRENCY_LIMIT);
      await Promise.all(batch.map(async (block: any, idx: number) => {
        if (idx > 0) await new Promise(resolve => setTimeout(resolve, idx * 1500));
        const nId = block.id;
        const agentData = {
          id: nId,
          phaseLabel: group.name,
          categoryName: 'Agent',
          name: block.name || 'Agent'
        };

        let resolved = false;
        while (!resolved) {
          store.setNodeState(nId, 'running');
          try {
            const taskObj = `Project directive: ${store.projectPrompt}\n\nObjective: ${block.description}\n\nExecute agentic objective for ${agentData.name} within the ${agentData.phaseLabel} architecture phase. Provide deep expert analysis based on the project directive.`;

            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT_STUCK')), 45000));
            const result: any = await Promise.race([
              callLLM(taskObj, agentData, prevGroupOutputContext, store.projectAttachment),
              timeoutPromise
            ]);

            if (result && result._errorType) {
              store.setNodeResult(nId, { ...result, agentName: agentData.name });
              store.setNodeState(nId, 'stuck_debugger');
            } else {
              store.setNodeResult(nId, { ...result, agentName: agentData.name });
              store.setNodeState(nId, 'completed');
              resolved = true;
              break;
            }
          } catch (err: any) {
            console.error(`[${nId}] Error:`, err);
            store.setNodeState(nId, 'stuck_debugger');
          }

          if (!resolved) {
            await new Promise<void>((resolve) => {
              const checkInterval = setInterval(() => {
                const currentState = useWorkflowStore.getState().nodeStates[nId];
                if (currentState === 'completed') {
                  clearInterval(checkInterval);
                  resolved = true;
                  resolve();
                } else if (currentState === 'running') {
                  clearInterval(checkInterval);
                  resolve();
                }
              }, 500);
            });
          }
        }
      }));
    }

    // Execute output synthesis node
    const outputNodeId = group.outputBlockId;
    const outputBlock = currentBlocks.find(b => b.id === outputNodeId);
    const outputAgentData = {
      id: outputNodeId,
      phaseLabel: group.name,
      categoryName: 'Synthesis Output',
      name: outputBlock?.name || `${group.name} Output`
    };

    const currentResults = store.nodeResults || {};
    const neuralContextForOutput = group.blockIds
      .map((id: string) => currentResults[id]?.content)
      .filter(Boolean)
      .join('\n\n---\n\n');

    let resolvedOutput = false;
    while (!resolvedOutput) {
      store.setNodeState(outputNodeId, 'running');
      try {
        const synthesisPromptText = `Project directive: ${store.projectPrompt}\n\nYou are the synthesis node for the group phase "${group.name}". Synthesize, summarize, and integrate the output results from all agents in this phase. Identify key insights, conflicts, and next steps.`;
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT_STUCK')), 45000));
        const result: any = await Promise.race([
          callLLM(synthesisPromptText, outputAgentData, neuralContextForOutput, store.projectAttachment),
          timeoutPromise
        ]);

        if (result && result._errorType) {
          store.setNodeResult(outputNodeId, { ...result, agentName: outputAgentData.name });
          store.setNodeState(outputNodeId, 'stuck_debugger');
        } else {
          store.setNodeResult(outputNodeId, { ...result, agentName: outputAgentData.name });
          store.setNodeState(outputNodeId, 'completed');
          resolvedOutput = true;
          break;
        }
      } catch (err: any) {
        console.error(`[${outputNodeId}] Output Error:`, err);
        store.setNodeState(outputNodeId, 'stuck_debugger');
      }

      if (!resolvedOutput) {
        await new Promise<void>((resolve) => {
          const checkInterval = setInterval(() => {
            const currentState = useWorkflowStore.getState().nodeStates[outputNodeId];
            if (currentState === 'completed') {
              clearInterval(checkInterval);
              resolvedOutput = true;
              resolve();
            } else if (currentState === 'running') {
              clearInterval(checkInterval);
              resolve();
            }
          }, 500);
        });
      }
    }

    builderStore.addCompletedGroupId(groupId);
    builderStore.setRunningGroupId(null);
    store.setGraphStatus('ready');

    return store.nodeResults[outputNodeId]?.content || '';
  }, [projectPrompt, addToast, checkKeyAvailability]);

  const runGroupWorkflow = useCallback(async () => {
    const store = useWorkflowStore.getState();
    const builderStore = useBuilderStore.getState();

    if (!projectPrompt || projectPrompt.trim() === '') {
      addToast('info', 'Please enter a project directive in the top bar.');
      return;
    }

    if (builderStore.groups.length === 0) {
      addToast('warning', 'Please create at least one phase group before running.');
      return;
    }

    // Ungrouped agents warning
    const agentBlocks = builderStore.blocks.filter(b => b.type === 'agent' && !b.isGroupOutput);
    const assignedBlockIds = new Set<string>();
    builderStore.groups.forEach(g => {
      g.blockIds.forEach(id => assignedBlockIds.add(id));
    });
    const ungroupedAgents = agentBlocks.filter(b => !assignedBlockIds.has(b.id));

    if (ungroupedAgents.length > 0) {
      addToast('warning', 'All agents must be assigned to a phase group before running the workflow.');
      return;
    }

    builderStore.resetGroupExecution();
    store.setGraphStatus('running');

    const sortedGroups = [...builderStore.groups].sort((a, b) => a.order - b.order);

    let prevGroupOutputContext = '';
    for (let i = 0; i < sortedGroups.length; i++) {
      const group = sortedGroups[i]!;
      
      if (i > 0) {
        const prevGroup = sortedGroups[i - 1]!;
        setPhaseOverlay({
          phase: i,
          phaseName: prevGroup.name,
          nextPhaseName: group.name
        });
        await new Promise(r => setTimeout(r, 2000));
        setPhaseOverlay(null);
      }

      const outputContext = await runSingleGroup(group.id, prevGroupOutputContext);
      if (outputContext === null) {
        store.setGraphStatus('ready');
        return;
      }
      prevGroupOutputContext = outputContext;
    }

    store.setGraphStatus('completed');

    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({ particleCount: 8, angle: 60, spread: 70, origin: { x: 0 }, colors: ['#46B1FF', '#CEA3FF', '#DEF767'] });
      confetti({ particleCount: 8, angle: 120, spread: 70, origin: { x: 1 }, colors: ['#A259FF', '#DEF767', '#ffffff'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());

    setTimeout(() => setShowOutputScreen(true), 2500);
  }, [projectPrompt, addToast, runSingleGroup]);



  const rebootSequence = () => {
    const store = useWorkflowStore.getState();
    const nodes = Object.values(layout as any).map((n: any) => n.id);
    store.resetExecution(nodes);
    store.setProjectPrompt('');
    setShowOutputScreen(false);
  };

  if (graphStatus === 'error' || !layout) {
    return <EngineStatusView graphStatus={graphStatus} initError={initError} layout={layout} />;
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden select-none bg-[#0a0a10] text-slate-200 relative">
      <FlowHeader />

      <PhaseTransitionOverlay phaseOverlay={phaseOverlay} />

      {viewMode === 'templates' && <TemplatesView />}
      <PromptBar
        projectPrompt={projectPrompt}
        setProjectPrompt={setProjectPrompt}
        projectAttachment={projectAttachment}
        setProjectAttachment={setProjectAttachment}
        graphStatus={graphStatus}
        addToast={addToast}
        runFullPipeline={runGroupWorkflow}
        showKeyModal={showKeyModal}
        setShowKeyModal={setShowKeyModal}
        setKeyModalType={setKeyModalType}
        keyInfo={keyInfo}
        fileInputRef={fileInputRef}
        completedPhases={completedPhases}
        runningPhaseId={runningPhaseId}
        setPhaseOutputModal={setPhaseOutputModal}
        runPhase={runSingleGroup}
        tokenLimitModal={tokenLimitModal}
      />


      <ToolDock
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        canvasLocked={canvasLocked}
        setCanvasLocked={setCanvasLocked}
        onEraseAll={() => {
          setStickyNotes([]);
          setStrokes([]);
          setTextLabels([]);
          setCurrentStroke(null);
          setProjectAttachment(null);
          // Also reboot the pipeline state
          rebootSequence();
          addToast('info', 'Canvas and pipeline state cleared');
        }}
        onScreenshot={async () => {
          try {
            // Use html2canvas on the entire document body for reliable capture
            const shot = await html2canvas(document.body, {
              backgroundColor: '#0a0a10',
              useCORS: true,
              scale: window.devicePixelRatio || 1,
              logging: false,
              allowTaint: true,
              foreignObjectRendering: true,
            });
            const link = document.createElement('a');
            link.download = `agentic-flow-canvas-${Date.now()}.png`;
            link.href = shot.toDataURL('image/png');
            link.click();
            addToast('success', 'Screenshot saved!');
          } catch (err) {
            console.error('Screenshot failed:', err);
            addToast('error', 'Screenshot failed — try again');
          }
        }}
        onLockToggle={(locked) => {
          addToast(locked ? 'warning' : 'success', locked ? 'Canvas locked — interactions disabled' : 'Canvas unlocked');
        }}
      />

      {/* ── Infinite Node Canvas ── */}
      <div className="flex flex-1 overflow-hidden relative">
        <div
          ref={canvasRef}
          id="canvas-bg"
          className={`flex-1 relative overflow-hidden canvas-grid ${isPanning ? 'is-panning' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="absolute origin-top-left flex pointer-events-none canvas-content"
            style={{
              '--canvas-x': `${camera.x}px`,
              '--canvas-y': `${camera.y}px`,
              '--canvas-zoom': camera.zoom,
            } as React.CSSProperties}
          >
            {/* Phase Column Headers — shown when blocks have phase fields */}
            {(() => {
              const builderBlocks = useBuilderStore.getState().blocks;
              const phases = ['discover', 'define', 'develop', 'deliver'];
              const phaseLabels: Record<string, { label: string; subtitle: string }> = {
                discover: { label: 'DISCOVER', subtitle: 'DIVERGE' },
                define: { label: 'DEFINE', subtitle: 'CONVERGE' },
                develop: { label: 'DEVELOP', subtitle: 'DIVERGE' },
                deliver: { label: 'DELIVER', subtitle: 'CONVERGE' },
              };

              const hasPhases = builderBlocks.some((b: any) => b.phase);
              if (!hasPhases) return null;

              return phases.map(phaseId => {
                const phaseBlocks = builderBlocks.filter((b: any) => b.phase === phaseId);
                if (phaseBlocks.length === 0) return null;

                const xs = phaseBlocks.map((b: any) => b.position.x);
                const centerX = (Math.min(...xs) + Math.max(...xs)) / 2 + 110;
                const info = phaseLabels[phaseId]!;

                return (
                  <div
                    key={phaseId}
                    className="absolute pointer-events-none"
                    style={{ left: centerX, top: 20, transform: 'translateX(-50%)' }}
                  >
                    <div className="text-2xl font-black tracking-[0.4em] mb-1 text-center text-white" style={{ opacity: 0.5 }}>
                      {info.label}
                    </div>
                    <div className="text-[9px] font-bold tracking-[0.6em] uppercase text-center text-white" style={{ opacity: 0.3, paddingLeft: '0.6em' }}>
                      {info.subtitle}
                    </div>
                  </div>
                );
              });
            })()}

            {/* Annotations & Edges */}
            <svg className="absolute inset-0 pointer-events-none w-full h-full overflow-visible z-10">
              <defs>
                <marker id="arrow-lime" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#DEF767" />
                </marker>
              </defs>

              {strokes.map((stroke: any) => (
                <polyline
                  key={`stroke-${stroke.id}`}
                  points={stroke.points.map((p: any) => `${p.x},${p.y}`).join(' ')}
                  stroke="#DEF767" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                  fill="none"
                  opacity="0.6"
                />
              ))}
              {currentStroke && (
                <polyline
                  points={currentStroke.map((p: any) => `${p.x},${p.y}`).join(' ')}
                  stroke="#DEF767" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                  fill="none" opacity="0.6"
                />
              )}



            </svg>

            {/* Builder Canvas */}
            <BuilderCanvas activeTool={activeTool} setActiveTool={setActiveTool} getCanvasCoords={getCanvasCoords} />


            {/* Sticky Notes */}
            {stickyNotes.map((note: any) => {
              const noteColor = note.color || '#A259FF';
              const noteW = note.width || 240;
              const noteH = note.height || 180;
              const isEditing = editingStickyId === note.id;

              return (
                <div key={`sticky-${note.id}`}
                  className={`absolute sticky-note p-3 rounded-2xl z-30 transition-shadow font-secondary flex flex-col group shadow-2xl cursor-grab active:cursor-grabbing ${isEditing ? 'border-[#DEF767]' : 'border-[#2e2e2e]'
                    }`}
                  onMouseDown={(e: any) => {
                    if (isEditing) return; // Don't drag while editing
                    if ((e.target as any).classList.contains('resize-handle')) {
                      e.stopPropagation();
                      setResizingAppElement({ type: 'sticky', id: note.id, elemX: note.x, elemY: note.y });
                      return;
                    }
                    if (activeTool === 'cursor') {
                      e.stopPropagation();
                      const coords = getCanvasCoords(e.clientX, e.clientY);
                      setDraggingAppElement({ type: 'sticky', id: note.id, startX: note.x, startY: note.y, startMouseX: coords.x, startMouseY: coords.y });
                    }
                  }}
                  style={{
                    left: note.x, top: note.y, width: noteW, height: noteH,
                    background: '#181818',
                    pointerEvents: 'auto',
                  }}>
                  <div className="w-full h-1 rounded-t-xl absolute top-0 left-0" style={{ background: isEditing ? '#DEF767' : '#5b5b5b' }} />

                  <button
                    title="Delete sticky note"
                    aria-label="Delete sticky note"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      setStickyNotes(prev => prev.filter(n => n.id !== note.id));
                      if (editingStickyId === note.id) setEditingStickyId(null);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#2e2e2e] text-slate-400 hover:text-white hover:bg-[#ff6a6a] transition-all opacity-0 group-hover:opacity-100 z-50 font-sans"
                  >
                    <X size={12} />
                  </button>

                  <textarea
                    className="flex-1 w-full mt-3 bg-transparent outline-none resize-none text-slate-200 text-sm placeholder-slate-500 custom-scrollbar-neon font-sans"
                    placeholder="Note insights here..."
                    value={note.text}
                    onMouseDown={e => e.stopPropagation()}
                    onFocus={() => {
                      // Auto-zoom to this sticky note
                      preFocusCamera.current = { ...camera };
                      setEditingStickyId(note.id);
                      const canvasEl = canvasRef.current;
                      if (canvasEl) {
                        const rect = canvasEl.getBoundingClientRect();
                        const targetZoom = 1.0;
                        const centerX = rect.width / 2 - (note.x + noteW / 2) * targetZoom;
                        const centerY = rect.height / 2 - (note.y + noteH / 2) * targetZoom;
                        setCamera({ x: centerX, y: centerY, zoom: targetZoom });
                      }
                    }}
                    onBlur={() => {
                      if (preFocusCamera.current) {
                        setCamera(preFocusCamera.current);
                        preFocusCamera.current = null;
                      }
                      setEditingStickyId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        (e.target as HTMLTextAreaElement).blur();
                      }
                    }}
                    onChange={(e) => {
                      setStickyNotes(prev => prev.map(n => n.id === note.id ? { ...n, text: e.target.value } : n));
                    }}
                  />

                  {/* Resize Handle */}
                  <div
                    className="resize-handle absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize opacity-0 group-hover:opacity-100 transition-opacity z-30"
                    style={{
                      background: `linear-gradient(135deg, transparent 50%, ${isEditing ? '#DEF767' : '#5b5b5b'} 50%)`,
                      borderRadius: '0 0 16px 0',
                    }}
                  />
                </div>
              );
            })}

            {/* Text Labels */}
            {textLabels.map(label => {
              const isEditing = editingLabelId === label.id;
              return (
                <div
                  key={`label-${label.id}`}
                  className="absolute z-20 pointer-events-auto group cursor-grab active:cursor-grabbing"
                  style={{ left: label.x - 75, top: label.y - 15 }}
                  onMouseDown={(e: any) => {
                    if (isEditing) return;
                    if (e.target.tagName === 'INPUT') return;
                    e.stopPropagation();
                    const coords = getCanvasCoords(e.clientX, e.clientY);
                    setDraggingAppElement({ type: 'label', id: label.id, startX: label.x, startY: label.y, startMouseX: coords.x, startMouseY: coords.y });
                  }}
                >
                  <input
                    className={`bg-transparent outline-none text-white font-bold w-[150px] placeholder-slate-500 border-b border-dashed pb-1 transition-all font-sans ${isEditing ? 'text-lg border-[#DEF767]' : 'text-sm border-[#2e2e2e] focus:border-[#DEF767]'
                      }`}
                    placeholder="Type label..."
                    value={label.text}
                    onMouseDown={e => e.stopPropagation()}
                    onFocus={() => {
                      preFocusCamera.current = { ...camera };
                      setEditingLabelId(label.id);
                      const canvasEl = canvasRef.current;
                      if (canvasEl) {
                        const rect = canvasEl.getBoundingClientRect();
                        const targetZoom = 1.0;
                        const centerX = rect.width / 2 - label.x * targetZoom;
                        const centerY = rect.height / 2 - label.y * targetZoom;
                        setCamera({ x: centerX, y: centerY, zoom: targetZoom });
                      }
                    }}
                    onBlur={() => {
                      if (preFocusCamera.current) {
                        setCamera(preFocusCamera.current);
                        preFocusCamera.current = null;
                      }
                      setEditingLabelId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === 'Escape') {
                        (e.target as HTMLInputElement).blur();
                      }
                    }}
                    onChange={(e) => {
                      setTextLabels(prev => prev.map(l => l.id === label.id ? { ...l, text: e.target.value } : l));
                    }}
                  />
                  <button
                    onClick={() => setTextLabels(prev => prev.filter(l => l.id !== label.id))}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-md bg-[#2e2e2e] hover:bg-[#ff6a6a] border border-[#2e2e2e] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-sans"
                  >
                    ✕
                  </button>
                </div>
              );
            })}

          </div>
        </div>

        {/* ── Intelligence Layer Output Sidebar ── */}
        <BuilderSidebar />
      </div>

      <EngineModalStack
        showOutputButton={completedPhases.length > 0 || graphStatus === 'completed' || (graphStatus !== 'running' && nodeResults && Object.keys(nodeResults).length > 0)}
        onOpenOutputScreen={() => setShowOutputScreen(true)}
        showOutputScreen={showOutputScreen}
        onCloseOutputScreen={() => setShowOutputScreen(false)}
        phaseOutputModal={phaseOutputModal}
        onClosePhaseOutput={() => setPhaseOutputModal(null)}
        tokenLimitModal={tokenLimitModal}
        onDismissTokenLimit={() => setTokenLimitModal(null)}
        onSwitchApiKey={() => {
          setTokenLimitModal(null);
          setShowKeyModal(true);
          setKeyModalType('NO_KEY');
        }}
        showKeyModal={showKeyModal}
        keyModalType={keyModalType}
        onCloseKeyModal={() => setShowKeyModal(false)}
        onSavedKeyModal={() => {
          const seqId = localStorage.getItem('active_sequence_id');
          if (seqId) checkKeyAvailability(seqId).then(setKeyInfo);
          setShowKeyModal(false);
        }}
      />

      {/* Toast System */}
      <ToastContainer />

    </div>
  );
};

export default Engine;
