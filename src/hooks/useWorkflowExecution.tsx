import React, { useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { useWorkflowStore } from '../lib/store';
import { useBuilderStore } from '../lib/builderStore';
import { checkKeyAvailability } from '../lib/llm';
import { ExecutionStrategyManager } from '../lib/llm/ExecutionStrategyManager';
import confetti from 'canvas-confetti';

interface ExecutionConfig {
  projectPrompt: string;
  projectAttachment: any;
  setKeyInfo: (info: any) => void;
  setShowKeyModal: (show: boolean) => void;
  setKeyModalType: (type: any) => void;
  setPhaseOverlay: (overlay: any) => void;
  setShowOutputScreen: (show: boolean) => void;
}

/**
 * useWorkflowExecution — Custom hook to isolate pipeline running and LLM orchestration logic.
 * Follows the Single Responsibility Principle (SRP).
 */
export const useWorkflowExecution = (config: ExecutionConfig) => {
  const {
    projectPrompt,
    projectAttachment,
    setKeyInfo,
    setShowKeyModal,
    setKeyModalType,
    setPhaseOverlay,
    setShowOutputScreen,
  } = config;

  const activeControllersRef = useRef<Set<AbortController>>(new Set());

  const stopExecution = useCallback(() => {
    // Abort all active fetch controllers (BUG-003)
    activeControllersRef.current.forEach(c => c.abort());
    activeControllersRef.current.clear();

    const store = useWorkflowStore.getState();
    const builderStore = useBuilderStore.getState();

    store.setGraphStatus('ready');
    builderStore.setRunningGroupId(null);

    // Reset any running nodes back to idle
    const currentStates = { ...store.nodeStates };
    Object.keys(currentStates).forEach(id => {
      if (currentStates[id] === 'running') {
        store.setNodeState(id, 'idle');
      }
    });

    toast.success('Workflow execution stopped.');
  }, []);

  const runSingleGroup = useCallback(async (groupId: string, prevGroupOutputContext = '') => {
    const store = useWorkflowStore.getState();
    const builderStore = useBuilderStore.getState();
    
    if (!projectPrompt || projectPrompt.trim() === '') {
      toast.error('Please enter a project directive in the top bar.');
      return null;
    }

    // --- PRE-CHECK API KEY ---
    const seqId = localStorage.getItem('active_sequence_id');
    if (seqId) {
      const status = await checkKeyAvailability(seqId);
      setKeyInfo(status);
      if (!status.any) {
        const useDefault = localStorage.getItem('use_default_key') === 'true';
        if (!useDefault) {
          toast((t) => (
            <div className="flex flex-col gap-2 pointer-events-auto">
              <span className="font-bold text-gray-800 text-[13px] leading-tight">
                Since you have not provided any key, do you want to enter your key or go to the FloatIt default keys?
              </span>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => {
                    setKeyModalType('NO_KEY');
                    setShowKeyModal(true);
                    toast.dismiss(t.id);
                  }}
                  className="bg-[#DEF767] text-[#121212] text-[11px] font-extrabold px-3 py-1.5 rounded-xl hover:bg-[#DEF767]/90 active:scale-95 transition-all cursor-pointer"
                >
                  Enter Key
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('use_default_key', 'true');
                    toast.dismiss(t.id);
                    runSingleGroup(groupId, prevGroupOutputContext);
                  }}
                  className="bg-gray-100 text-gray-800 text-[11px] font-extrabold px-3 py-1.5 rounded-xl hover:bg-gray-200 active:scale-95 transition-all border border-gray-200 cursor-pointer"
                >
                  Use Default Keys
                </button>
              </div>
            </div>
          ), { duration: 10000 });
          return null;
        }
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
          if (useWorkflowStore.getState().graphStatus !== 'running') {
            break;
          }

          const controller = new AbortController();
          activeControllersRef.current.add(controller);
          store.setNodeState(nId, 'running');
          store.setNodeStatusText(nId, 'Contacting LLM provider...');

          try {
            store.setNodeStatusText(nId, 'Analyzing objective & thinking...');
            const taskObj = `Project directive: ${store.projectPrompt}\n\nObjective: ${block.description}\n\nExecute agentic objective for ${agentData.name} within the ${agentData.phaseLabel} architecture phase. Provide deep expert analysis based on the project directive.`;

            const modelType = (block as any).modelType || 'local';
            const strategy = ExecutionStrategyManager.getStrategy(modelType);
            const isDefaultFallback = localStorage.getItem('use_default_key') === 'true';
            
            // Timeout control (BUG-003) - Increased to 180s to prevent stuck timeouts
            const timeoutDuration = 180000;
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => {
              controller.abort();
              reject(new Error('TIMEOUT_STUCK'));
            }, timeoutDuration));

            const result: any = await Promise.race([
              strategy.execute(taskObj, agentData, prevGroupOutputContext, projectAttachment, isDefaultFallback, controller.signal),
              timeoutPromise
            ]);

            if (result && result._errorType) {
              store.setNodeResult(nId, { ...result, agentName: agentData.name });
              store.setNodeState(nId, 'stuck_debugger');
              store.setNodeStatusText(nId, 'Awaiting debugger resolution...');
            } else {
              store.setNodeResult(nId, { ...result, agentName: agentData.name });
              store.setNodeState(nId, 'completed');
              store.setNodeStatusText(nId, 'Output complete');
              resolved = true;
            }
          } catch (err: any) {
            console.error(`[${nId}] Error:`, err);
            store.setNodeState(nId, 'stuck_debugger');
            store.setNodeStatusText(nId, 'Execution halted due to error');
            
            if (err.name === 'AbortError' || useWorkflowStore.getState().graphStatus !== 'running') {
              break;
            }
          } finally {
            activeControllersRef.current.delete(controller);
          }

          // Polling control for debugger or stop event (BUG-003)
          if (!resolved) {
            await new Promise<void>((resolve) => {
              const checkInterval = setInterval(() => {
                const currentState = useWorkflowStore.getState().nodeStates[nId];
                const globalStatus = useWorkflowStore.getState().graphStatus;

                if (globalStatus !== 'running') {
                  store.setNodeState(nId, 'idle');
                  clearInterval(checkInterval);
                  resolved = true;
                  resolve();
                } else if (currentState === 'completed') {
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

      // Check global status after batch
      if (useWorkflowStore.getState().graphStatus !== 'running') return null;
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

    const currentResults = useWorkflowStore.getState().nodeResults || {};
    const neuralContextForOutput = group.blockIds
      .map((id: string) => currentResults[id]?.content)
      .filter(Boolean)
      .join('\n\n---\n\n');

    let resolvedOutput = false;
    while (!resolvedOutput) {
      if (useWorkflowStore.getState().graphStatus !== 'running') {
        break;
      }

      const controller = new AbortController();
      activeControllersRef.current.add(controller);
      store.setNodeState(outputNodeId, 'running');
      store.setNodeStatusText(outputNodeId, 'Reading agent inputs...');

      try {
        store.setNodeStatusText(outputNodeId, 'Synthesizing final phase output...');
        const synthesisPromptText = `Project directive: ${store.projectPrompt}\n\nYou are the synthesis node for the group phase "${group.name}". Synthesize, summarize, and integrate the output results from all agents in this phase. Identify key insights, conflicts, and next steps.`;
        const outputModelType = (outputBlock as any)?.modelType || 'local';
        const strategy = ExecutionStrategyManager.getStrategy(outputModelType);
        const isDefaultFallback = localStorage.getItem('use_default_key') === 'true';
        
        // Timeout control (BUG-003) - Increased to 180s to prevent stuck timeouts
        const timeoutDuration = 180000;
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => {
          controller.abort();
          reject(new Error('TIMEOUT_STUCK'));
        }, timeoutDuration));

        const result: any = await Promise.race([
          strategy.execute(synthesisPromptText, outputAgentData, neuralContextForOutput, projectAttachment, isDefaultFallback, controller.signal),
          timeoutPromise
        ]);

        if (result && result._errorType) {
          store.setNodeResult(outputNodeId, { ...result, agentName: outputAgentData.name });
          store.setNodeState(outputNodeId, 'stuck_debugger');
          store.setNodeStatusText(outputNodeId, 'Awaiting debugger resolution...');
        } else {
          store.setNodeResult(outputNodeId, { ...result, agentName: outputAgentData.name });
          store.setNodeState(outputNodeId, 'completed');
          store.setNodeStatusText(outputNodeId, 'Synthesis complete!');
          resolvedOutput = true;
        }
      } catch (err: any) {
        console.error(`[${outputNodeId}] Output Error:`, err);
        store.setNodeState(outputNodeId, 'stuck_debugger');
        store.setNodeStatusText(outputNodeId, 'Synthesis error');

        if (err.name === 'AbortError' || useWorkflowStore.getState().graphStatus !== 'running') {
          break;
        }
      } finally {
        activeControllersRef.current.delete(controller);
      }

      if (!resolvedOutput) {
        await new Promise<void>((resolve) => {
          const checkInterval = setInterval(() => {
            const currentState = useWorkflowStore.getState().nodeStates[outputNodeId];
            const globalStatus = useWorkflowStore.getState().graphStatus;

            if (globalStatus !== 'running') {
              store.setNodeState(outputNodeId, 'idle');
              clearInterval(checkInterval);
              resolvedOutput = true;
              resolve();
            } else if (currentState === 'completed') {
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

    return useWorkflowStore.getState().nodeResults[outputNodeId]?.content || '';
  }, [projectPrompt, setKeyInfo, setKeyModalType, setShowKeyModal, projectAttachment]);

  const runGroupWorkflow = useCallback(async () => {
    const store = useWorkflowStore.getState();
    const builderStore = useBuilderStore.getState();

    if (!projectPrompt || projectPrompt.trim() === '') {
      toast.error('Please enter a project directive in the top bar.');
      return;
    }

    // Canvas execution guards
    if (builderStore.blocks.length === 0) {
      toast.error('Canvas is empty. Add at least one agent block before running.');
      return;
    }

    // Auto-group ungrouped agent blocks if none exist, or if ungrouped agents remain
    const agentBlocks = builderStore.blocks.filter(b => b.type === 'agent' && !b.isGroupOutput);
    const assignedBlockIds = new Set<string>();
    builderStore.groups.forEach(g => {
      g.blockIds.forEach(id => assignedBlockIds.add(id));
    });
    const ungroupedAgents = agentBlocks.filter(b => !assignedBlockIds.has(b.id));

    if (ungroupedAgents.length > 0) {
      toast.loading('Automatically grouping remaining agents into Phase 1...', { duration: 1500 });
      const ungroupedIds = ungroupedAgents.map(b => b.id);
      useBuilderStore.setState({ selectedBlockIds: ungroupedIds });
      builderStore.createGroup('Phase 1');
      // Wait for store updates to propagate before reading fresh groups
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    builderStore.resetGroupExecution();
    store.setGraphStatus('running');

    const { selectedGroupId } = useWorkflowStore.getState();
    const freshBuilderStore = useBuilderStore.getState();
    const sortedGroups = [...freshBuilderStore.groups]
      .filter(g => selectedGroupId === null || g.id === selectedGroupId)
      .sort((a, b) => a.order - b.order);

    if (sortedGroups.length === 0) {
      store.setGraphStatus('ready');
      toast.error('No agent groups found. Please add agents to the canvas and try again.');
      return;
    }

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
      // null means runSingleGroup was aborted (key error, stop, etc.)
      if (outputContext === null) {
        store.setGraphStatus('ready');
        builderStore.setRunningGroupId(null);
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
  }, [projectPrompt, runSingleGroup, setPhaseOverlay, setShowOutputScreen]);

  return {
    runSingleGroup,
    runGroupWorkflow,
    stopExecution,
  };
};

export default useWorkflowExecution;
