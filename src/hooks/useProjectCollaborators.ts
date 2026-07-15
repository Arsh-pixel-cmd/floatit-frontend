import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

export type CollaboratorRole = 'owner' | 'editor' | 'viewer';

export interface Collaborator {
  id: string;
  user_id: string;
  email: string;
  display_name: string;
  role: CollaboratorRole;
  avatar_color: string;
}

const AVATAR_COLORS = [
  'bg-blue-500', 'bg-purple-500', 'bg-green-600',
  'bg-amber-500', 'bg-rose-500', 'bg-teal-500',
];

function colorForIndex(i: number) {
  return AVATAR_COLORS[i % AVATAR_COLORS.length];
}

/**
 * useProjectCollaborators — Observer-pattern data hook.
 * Fetches collaborators from `project_collaborators` view in Supabase.
 * Falls back to synthetic data when the project has no Supabase record.
 * 
 * BUG-008: replaces hardcoded static dummy collaborator list in ShareModal.
 */
export function useProjectCollaborators(projectId: string | null) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!projectId || projectId === 'no-project') {
      setCollaborators([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: sbError } = await supabase
        .from('project_collaborators')
        .select('id, user_id, email, display_name, role')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });

      if (sbError) throw sbError;

      const rows: Collaborator[] = (data || []).map((row: any, i: number) => ({
        id: row.id,
        user_id: row.user_id,
        email: row.email || '',
        display_name: row.display_name || row.email?.split('@')[0] || 'User',
        role: row.role as CollaboratorRole,
        avatar_color: colorForIndex(i),
      }));

      setCollaborators(rows);
    } catch (err: any) {
      // Supabase table may not exist in dev — degrade gracefully.
      console.warn('[useProjectCollaborators] fetch failed, falling back to empty list:', err.message);
      setError(err.message);
      setCollaborators([]);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const inviteByEmail = useCallback(
    async (email: string, role: CollaboratorRole = 'viewer') => {
      if (!projectId || projectId === 'no-project') return { error: 'No active project' };

      const { error: sbError } = await supabase
        .from('project_collaborators')
        .insert({ project_id: projectId, email, role });

      if (!sbError) await fetch();
      return { error: sbError?.message ?? null };
    },
    [projectId, fetch],
  );

  const updateRole = useCallback(
    async (collaboratorId: string, role: CollaboratorRole) => {
      const { error: sbError } = await supabase
        .from('project_collaborators')
        .update({ role })
        .eq('id', collaboratorId);

      if (!sbError) await fetch();
      return { error: sbError?.message ?? null };
    },
    [fetch],
  );

  return { collaborators, loading, error, inviteByEmail, updateRole, refetch: fetch };
}
