import type { StateCreator } from 'zustand';
import type { BuilderStore } from '../builderStore';
import { BlockRegistry } from '../blocks';
import type { Block } from '../../types/engine';

const generateId = () => `id_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

export interface BlockSlice {
  blocks: Block[];
  connections: any[];
  nodeStatus: Record<string, string>;
  nodeResults: Record<string, any>;
  // Stored as string[] for Zustand persist JSON-serialization compatibility (BUG-017).
  // Use selectedBlockIdSet() helper to get a runtime Set when needed.
  selectedBlockIds: string[];
  setNodeStatus: (id: string, status: string) => void;
  setNodeResult: (id: string, result: any) => void;
  resetExecution: () => void;
  toggleBlockSelection: (blockId: string) => void;
  clearBlockSelection: () => void;
  setBlockSelection: (ids: string[]) => void;
  addBlock: (position?: any) => void;
  addWebhookBlock: (position?: any) => void;
  updateBlock: (id: string, updates: any) => void;
  deleteBlock: (id: string) => void;
  connectBlocks: (sourceId: string, targetId: string, sourcePort: string, targetPort: string) => void;
  deleteConnection: (id: string) => void;
}

export const createBlockSlice: StateCreator<BuilderStore, [], [], BlockSlice> = (set, get) => ({
  blocks: [],
  connections: [],
  nodeStatus: {},
  nodeResults: {},
  selectedBlockIds: [],

  setNodeStatus: (id, status) => set(state => ({ nodeStatus: { ...state.nodeStatus, [id]: status } })),
  setNodeResult: (id, result) => set(state => ({ nodeResults: { ...state.nodeResults, [id]: result } })),
  resetExecution: () => set(state => {
    const emptyStatus: Record<string, string> = {};
    state.blocks.forEach(b => { emptyStatus[b.id] = 'idle'; });
    return { nodeStatus: emptyStatus, nodeResults: {} };
  }),

  toggleBlockSelection: (blockId) => set((state) => {
    const current = state.selectedBlockIds;
    if (current.includes(blockId)) {
      return { selectedBlockIds: current.filter(id => id !== blockId) };
    }
    return { selectedBlockIds: [...current, blockId] };
  }),
  clearBlockSelection: () => set({ selectedBlockIds: [] }),
  setBlockSelection: (ids) => set({ selectedBlockIds: ids }),

  addBlock: (position) => {
    const state = get();
    let smartPos = position;
    if (!smartPos) {
      if (state.blocks.length === 0) {
        smartPos = { x: 300, y: 300 };
      } else {
        const rightmost = state.blocks.reduce((max: any, b: any) => {
          const bRight = b.position.x + (b.size?.width || 260);
          const mRight = max.position.x + (max.size?.width || 260);
          return bRight > mRight ? b : max;
        }, state.blocks[0]);
        smartPos = {
          x: rightmost.position.x + (rightmost.size?.width || 260) + 80,
          y: rightmost.position.y
        };
      }
    }
    const newBlock = BlockRegistry.create('agent', generateId(), 'New Agent', smartPos);
    set({
      blocks: [...state.blocks, newBlock],
      selectedElementId: newBlock.id
    });
  },

  addWebhookBlock: (position) => {
    const state = get();
    let smartPos = position;
    if (!smartPos) {
      if (state.blocks.length === 0) {
        smartPos = { x: 300, y: 300 };
      } else {
        const rightmost = state.blocks.reduce((max: any, b: any) => {
          const bRight = b.position.x + (b.size?.width || 260);
          const mRight = max.position.x + (max.size?.width || 260);
          return bRight > mRight ? b : max;
        }, state.blocks[0]);
        smartPos = {
          x: rightmost.position.x + (rightmost.size?.width || 260) + 80,
          y: rightmost.position.y
        };
      }
    }
    const newBlock = BlockRegistry.create('webhook', generateId(), 'Webhook Bridge', smartPos);
    set({
      blocks: [...state.blocks, newBlock],
      selectedElementId: newBlock.id
    });
  },

  updateBlock: (id, updates) => set((state) => ({
    blocks: state.blocks.map(b => b.id === id ? { ...b, ...updates } : b)
  })),

  deleteBlock: (id) => set((state) => {
    const groupWithOutput = state.groups.find(g => g.outputBlockId === id);
    let nextGroups = state.groups;
    let nextBlocks = state.blocks.filter(b => b.id !== id);
    let nextConns = state.connections.filter(c => c.sourceBlockId !== id && c.targetBlockId !== id);

    if (groupWithOutput) {
      nextGroups = nextGroups.filter(g => g.id !== groupWithOutput.id)
        .map((g, index) => ({ ...g, order: index }));
    } else {
      nextGroups = nextGroups.map(g => {
        if (g.blockIds.includes(id)) {
          return {
            ...g,
            blockIds: g.blockIds.filter((bid: string) => bid !== id)
          };
        }
        return g;
      });
    }

    setTimeout(() => {
      get().saveBuilderState();
    }, 0);

    return {
      blocks: nextBlocks,
      connections: nextConns,
      groups: nextGroups,
      selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
      selectedBlockIds: state.selectedBlockIds.filter(sid => sid !== id)
    };
  }),

  connectBlocks: (sourceId, targetId, sourcePort, targetPort) => set((state) => {
    if (sourceId === targetId) return state;
    if (state.connections.find(c => c.sourceBlockId === sourceId && c.targetBlockId === targetId && c.sourcePort === sourcePort && c.targetPort === targetPort)) {
       return state;
    }
    return {
      connections: [...state.connections, { id: generateId(), sourceBlockId: sourceId, targetBlockId: targetId, sourcePort, targetPort }]
    };
  }),

  deleteConnection: (id) => set((state) => ({
    connections: state.connections.filter(c => c.id !== id),
    selectedElementId: state.selectedElementId === id ? null : state.selectedElementId
  })),
});
