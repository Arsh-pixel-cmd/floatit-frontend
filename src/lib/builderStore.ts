import { create } from 'zustand';
import type { Group } from '../types/groupTypes';
import type { Block } from '../types/engine';
import { BlockRegistry } from './blocks';

import { createCanvasSlice, type CanvasSlice } from './stores/canvasSlice';
import { createBlockSlice, type BlockSlice } from './stores/blockSlice';
import { createGroupSlice, type GroupSlice } from './stores/groupSlice';
import { createServerSyncSlice, type ServerSyncSlice } from './stores/serverSyncSlice';

export const BlockFactory = {
  createAgentBlock: (id: string, name: string, position: { x: number; y: number }, isGroupOutput = false, description = ''): Block => 
    BlockRegistry.create('agent', id, name, position, { isGroupOutput, description }),

  createWebhookBlock: (id: string, name: string, position: { x: number; y: number }): Block => 
    BlockRegistry.create('webhook', id, name, position)
};

export interface BuilderStore extends CanvasSlice, BlockSlice, GroupSlice, ServerSyncSlice {}

export const useBuilderStore = create<BuilderStore>((set, get, store) => ({
  ...createCanvasSlice(set, get, store),
  ...createBlockSlice(set, get, store),
  ...createGroupSlice(set, get, store),
  ...createServerSyncSlice(set, get, store),
}));
