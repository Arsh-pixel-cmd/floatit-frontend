import { create } from 'zustand';
import type { GraphStatus } from '../types/engine';
import { WORKFLOW_PHASES } from '../data/schema';

export interface WorkflowStoreState {
  graphStatus: GraphStatus;
  setGraphStatus: (status: GraphStatus) => void;
  animationState: {
    phase: string;
    activeNodes: string[];
    queuedTransitions: any[];
  };
  setAnimationState: (newState: any) => void;
  projectPrompt: string;
  setProjectPrompt: (prompt: string) => void;
  flowTitle: string;
  setFlowTitle: (title: string) => void;
  projectAttachment: any;
  setProjectAttachment: (attachment: any) => void;
  currentPhaseIndex: number;
  setCurrentPhaseIndex: (idx: any) => void;
  nodeStates: Record<string, any>;
  nodeResults: Record<string, any>;
  nodeStatusTexts: Record<string, string>;
  setNodeState: (nodeId: any, state: any) => void;
  setNodeResult: (nodeId: any, result: any) => void;
  setNodeStatusText: (nodeId: string, text: string) => void;
  resetExecution: (nodes: any) => void;
  layoutMode: string;
  setLayoutMode: (mode: any) => void;
  activeMode: string;
  setActiveMode: (mode: any) => void;
  selectedNodeId: string | null;
  selectedToolId: string | null;
  userContext: {
    role: string;
    budget: string;
    weights: {
      audience: number;
      pricing: number;
      tags: number;
    };
  };
  selectNode: (nodeId: any, _source?: any) => void;
  selectTool: (toolId: any) => void;
  revealedPhases: string[];
  revealNextPhase: () => void;
  selectedGroupId: string | null;
  setSelectedGroupId: (id: string | null) => void;
  editedOutputs: Record<string, string>;
  setEditedOutput: (groupId: string, content: string) => void;
}

export const useWorkflowStore = create<WorkflowStoreState>((set, get) => ({
  // Core Graph State
  graphStatus: 'idle', // idle, loading, ready, error
  setGraphStatus: (status: any) => set({ graphStatus: status }),

  // Animation State Machine
  animationState: {
    phase: 'idle', // idle | entering | exiting | transitioning
    activeNodes: [],
    queuedTransitions: []
  },
  setAnimationState: (newState: any) => set((state: any) => ({ 
    animationState: { ...state.animationState, ...newState } 
  })),
  // Master Project Input
  projectPrompt: '',
  setProjectPrompt: (prompt: any) => set({ projectPrompt: prompt }),
  flowTitle: '',
  setFlowTitle: (title: string) => set({ flowTitle: title }),
  projectAttachment: null, // { name, content, type }
  setProjectAttachment: (attachment: any) => set({ projectAttachment: attachment }),

  // Execution State
  currentPhaseIndex: 0,
  setCurrentPhaseIndex: (idx: any) => set({ currentPhaseIndex: idx }),
  nodeStates: {}, // Record<nodeId, 'idle' | 'running' | 'completed'>
  nodeResults: {}, // Record<nodeId, { content, ui }>
  nodeStatusTexts: {}, // Record<nodeId, string>
  setNodeState: (nodeId: any, state: any) => set((s: any) => ({
    nodeStates: { ...s.nodeStates, [nodeId]: state }
  })),
  setNodeResult: (nodeId: any, result: any) => set((s: any) => ({
    nodeResults: { ...s.nodeResults, [nodeId]: result }
  })),
  setNodeStatusText: (nodeId: string, text: string) => set((s: any) => ({
    nodeStatusTexts: { ...s.nodeStatusTexts, [nodeId]: text }
  })),
  resetExecution: (nodes: any) => {
    const freshStates: Record<string, any> = {};
    nodes.forEach((n: any) => { freshStates[n] = 'idle'; });
    set({ nodeStates: freshStates, nodeResults: {}, nodeStatusTexts: {}, currentPhaseIndex: 0, revealedPhases: [], animationState: { phase: 'idle', activeNodes: [], queuedTransitions: [] } });
  },

  // Layout Constraints
  layoutMode: 'desktop', // desktop | tablet | mobile
  setLayoutMode: (mode: any) => set({ layoutMode: mode }),

  // Explorer vs Advisor modes
  activeMode: 'explorer',
  setActiveMode: (mode: any) => set({ activeMode: mode }),

  // Interaction & Selection
  selectedNodeId: null,
  selectedToolId: null,
  
  // User Context (Scoring Weights for Intelligence Layer)
  userContext: {
    role: 'designer',
    budget: 'paid', // free, freemium, paid
    weights: {
      audience: 2,
      pricing: 1,
      tags: 3
    }
  },

  // State Updates with built-in Priority Resolution Logic
  // eslint-disable-next-line no-unused-vars
  selectNode: (nodeId: any, _source: any = 'manualSelection') => {
    // Determine priority resolution if needed here
    // Manual selection overrides Advisor automated selections
    set({ selectedNodeId: nodeId, selectedToolId: null });
  },

  selectTool: (toolId: any) => {
    set({ selectedToolId: toolId });
  },

  // Progressive unrolling array (just simple phase tracking for animation)
  revealedPhases: [WORKFLOW_PHASES[0]!.id],
  revealNextPhase: () => {
    const current = get().revealedPhases;
    const all = WORKFLOW_PHASES.map(p => p.id);
    if (current.length < all.length) {
      const nextPhaseId = all[current.length];
      if (nextPhaseId) {
        set({ revealedPhases: [...current, nextPhaseId] });
      }
    }
  },

  // Group selection for prompt bar
  selectedGroupId: null,
  setSelectedGroupId: (id) => set({ selectedGroupId: id }),

  // Edited output content (Task 5)
  editedOutputs: {},
  setEditedOutput: (groupId, content) =>
    set((s) => ({ editedOutputs: { ...s.editedOutputs, [groupId]: content } })),
}));

// Selectors for specific Memoized updates in React
export const selectActiveNodeId = (state: WorkflowStoreState) => state.selectedNodeId;
export const selectActiveToolId = (state: WorkflowStoreState) => state.selectedToolId;
export const selectRevealedPhases = (state: WorkflowStoreState) => state.revealedPhases;
export const selectLayoutMode = (state: WorkflowStoreState) => state.layoutMode;
