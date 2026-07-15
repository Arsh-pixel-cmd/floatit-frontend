import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Group } from '../types/groupTypes';
import type { Block } from '../types/engine';
import { BlockRegistry } from './blocks';

import { createCanvasSlice, type CanvasSlice } from './stores/canvasSlice';
import { createBlockSlice, type BlockSlice } from './stores/blockSlice';
import { createGroupSlice, type GroupSlice } from './stores/groupSlice';
import { createServerSyncSlice, type ServerSyncSlice } from './stores/serverSyncSlice';
import { createCommentSlice, type CommentSlice } from './stores/commentSlice';

export const BlockFactory = {
  createAgentBlock: (id: string, name: string, position: { x: number; y: number }, isGroupOutput = false, description = ''): Block => 
    BlockRegistry.create('agent', id, name, position, { isGroupOutput, description }),

  createWebhookBlock: (id: string, name: string, position: { x: number; y: number }): Block => 
    BlockRegistry.create('webhook', id, name, position)
};

export interface BuilderStore extends CanvasSlice, BlockSlice, GroupSlice, ServerSyncSlice, CommentSlice {}

export const useBuilderStore = create<BuilderStore>()(
  persist(
    (set, get, store) => ({
      ...createCanvasSlice(set, get, store),
      ...createBlockSlice(set, get, store),
      ...createGroupSlice(set, get, store),
      ...createServerSyncSlice(set, get, store),
      ...createCommentSlice(set, get, store),
    }),
    {
      name: 'floatit-builder-storage',
      partialize: (state) => ({
        blocks: state.blocks,
        connections: state.connections,
        stickyNotes: state.stickyNotes,
        textLabels: state.textLabels,
        drawLines: state.drawLines,
        groups: state.groups,
        viewMode: state.viewMode,
        deployedTemplateId: state.deployedTemplateId,
        comments: state.comments,
      }),
    }
  )
);
