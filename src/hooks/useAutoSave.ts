import { useEffect, useRef } from 'react';
import { useBuilderStore } from '../lib/builderStore';
import { useWorkflowStore } from '../lib/store';
import { dbAdapter } from '../lib/database';

/**
 * useAutoSave — Custom hook to manage periodic canvas state synchronization.
 * Follows the Single Responsibility Principle (SRP) and Dependency Inversion Principle (DIP).
 */
export const useAutoSave = () => {
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
      };
    };

    const interval = setInterval(async () => {
      if (useWorkflowStore.getState().graphStatus === 'loading') return;
      try {
        const payload = buildSavePayload();
        const currentHash = JSON.stringify({ canvas_state: payload.canvas_state, title: payload.title });

        if (currentHash === lastSavedHashRef.current) return;

        await dbAdapter.saveCanvasState(seqId, payload.canvas_state, payload.title);
        lastSavedHashRef.current = currentHash;
        console.log("[Engine] Auto-save synchronized");
      } catch (err: any) {
        console.error("Auto-save failed", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);
};

export default useAutoSave;
