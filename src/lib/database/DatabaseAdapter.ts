/**
 * IDatabaseAdapter — Interface contract for all database backends.
 *
 * Every adapter (Supabase, etc.) MUST implement these methods.
 * This follows the Dependency Inversion Principle (DIP): business logic
 * depends on this abstraction, not on concrete database clients.
 *
 * @see SupabaseDatabaseAdapter for the concrete implementation.
 */

/* eslint-disable no-unused-vars */

export interface AuthSession {
  userId: string | null;
  accessToken: string | null;
}

// Generic result types for database operations
export interface DbResult<T> {
  data: T | null;
  error: string | null;
}

export interface DbVoidResult {
  error: string | null;
}

// Domain-specific payload types
export interface CanvasStatePayload {
  blocks: any[];
  connections: any[];
  stickyNotes: any[];
  textLabels: any[];
  groups: any[];
  deployedTemplateId?: string | null;
  execution?: {
    nodeStates: Record<string, any>;
    nodeResults: Record<string, any>;
    currentPhaseIndex: number;
    projectPrompt: string;
  };
}

export interface SequenceRecord {
  id: string;
  user_id: string;
  title: string;
  status: string;
  status_color: string;
  agents_active: number;
  total_agents: number;
  is_starred: boolean;
  space_id: string | null;
  canvas_state: CanvasStatePayload | null;
  updated_at: string;
  created_at?: string;
}

export interface TemplateRecord {
  id: string;
  user_id: string;
  name: string;
  blocks: any[];
  connections: any[];
  is_template: boolean;
  status: string;
  generated_from: string;
  created_at?: string;
}

export interface FolderRecord {
  id: string;
  name: string;
  color: string;
  user_id: string;
  created_at: string;
}

/**
 * Abstract base class for database adapters.
 * Concrete implementations (e.g., SupabaseDatabaseAdapter) override each method.
 */
export abstract class DatabaseAdapter {
  // ─── Sequences ───────────────────────────────────────────────

  abstract fetchSequences(orderBy?: string, ascending?: boolean): Promise<DbResult<SequenceRecord[]>>;

  abstract fetchSequenceById(id: string): Promise<DbResult<SequenceRecord>>;

  abstract createSequence(data: Partial<SequenceRecord>): Promise<DbResult<SequenceRecord>>;

  abstract updateSequence(id: string, updates: Partial<SequenceRecord>): Promise<DbVoidResult>;

  abstract deleteSequence(id: string): Promise<DbVoidResult>;

  // ─── Canvas State ────────────────────────────────────────────

  abstract saveCanvasState(sequenceId: string, canvasState: CanvasStatePayload, title?: string): Promise<DbVoidResult>;

  abstract fetchCanvasState(sequenceId: string): Promise<DbResult<{ canvas_state: CanvasStatePayload | null; title: string }>>;

  // ─── Templates ───────────────────────────────────────────────

  abstract fetchTemplates(userId: string): Promise<DbResult<TemplateRecord[]>>;

  abstract createTemplate(data: Partial<TemplateRecord>): Promise<DbResult<TemplateRecord>>;

  abstract updateTemplate(id: string, updates: Partial<TemplateRecord>): Promise<DbVoidResult>;

  abstract deleteTemplate(id: string): Promise<DbVoidResult>;

  // ─── Folders / Spaces ────────────────────────────────────────

  abstract fetchFolders(userId: string): Promise<DbResult<FolderRecord[]>>;

  abstract createFolder(data: Partial<FolderRecord>): Promise<DbResult<FolderRecord>>;

  abstract deleteFolder(id: string): Promise<DbVoidResult>;

  abstract moveSequenceToFolder(sequenceId: string, folderId: string | null): Promise<DbVoidResult>;

  // ─── Auth helpers (read-only) ────────────────────────────────

  abstract getCurrentUserId(): Promise<string | null>;

  abstract getAuthSession(): Promise<AuthSession>;
}
