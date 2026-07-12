import type { StateCreator } from 'zustand';
import type { BuilderStore } from '../builderStore';

const generateId = () => `id_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

export interface CanvasSlice {
  viewMode: string;
  setViewMode: (mode: string) => void;
  stickyNotes: any[];
  textLabels: any[];
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  isTopologyLocked: boolean;
  setIsTopologyLocked: (locked: boolean) => void;
  addTextLabel: (position: any) => void;
  updateTextLabel: (id: string, text: string) => void;
  deleteTextLabel: (id: string) => void;
  addStickyNote: (position?: any) => void;
  updateStickyNote: (id: string, updates: any) => void;
  deleteStickyNote: (id: string) => void;
  clearAnnotations: () => void;
}

export const createCanvasSlice: StateCreator<BuilderStore, [], [], CanvasSlice> = (set) => ({
  viewMode: 'builder',
  setViewMode: (mode) => set({ viewMode: mode, selectedElementId: null }),
  stickyNotes: [],
  textLabels: [],
  selectedElementId: null,
  setSelectedElementId: (id) => set({ selectedElementId: id }),
  isTopologyLocked: false,
  setIsTopologyLocked: (locked) => set({ isTopologyLocked: locked }),

  addTextLabel: (position) => set((state) => ({
    textLabels: [...state.textLabels, { id: generateId(), text: '', x: position.x, y: position.y }]
  })),
  updateTextLabel: (id, text) => set((state) => ({
    textLabels: state.textLabels.map(l => l.id === id ? { ...l, text } : l)
  })),
  deleteTextLabel: (id) => set((state) => ({
    textLabels: state.textLabels.filter(l => l.id !== id)
  })),

  addStickyNote: (position) => {
    const newNote = {
      id: generateId(),
      text: '',
      color: '#A259FF',
      position: position || { 
        x: 400 + (Math.random() * 200), 
        y: 400 + (Math.random() * 200) 
      }
    };
    set((state) => ({
      stickyNotes: [...state.stickyNotes, newNote],
      selectedElementId: `sticky-${newNote.id}`
    }));
  },
  updateStickyNote: (id, updates) => set((state) => ({
    stickyNotes: state.stickyNotes.map(n => n.id === id ? { ...n, ...updates } : n)
  })),
  deleteStickyNote: (id) => set((state) => ({
    stickyNotes: state.stickyNotes.filter(n => n.id !== id),
    selectedElementId: state.selectedElementId === `sticky-${id}` ? null : state.selectedElementId
  })),
  clearAnnotations: () => set({ stickyNotes: [] }),
});
