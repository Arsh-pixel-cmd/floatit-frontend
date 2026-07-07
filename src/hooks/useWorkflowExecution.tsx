import React, { useCallback } from 'react';
import { useToastStore } from '../lib/toastStore';
import { useWorkflowStore } from '../lib/store';
import { useBuilderStore } from '../lib/builderStore';
import { callLLM, checkKeyAvailability } from '../lib/llm';
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

  const addToast = useToastStore((state) => state.addToast);

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
        const useDefault = localStorage.getItem('use_default_key') === 'true';
        if (!useDefault) {
          addToast('warning', (
            <div className="flex flex-col gap-2 pointer-events-auto">
              <span className="font-bold text-white text-[13px] leading-tight">
                Since you have not provided any key, do you want to enter your key or go to the FloatIt default keys?
              </span>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => {
                    setKeyModalType('NO_KEY');
                    setShowKeyModal(true);
                  }}
                  className="bg-[#DEF767] text-[#121212] text-[11px] font-extrabold px-3 py-1.5 rounded-xl hover:bg-[#DEF767]/90 active:scale-95 transition-all cursor-pointer"
                >
                  Enter Key
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('use_default_key', 'true');
                    runSingleGroup(groupId, prevGroupOutputContext);
                  }}
                  className="bg-white/10 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-xl hover:bg-white/20 active:scale-95 transition-all border border-white/15 cursor-pointer"
                >
                  Use Default Keys
                </button>
              </div>
            </div>
          ));
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
          store.setNodeState(nId, 'running');
          try {
            const taskObj = `Project directive: ${store.projectPrompt}\n\nObjective: ${block.description}\n\nExecute agentic objective for ${agentData.name} within the ${agentData.phaseLabel} architecture phase. Provide deep expert analysis based on the project directive.`;

            const isDefaultFallback = localStorage.getItem('use_default_key') === 'true';
            const timeoutDuration = isDefaultFallback ? 120000 : 45000;
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT_STUCK')), timeoutDuration));
            const result: any = await Promise.race([
              callLLM(taskObj, agentData, prevGroupOutputContext, projectAttachment, isDefaultFallback),
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
        const isDefaultFallback = localStorage.getItem('use_default_key') === 'true';
        const timeoutDuration = isDefaultFallback ? 120000 : 45000;
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT_STUCK')), timeoutDuration));
        const result: any = await Promise.race([
          callLLM(synthesisPromptText, outputAgentData, neuralContextForOutput, projectAttachment, isDefaultFallback),
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
  }, [projectPrompt, addToast, setKeyInfo, setKeyModalType, setShowKeyModal, projectAttachment]);

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
  }, [projectPrompt, addToast, runSingleGroup, setPhaseOverlay, setShowOutputScreen]);

  return {
    runSingleGroup,
    runGroupWorkflow,
  };
};

export default useWorkflowExecution;
