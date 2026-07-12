/**
 * SupabaseDatabaseAdapter — Concrete implementation of DatabaseAdapter
 * that delegates all persistence operations to Supabase.
 *
 * This is the ONLY file that should import supabaseClient directly
 * (aside from SupabaseAuthAdapter). All other modules use the
 * DatabaseAdapter abstraction.
 */

import { supabase } from '../supabaseClient';
import {
  DatabaseAdapter,
  type AuthSession,
  type DbResult,
  type DbVoidResult,
  type SequenceRecord,
  type TemplateRecord,
  type FolderRecord,
  type CanvasStatePayload,
} from './DatabaseAdapter';

export class SupabaseDatabaseAdapter extends DatabaseAdapter {
  // ─── Sequences ───────────────────────────────────────────────

  async fetchSequences(orderBy = 'updated_at', ascending = false): Promise<DbResult<SequenceRecord[]>> {
    const { data, error } = await supabase
      .from('sequences')
      .select('*')
      .order(orderBy, { ascending });

    return { data: data as SequenceRecord[] | null, error: error?.message ?? null };
  }

  async fetchSequenceById(id: string): Promise<DbResult<SequenceRecord>> {
    const { data, error } = await supabase
      .from('sequences')
      .select('*')
      .eq('id', id)
      .single();

    return { data: data as SequenceRecord | null, error: error?.message ?? null };
  }

  async createSequence(payload: Partial<SequenceRecord>): Promise<DbResult<SequenceRecord>> {
    const { data, error } = await supabase
      .from('sequences')
      .insert([payload])
      .select()
      .single();

    return { data: data as SequenceRecord | null, error: error?.message ?? null };
  }

  async updateSequence(id: string, updates: Partial<SequenceRecord>): Promise<DbVoidResult> {
    const { error } = await supabase
      .from('sequences')
      .update(updates)
      .eq('id', id);

    return { error: error?.message ?? null };
  }

  async deleteSequence(id: string): Promise<DbVoidResult> {
    const { error } = await supabase
      .from('sequences')
      .delete()
      .eq('id', id);

    return { error: error?.message ?? null };
  }

  // ─── Canvas State ────────────────────────────────────────────

  async saveCanvasState(
    sequenceId: string,
    canvasState: CanvasStatePayload,
    title?: string,
  ): Promise<DbVoidResult> {
    const updates: Record<string, any> = {
      canvas_state: canvasState,
      updated_at: new Date().toISOString(),
    };
    if (title !== undefined) {
      updates.title = title;
    }

    const { error } = await supabase
      .from('sequences')
      .update(updates)
      .eq('id', sequenceId);

    return { error: error?.message ?? null };
  }

  async fetchCanvasState(sequenceId: string): Promise<DbResult<{ canvas_state: CanvasStatePayload | null; title: string }>> {
    const { data, error } = await supabase
      .from('sequences')
      .select('canvas_state, title')
      .eq('id', sequenceId)
      .single();

    return {
      data: data ? { canvas_state: data.canvas_state as CanvasStatePayload | null, title: data.title as string } : null,
      error: error?.message ?? null,
    };
  }

  // ─── Templates ───────────────────────────────────────────────

  async fetchTemplates(userId: string): Promise<DbResult<TemplateRecord[]>> {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    return { data: data as TemplateRecord[] | null, error: error?.message ?? null };
  }

  async createTemplate(payload: Partial<TemplateRecord>): Promise<DbResult<TemplateRecord>> {
    const { data, error } = await supabase
      .from('templates')
      .insert([payload])
      .select()
      .single();

    return { data: data as TemplateRecord | null, error: error?.message ?? null };
  }

  async updateTemplate(id: string, updates: Partial<TemplateRecord>): Promise<DbVoidResult> {
    const { error } = await supabase
      .from('templates')
      .update(updates)
      .eq('id', id);

    return { error: error?.message ?? null };
  }

  async deleteTemplate(id: string): Promise<DbVoidResult> {
    const { error } = await supabase
      .from('templates')
      .delete()
      .eq('id', id);

    return { error: error?.message ?? null };
  }

  // ─── Folders / Spaces ────────────────────────────────────────

  async fetchFolders(userId: string): Promise<DbResult<FolderRecord[]>> {
    const { data, error } = await supabase
      .from('spaces')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    return { data: data as FolderRecord[] | null, error: error?.message ?? null };
  }

  async createFolder(payload: Partial<FolderRecord>): Promise<DbResult<FolderRecord>> {
    const { data, error } = await supabase
      .from('spaces')
      .insert([payload])
      .select()
      .single();

    return { data: data as FolderRecord | null, error: error?.message ?? null };
  }

  async deleteFolder(id: string): Promise<DbVoidResult> {
    // First, unlink all sequences from this folder
    await supabase.from('sequences').update({ space_id: null }).eq('space_id', id);
    // Then delete the folder
    const { error } = await supabase
      .from('spaces')
      .delete()
      .eq('id', id);

    return { error: error?.message ?? null };
  }

  async moveSequenceToFolder(sequenceId: string, folderId: string | null): Promise<DbVoidResult> {
    const { error } = await supabase
      .from('sequences')
      .update({ space_id: folderId })
      .eq('id', sequenceId);

    return { error: error?.message ?? null };
  }

  // ─── Auth helpers ────────────────────────────────────────────

  async getCurrentUserId(): Promise<string | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user?.id ?? null;
  }

  async getAuthSession(): Promise<AuthSession> {
    const { data: { session } } = await supabase.auth.getSession();
    return {
      userId: session?.user?.id ?? null,
      accessToken: session?.access_token ?? null,
    };
  }
}
