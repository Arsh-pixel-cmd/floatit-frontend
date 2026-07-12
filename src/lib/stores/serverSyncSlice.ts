import type { StateCreator } from 'zustand';
import type { BuilderStore } from '../builderStore';
import { dbAdapter } from '../database';

const generateId = () => `id_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

export interface ServerSyncSlice {
  templates: any[];
  deployedTemplateId: string | null;
  setTemplates: (templates: any[]) => void;
  deployProject: (name?: string) => Promise<string | null>;
  saveAsTemplate: (name?: string) => Promise<void>;
  applyTemplate: (templateId: string) => Promise<void>;
  updateTemplate: (id: string, updates: any) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
  saveBuilderState: () => Promise<void>;
}

export const createServerSyncSlice: StateCreator<BuilderStore, [], [], ServerSyncSlice> = (set, get) => ({
  templates: [],
  deployedTemplateId: null,

  setTemplates: (templates) => set({ templates }),

  deployProject: async (name) => {
    const state = get();
    const blocksSnap = JSON.parse(JSON.stringify(state.blocks));
    const connsSnap = JSON.parse(JSON.stringify(state.connections));

    if (blocksSnap.length === 0) return null;

    const templatePayload: any = {
      name: name || 'Untitled Pipeline',
      blocks: blocksSnap,
      connections: connsSnap,
      is_template: true,
      status: 'active',
      generated_from: 'builder',
    };

    try {
      const userId = await dbAdapter.getCurrentUserId();
      if (userId) {
        templatePayload.user_id = userId;
        const { data, error } = await dbAdapter.createTemplate(templatePayload);

        if (error) throw new Error(error);
        if (data) {
          const seqId = localStorage.getItem('active_sequence_id');
          if (seqId) {
            const canvas_state = {
              blocks: blocksSnap,
              connections: connsSnap,
              stickyNotes: JSON.parse(JSON.stringify(state.stickyNotes)),
              textLabels: JSON.parse(JSON.stringify(state.textLabels)),
              groups: JSON.parse(JSON.stringify(state.groups)),
              deployedTemplateId: data.id,
            };
            await dbAdapter.saveCanvasState(seqId, canvas_state);
          }

          set((s) => ({
            templates: [...s.templates, data],
            deployedTemplateId: data.id
          }));
          return data.id;
        }
      }
    } catch (err) {
      console.warn('[Builder] Template save failed, using local fallback:', err);
    }

    const localId = generateId();
    const localTemplate = { ...templatePayload, id: localId, user_id: 'local' };
    set((s) => ({
      templates: [...s.templates, localTemplate],
      deployedTemplateId: localId
    }));
    return localId;
  },

  saveAsTemplate: async (name) => {
    const userId = await dbAdapter.getCurrentUserId();
    if (!userId) return;
    const state = get();
    
    const newTemplate = {
      user_id: userId,
      name: name || 'Untitled Template',
      blocks: JSON.parse(JSON.stringify(state.blocks)),
      connections: JSON.parse(JSON.stringify(state.connections)),
      is_template: true,
      status: 'active',
      generated_from: 'builder'
    };
    const { data } = await dbAdapter.createTemplate(newTemplate);
    if (data) {
      set(state => ({ templates: [...state.templates, data] }));
    }
  },

  applyTemplate: async (templateId) => {
    const state = get();
    const template = state.templates.find(t => t.id === templateId);
    if (!template) return;
    
    const idMap: Record<string, string> = {};
    const newBlocks = template.blocks.map((b: any) => {
      const newId = generateId();
      idMap[b.id] = newId;
      return { ...b, id: newId };
    });
    
    const newConns = template.connections.map((c: any) => ({
      id: generateId(),
      sourceBlockId: idMap[c.sourceBlockId] || c.sourceBlockId, 
      targetBlockId: idMap[c.targetBlockId] || c.targetBlockId,
      sourcePort: c.sourcePort,
      targetPort: c.targetPort
    }));

    set({
      blocks: newBlocks,
      connections: newConns,
      stickyNotes: [],
      textLabels: [],
      selectedElementId: null,
      viewMode: 'builder',
      groups: [],
      selectedBlockIds: new Set()
    });
  },
  
  updateTemplate: async (id, updates) => {
    set((state) => ({
      templates: state.templates.map(t => t.id === id ? { ...t, ...updates } : t)
    }));
    await dbAdapter.updateTemplate(id, updates);
  },

  deleteTemplate: async (id) => {
    set((state) => ({
      templates: state.templates.filter(t => t.id !== id)
    }));
    await dbAdapter.deleteTemplate(id);
  },

  saveBuilderState: async () => {
    const seqId = localStorage.getItem('active_sequence_id');
    if (!seqId) return;
    const state = get();
    const canvas_state = {
      blocks: JSON.parse(JSON.stringify(state.blocks)),
      connections: JSON.parse(JSON.stringify(state.connections)),
      stickyNotes: JSON.parse(JSON.stringify(state.stickyNotes)),
      textLabels: JSON.parse(JSON.stringify(state.textLabels)),
      groups: JSON.parse(JSON.stringify(state.groups)),
    };
    await dbAdapter.saveCanvasState(seqId, canvas_state);
  },
});
