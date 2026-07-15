import type { StateCreator } from 'zustand';
import type { BuilderStore } from '../builderStore';
import { BlockRegistry } from '../blocks';
import type { Group } from '../../types/groupTypes';

const generateId = () => `id_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

export interface GroupSlice {
  groups: Group[];
  runningGroupId: string | null;
  completedGroupIds: string[];
  setRunningGroupId: (groupId: string | null) => void;
  addCompletedGroupId: (groupId: string) => void;
  resetGroupExecution: () => void;
  setGroups: (groups: Group[]) => void;
  createGroup: (name: string) => Group | null;
  deleteGroup: (groupId: string) => void;
  renameGroup: (groupId: string, name: string) => void;
}

export const createGroupSlice: StateCreator<BuilderStore, [], [], GroupSlice> = (set, get) => ({
  groups: [],
  runningGroupId: null,
  completedGroupIds: [],

  setRunningGroupId: (groupId) => set({ runningGroupId: groupId }),
  addCompletedGroupId: (groupId) => set((state) => {
    if (state.completedGroupIds.includes(groupId)) return state;
    return { completedGroupIds: [...state.completedGroupIds, groupId] };
  }),
  resetGroupExecution: () => set({ runningGroupId: null, completedGroupIds: [] }),
  setGroups: (groups) => set({ groups }),

  createGroup: (name) => {
    const state = get();
    const selectedIds = [...state.selectedBlockIds];
    if (selectedIds.length === 0) return null;
    
    const selectedBlocks = state.blocks.filter(b => selectedIds.includes(b.id));
    if (selectedBlocks.length === 0) return null;

    const rightmost = selectedBlocks.reduce((max: any, b: any) => {
      const bRight = b.position.x + (b.size?.width || 260);
      const mRight = max.position.x + (max.size?.width || 260);
      return bRight > mRight ? b : max;
    }, selectedBlocks[0]);

    const outputPos = {
      x: rightmost.position.x + (rightmost.size?.width || 260) + 120,
      y: selectedBlocks.reduce((sum: number, b: any) => sum + b.position.y, 0) / selectedBlocks.length
    };

    const outputBlockId = generateId();
    const outputBlockName = `${name} Output`;
    
    const outputNodeBlock = BlockRegistry.create(
      'agent',
      outputBlockId,
      outputBlockName,
      outputPos,
      { isGroupOutput: true, description: `Synthesized summary for group: ${name}` }
    );

    const newGroupId = generateId();
    const order = state.groups.length;
    const newGroup: Group = {
      id: newGroupId,
      name,
      blockIds: selectedIds,
      outputBlockId,
      order,
    };

    const newConnections = selectedIds.map(blockId => ({
      id: generateId(),
      sourceBlockId: blockId,
      targetBlockId: outputBlockId,
      sourcePort: 'output',
      targetPort: 'input'
    }));

    set({
      blocks: [...state.blocks, outputNodeBlock],
      connections: [...state.connections, ...newConnections],
      groups: [...state.groups, newGroup],
      selectedBlockIds: []
    });

    state.saveBuilderState();
    return newGroup;
  },

  deleteGroup: (groupId) => set((state) => {
    const group = state.groups.find(g => g.id === groupId);
    if (!group) return state;
    
    const nextGroups = state.groups.filter(g => g.id !== groupId)
      .map((g, index) => ({ ...g, order: index }));

    const outputId = group.outputBlockId;
    const nextBlocks = state.blocks.filter(b => b.id !== outputId);
    const nextConns = state.connections.filter(c => c.sourceBlockId !== outputId && c.targetBlockId !== outputId);

    setTimeout(() => {
      get().saveBuilderState();
    }, 0);

    // BUG-019: clear deleted group member IDs from selection
    const removedIds = new Set([...(group.blockIds || []), group.outputBlockId]);
    const nextSel = state.selectedBlockIds.filter((id: string) => !removedIds.has(id));

    return {
      groups: nextGroups,
      blocks: nextBlocks,
      connections: nextConns,
      selectedBlockIds: nextSel,
    };
  }),

  renameGroup: (groupId, name) => set((state) => {
    const group = state.groups.find(g => g.id === groupId);
    if (!group) return state;

    const nextBlocks = state.blocks.map(b => 
      b.id === group.outputBlockId ? { ...b, name: `${name} Output`, description: `Synthesized summary for group: ${name}` } : b
    );

    const nextGroups = state.groups.map(g => g.id === groupId ? { ...g, name } : g);

    setTimeout(() => {
      get().saveBuilderState();
    }, 0);

    return {
      groups: nextGroups,
      blocks: nextBlocks
    };
  }),
});
