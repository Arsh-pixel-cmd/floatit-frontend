export interface CommentReply {
  id: string;
  authorName: string;
  authorInitial: string;
  text: string;
  createdAt: string; // ISO string
}

export interface CanvasComment {
  id: string;
  x: number;
  y: number;
  authorName: string;
  authorInitial: string;
  text: string;
  createdAt: string;
  resolved: boolean;
  replies: CommentReply[];
}
