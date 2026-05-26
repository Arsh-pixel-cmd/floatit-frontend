import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ToastContainer } from './components/ToastContainer';
import html2canvas from 'html2canvas';

// Core Schema & Logic
import { WORKFLOW_PHASES, EDGES, TOOL_REGISTRY } from './data/schema';
import { validateGraph } from './lib/graphValidator';
import { computeLayout } from './lib/layoutEngine';
import { computeEdgePath, bundleEdges } from './lib/edgeRouter';
import { useWorkflowStore, selectActiveNodeId, type WorkflowStoreState } from './lib/store';
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
import PipelineSidebar from './components/Engine/PipelineSidebar';
import FlowControls from './components/FlowControls';
import NodeContainer from './components/NodeContainer';
import PhaseSummaryBox from './components/PhaseSummaryBox';
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
  const selectedNodeId = useWorkflowStore(selectActiveNodeId);
  const selectNode = useWorkflowStore((state: WorkflowStoreState) => state.selectNode);
  const nodeStates = useWorkflowStore((state: WorkflowStoreState) => state.nodeStates);
  const nodeResults = useWorkflowStore((state: WorkflowStoreState) => state.nodeResults);
  const currentPhaseIndex = useWorkflowStore((state: WorkflowStoreState) => state.currentPhaseIndex);

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

    return () => {};
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
    if (deployedTemplateId && viewMode === 'pipeline') {
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
  }, [graphStatus, deployedTemplateId, viewMode, templates]);

  // Bundle Edges 
  const bundledEdges = useMemo(() => {
    if (graphStatus === 'error' || graphStatus === 'idle') return [];
    if (deployedTemplateId && viewMode === 'pipeline') return []; // Use custom logic below
    return bundleEdges(EDGES);
  }, [graphStatus, deployedTemplateId, viewMode]);

  const customEdges = useMemo(() => {
    if (!deployedTemplateId || viewMode !== 'pipeline') return [];
    const activeTemplate = templates.find((t: any) => t.id === deployedTemplateId);
    if (!activeTemplate || !layout) return [];
    return activeTemplate.connections.map((c: any) => {
      const s = layout[c.sourceBlockId];
      const t = layout[c.targetBlockId];
      if (!s || !t) return null;
      const p1 = { x: s.x + 140, y: s.y + 70 };
      const p2 = { x: t.x, y: t.y + 70 };
      return {
        _coreId: c.id,
        id: c.id,
        from: c.sourceBlockId,
        to: c.targetBlockId,
        d: computeEdgePath(p1, p2, { sPort: 'right', tPort: 'left' })
      };
    }).filter(Boolean);
  }, [deployedTemplateId, viewMode, templates, layout]);

  const runFullPipeline = useCallback(async () => {
    if (!layout || graphStatus === 'running') return;
    const store = useWorkflowStore.getState();

    if (!projectPrompt || projectPrompt.trim() === '') {
      addToast('info', 'Please enter a project directive in the top bar.');
      return;
    }

    // --- PRE-CHECK API KEY ---
    const seqId = localStorage.getItem('active_sequence_id');
    if (seqId) {
      const status = await checkKeyAvailability(seqId);
      setKeyInfo(status);
      if (!status.any) {
        setKeyModalType('NO_KEY');
        setShowKeyModal(true);
        return;
      }
    }

    // Update sequence title in Supabase to match the prompt (handled by autosave)
    // No explicit call needed here anymore to avoid redundant writes

    store.setGraphStatus('running');
    store.resetExecution(Object.keys(layout));

    // Check if we're running a deployed template or default schema
    const activeTemplate = deployedTemplateId ? templates.find((t: any) => t.id === deployedTemplateId) : null;

    if (activeTemplate) {
      // --- DEPLOYED TEMPLATE EXECUTION (topological order) ---
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
        (adj[curr] || []).forEach((neighbor: any) => {
          depths[neighbor] = Math.max(depths[neighbor]!, depths[curr]! + 1);
          inDegree[neighbor]!--;
          if (inDegree[neighbor] === 0) queue.push(neighbor);
        });
      }

      const maxDepth = Math.max(0, ...Object.values(depths));
      const phaseLabels = WORKFLOW_PHASES.map(p => p.label);

      setCompletedPhases([]);
      for (let d = 0; d <= maxDepth; d++) {
        const phaseIndex = Math.min(d, WORKFLOW_PHASES.length - 1);
        const currentPhaseObj = WORKFLOW_PHASES[phaseIndex];
        if (currentPhaseObj) setRunningPhaseId(currentPhaseObj.id);
        store.setCurrentPhaseIndex(phaseIndex);

        const nodesAtDepth = activeTemplate.blocks.filter((b: any) => (depths[b.id] || 0) === d).map((b: any) => b.id);
        const currentActive = store.animationState.activeNodes;
        store.setAnimationState({ activeNodes: [...currentActive, ...nodesAtDepth] });

        let neuralContext = '';
        if (d > 0) {
          const prevNodes = activeTemplate.blocks.filter((b: any) => (depths[b.id] || 0) === d - 1).map((b: any) => b.id);
          const currentResults = store.nodeResults || {};
          neuralContext = prevNodes
            .map((id: any) => currentResults[id]?.content)
            .filter(Boolean)
            .join('\n\n---\n\n');
        }

        const CONCURRENCY_LIMIT = 2;
        for (let batchIdx = 0; batchIdx < nodesAtDepth.length; batchIdx += CONCURRENCY_LIMIT) {
          const batch = nodesAtDepth.slice(batchIdx, batchIdx + CONCURRENCY_LIMIT);
          await Promise.all(batch.map(async (nId: any, idx: number) => {
            // Stagger requests to avoid burst rate limits (1.5 seconds per node in batch)
            if (idx > 0) await new Promise(resolve => setTimeout(resolve, idx * 1500));
            const nodeInfo = (layout as any)[nId];
            const agentData = {
              id: nId,
              phaseLabel: phaseLabels[phaseIndex] || `Phase ${d + 1}`,
              categoryName: nodeInfo?.category?.name || 'Agent',
              name: nodeInfo?.category?.name || 'Agent'
            };

            let resolved = false;
            while (!resolved) {
              store.setNodeState(nId, 'running');
              try {
                const taskObj = `Project directive: ${store.projectPrompt}\n\nExecute agentic objective for ${agentData.name} within the ${agentData.phaseLabel} architecture phase. Provide deep expert analysis based on the project directive.`;

                const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT_STUCK')), 45000));
                const result: any = await Promise.race([
                  callLLM(taskObj, agentData, neuralContext, store.projectAttachment),
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

        if (currentPhaseObj) {
          setCompletedPhases(prev => [...prev.filter(id => id !== currentPhaseObj.id), currentPhaseObj.id]);
        }
        setRunningPhaseId(null);

        if (d < maxDepth) {
          const nextPhaseIndex = Math.min(d + 1, WORKFLOW_PHASES.length - 1);
          setPhaseOverlay({
            phase: d + 1,
            phaseName: phaseLabels[phaseIndex] || `Phase ${d + 1}`,
            nextPhaseName: phaseLabels[nextPhaseIndex] || `Phase ${d + 2}`
          });
          await new Promise(r => setTimeout(r, 2000));
          setPhaseOverlay(null);
        }
      }
    } else {
      // --- DEFAULT SCHEMA EXECUTION (original logic) ---
      setCompletedPhases([]);
      for (let i = 0; i < WORKFLOW_PHASES.length; i++) {
        const phase = WORKFLOW_PHASES[i]!;
        setRunningPhaseId(phase.id);
        store.setCurrentPhaseIndex(i);

        const phaseNodes = phase.categories.map((c: any) => `${phase.id}::${c}`);
        const currentActive = store.animationState.activeNodes;
        store.setAnimationState({ activeNodes: [...currentActive, ...phaseNodes] });

        let neuralContext = '';
        if (i > 0) {
          const prevPhase = WORKFLOW_PHASES[i - 1]!;
          const prevPhaseNodes = prevPhase.categories.map((c: any) => `${prevPhase.id}::${c}`);
          const currentResults = store.nodeResults || {};
          neuralContext = prevPhaseNodes
            .map((id: any) => currentResults[id]?.content)
            .filter(Boolean)
            .join('\n\n---\n\n');
        }

        const CONCURRENCY_LIMIT = 2;
        for (let batchIdx = 0; batchIdx < phaseNodes.length; batchIdx += CONCURRENCY_LIMIT) {
          const batch = phaseNodes.slice(batchIdx, batchIdx + CONCURRENCY_LIMIT);
          await Promise.all(batch.map(async (nId: any, idx: number) => {
            // Stagger requests to avoid burst rate limits (1.5 seconds per node in batch)
            if (idx > 0) await new Promise(resolve => setTimeout(resolve, idx * 1500));
            const nodeCategory = nId.split('::')[1];
            const agentData = {
              id: nId,
              phaseLabel: phase.label,
              categoryName: nodeCategory,
              name: (layout as any)[nId]?.category?.name || nodeCategory
            };

            let resolved = false;
            while (!resolved) {
              store.setNodeState(nId, 'running');
              try {
                const taskObj = `Project directive: ${store.projectPrompt}\n\nExecute agentic objective for ${agentData.name} within the ${agentData.phaseLabel} architecture phase. Provide deep expert analysis based on the project directive.`;

                const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT_STUCK')), 45000));
                const result: any = await Promise.race([
                  callLLM(taskObj, agentData, neuralContext, store.projectAttachment),
                  timeoutPromise
                ]);

                if (result && result._errorType) {
                  store.setNodeResult(nId, result);
                  store.setNodeState(nId, 'stuck_debugger');
                } else {
                  store.setNodeResult(nId, result);
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

        setCompletedPhases(prev => [...prev.filter(id => id !== phase.id), phase.id]);
        setRunningPhaseId(null);

        if (i < WORKFLOW_PHASES.length - 1) {
          setPhaseOverlay({
            phase: i + 1,
            phaseName: phase.label,
            nextPhaseName: WORKFLOW_PHASES[i + 1]!.label
          });
          await new Promise(r => setTimeout(r, 2000));
          setPhaseOverlay(null);
        }
      }
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
  }, [layout, graphStatus, projectPrompt, deployedTemplateId, templates]);

  // ── PHASE-GATED EXECUTION ─────────────────────────────────────
  const runPhase = useCallback(async (phaseId: string) => {
    if (!layout || runningPhaseId) return;
    const store = useWorkflowStore.getState();

    if (!projectPrompt || projectPrompt.trim() === '') {
      addToast('info', 'Please enter a project directive first.');
      return;
    }

    // Gate check — previous phase must be complete
    const phaseIndex = WORKFLOW_PHASES.findIndex(p => p.id === phaseId);
    if (phaseIndex > 0) {
      const prevPhase = WORKFLOW_PHASES[phaseIndex - 1]!;
      if (!completedPhases.includes(prevPhase.id)) {
        addToast('warning', `Complete ${prevPhase.label} first before running ${WORKFLOW_PHASES[phaseIndex]!.label}.`);
        return;
      }
    }

    // API key check
    const seqId = localStorage.getItem('active_sequence_id');
    if (seqId) {
      const status = await checkKeyAvailability(seqId);
      setKeyInfo(status);
      if (!status.any) {
        setKeyModalType('NO_KEY');
        setShowKeyModal(true);
        return;
      }
    }

    setRunningPhaseId(phaseId);
    store.setGraphStatus('running');

    const phase = WORKFLOW_PHASES[phaseIndex]!;
    const phaseNodes = phase.categories.map((c: any) => `${phase.id}::${c}`);

    // Build neural context from the previous phase's completed results
    let neuralContext = '';
    if (phaseIndex > 0) {
      const prevPhase = WORKFLOW_PHASES[phaseIndex - 1]!;
      const prevNodes = prevPhase.categories.map((c: any) => `${prevPhase.id}::${c}`);
      neuralContext = prevNodes
        .map((id: any) => store.nodeResults[id]?.content)
        .filter(Boolean)
        .join('\n\n---\n\n');
      if (neuralContext) {
        neuralContext = `PHASE CONTEXT FROM [${prevPhase.label.toUpperCase()}]:\n${neuralContext.substring(0, 6000)}`;
      }
    }

    // Mark all phase nodes as idle first
    phaseNodes.forEach((nId: string) => store.setNodeState(nId, 'idle'));
    store.setCurrentPhaseIndex(phaseIndex);
    store.setAnimationState({ activeNodes: phaseNodes });

    // Execute nodes in batches of 3
    const CONCURRENCY_LIMIT = 3;
    for (let batchIdx = 0; batchIdx < phaseNodes.length; batchIdx += CONCURRENCY_LIMIT) {
      const batch = phaseNodes.slice(batchIdx, batchIdx + CONCURRENCY_LIMIT);
      await Promise.all(batch.map(async (nId: string) => {
        const agentData = {
          id: nId,
          phaseLabel: phase.label,
          categoryName: nId.split('::')[1],
          name: (layout as any)[nId]?.category?.name || nId.split('::')[1]
        };

        let resolved = false;
        while (!resolved) {
          store.setNodeState(nId, 'running');
          try {
            const taskObj = `Project directive: ${store.projectPrompt}\n\nExecute agentic objective for ${agentData.name} within the ${agentData.phaseLabel} phase. Provide deep expert analysis.`;
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT_STUCK')), 45000));
            const result: any = await Promise.race([
              callLLM(taskObj, agentData, neuralContext, store.projectAttachment),
              timeoutPromise
            ]);

            if (result?._errorType) {
              store.setNodeResult(nId, result);
              store.setNodeState(nId, 'stuck_debugger');
            } else {
              store.setNodeResult(nId, result);
              store.setNodeState(nId, 'completed');
              resolved = true;
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

    // Phase complete
    setCompletedPhases(prev => [...prev.filter(id => id !== phaseId), phaseId]);
    setRunningPhaseId(null);

    const allDone = WORKFLOW_PHASES.every((p, idx) =>
      idx <= phaseIndex ? true : completedPhases.includes(p.id)
    );

    if (phaseIndex === WORKFLOW_PHASES.length - 1 || allDone) {
      store.setGraphStatus('completed');
      const end = Date.now() + 2000;
      (function frame() {
        confetti({ particleCount: 8, angle: 60, spread: 70, origin: { x: 0 }, colors: ['#46B1FF', '#CEA3FF', '#DEF767'] });
        confetti({ particleCount: 8, angle: 120, spread: 70, origin: { x: 1 }, colors: ['#A259FF', '#DEF767', '#ffffff'] });
        if (Date.now() < end) requestAnimationFrame(frame);
      }());
    } else {
      store.setGraphStatus('ready');
    }

    addToast('success', `${phase.label} phase complete! Download the report or run the next phase.`);
  }, [layout, projectPrompt, completedPhases, runningPhaseId, deployedTemplateId, templates]);

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

      {/* ── Permanent Neuro-Command (Project Prompt) ── */}
      {viewMode === 'pipeline' && (
        <PromptBar
          projectPrompt={projectPrompt}
          setProjectPrompt={setProjectPrompt}
          projectAttachment={projectAttachment}
          setProjectAttachment={setProjectAttachment}
          graphStatus={graphStatus}
          addToast={addToast}
          runFullPipeline={runFullPipeline}
          showKeyModal={showKeyModal}
          setShowKeyModal={setShowKeyModal}
          setKeyModalType={setKeyModalType}
          keyInfo={keyInfo}
          fileInputRef={fileInputRef}
          completedPhases={completedPhases}
          runningPhaseId={runningPhaseId}
          setPhaseOutputModal={setPhaseOutputModal}
          runPhase={runPhase}
          tokenLimitModal={tokenLimitModal}
        />
      )}

      {viewMode === 'pipeline' && <FlowControls setCamera={setCamera} camera={camera} />}
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
            {/* Background Phase Labels */}
            {viewMode === 'pipeline' && WORKFLOW_PHASES.map((p, idx) => {
              const phaseNodes = Object.values(layout).filter(n => n.phase === p.id);
              if (phaseNodes.length === 0) return null;

              const minX = Math.min(...phaseNodes.map(n => n.x));
              const maxX = Math.max(...phaseNodes.map(n => n.x));
              const centerX = minX + (maxX - minX) / 2;

              return (
                <React.Fragment key={idx}>
                  <div
                    className="absolute pointer-events-none phase-label"
                    style={{
                      left: centerX,
                      top: 100, // Top of canvas
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="text-2xl font-black tracking-[0.4em] mb-1 text-center" style={{ opacity: 0.6 }}>
                      {p.label}
                    </div>
                    <div className="text-[9px] font-bold tracking-[0.6em] uppercase text-center mx-auto" style={{ opacity: 0.4, paddingLeft: '0.6em' }}>
                      {p.subtitle}
                    </div>
                  </div>

                  <PhaseSummaryBox phase={p} x={centerX} y={800} />
                </React.Fragment>
              );
            })}

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

              {viewMode === 'pipeline' && bundledEdges.map((edge: any, idx: any) => {
                const fromLayout = (layout as any)[edge.from];
                const toLayout = (layout as any)[edge.to];
                if (!fromLayout || !toLayout) return null;

                const fromAnchor = { x: fromLayout.x + 140, y: fromLayout.y + 70 };
                const toAnchor = { x: toLayout.x, y: toLayout.y + 70 };

                const pathString = computeEdgePath(fromAnchor, toAnchor, edge.routeConfig);
                const isActive = nodeStates[edge.from] === 'running' || nodeStates[edge.from] === 'completed';

                return (
                  <path
                    key={idx}
                    d={pathString}
                    strokeWidth="2"
                    fill="none"
                    className={`thread-wire ${isActive ? 'thread-active' : 'thread-idle'}`}
                  />
                );
              })}
              {viewMode === 'pipeline' && customEdges.map((edge: any, idx: any) => {
                const isActive = nodeStates[edge.from] === 'running' || nodeStates[edge.from] === 'completed';
                return (
                  <path
                    key={`custom-${idx}`}
                    d={edge.d}
                    strokeWidth="2"
                    fill="none"
                    className={`thread-wire ${isActive ? 'thread-active' : 'thread-idle'}`}
                  />
                );
              })}
            </svg>

            {/* Builder Canvas */}
            {viewMode === 'builder' && (
              <BuilderCanvas activeTool={activeTool} setActiveTool={setActiveTool} getCanvasCoords={getCanvasCoords} />
            )}

            {/* Agent Nodes */}
            {viewMode === 'pipeline' && Object.values(layout as any).map((node: any) => {
              const animState = useWorkflowStore.getState().animationState;
              const isVisible = animState.activeNodes.includes(node.id) || graphStatus === 'ready' || graphStatus === 'completed' || graphStatus === 'running';

              // Determine phase index for opacity - works for both schema and builder nodes
              let parsePhaseIdx = -1;
              if (node.phase) {
                parsePhaseIdx = WORKFLOW_PHASES.findIndex(p => p.id === node.phase);
              } else if (node.id.includes('::')) {
                parsePhaseIdx = WORKFLOW_PHASES.findIndex(p => p.id === node.id.split('::')[0]);
              }
              const isPendingPhase = parsePhaseIdx >= 0 && parsePhaseIdx > currentPhaseIndex;

              return (
                <div key={node.id} style={{ opacity: isPendingPhase ? 0.5 : 1 }} className="transition-opacity duration-700">
                  <NodeContainer
                    node={node}
                    state={nodeStates[node.id] || 'idle'}
                    onClick={() => selectNode(node.id)}
                    isVisible={isVisible}
                  />
                </div>
              )
            })}
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
        {viewMode === 'builder' ? (
          <BuilderSidebar />
        ) : (
          <PipelineSidebar
            selectedNodeId={selectedNodeId}
            layout={layout as Record<string, any>}
            nodeResults={nodeResults}
            onClose={() => selectNode(null)}
          />
        )}
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
