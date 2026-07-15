import type { StateCreator } from 'zustand';
import type { BuilderStore } from '../builderStore';
import type { CanvasComment } from '../../types/commentTypes';

const genId = () => `cmt_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

export interface CommentSlice {
  comments: CanvasComment[];
  addComment: (pos: { x: number; y: number }, text: string, author: { name: string }) => void;
  addReply: (commentId: string, text: string, author: { name: string }) => void;
  resolveComment: (commentId: string) => void;
  deleteComment: (commentId: string) => void;
}

export const createCommentSlice: StateCreator<BuilderStore, [], [], CommentSlice> = (set) => ({
  comments: [],

  addComment: (pos, text, author) => {
    const initial = (author.name || 'U').charAt(0).toUpperCase();
    set((state) => ({
      comments: [...state.comments, {
        id: genId(),
        x: pos.x,
        y: pos.y,
        authorName: author.name,
        authorInitial: initial,
        text,
        createdAt: new Date().toISOString(),
        resolved: false,
        replies: [],
      }],
    }));
  },

  addReply: (commentId, text, author) => {
    const initial = (author.name || 'U').charAt(0).toUpperCase();
    set((state) => ({
      comments: state.comments.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: [...c.replies, {
                id: genId(),
                authorName: author.name,
                authorInitial: initial,
                text,
                createdAt: new Date().toISOString(),
              }],
            }
          : c
      ),
    }));
  },

  resolveComment: (commentId) =>
    set((state) => ({
      comments: state.comments.map((c) =>
        c.id === commentId ? { ...c, resolved: true } : c
      ),
    })),

  deleteComment: (commentId) =>
    set((state) => ({
      comments: state.comments.filter((c) => c.id !== commentId),
    })),
});
