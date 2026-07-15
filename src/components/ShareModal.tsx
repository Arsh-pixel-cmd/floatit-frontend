import React, { useState } from 'react';
import {
  Users2, Link as LinkIcon, Search, ChevronDown, Check,
  Loader2, AlertCircle, X, Shield, Eye, Edit3
} from 'lucide-react';
import { useProjectCollaborators, type CollaboratorRole } from '../hooks/useProjectCollaborators';

const ROLE_OPTIONS: { value: CollaboratorRole; label: string; icon: React.ElementType }[] = [
  { value: 'editor', label: 'Can edit', icon: Edit3 },
  { value: 'viewer', label: 'Can view', icon: Eye },
  { value: 'owner', label: 'Owner', icon: Shield },
];

function InitialAvatar({ name, colorClass }: { name: string; colorClass: string }) {
  const initials = name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <div className={`w-7 h-7 rounded-full ${colorClass} flex items-center justify-center text-white font-bold text-[10px] shrink-0`}>
      {initials}
    </div>
  );
}

function RoleDropdown({
  current,
  onChange,
}: {
  current: CollaboratorRole;
  onChange: (r: CollaboratorRole) => void;
}) {
  const [open, setOpen] = useState(false);
  const currentOption = ROLE_OPTIONS.find(r => r.value === current) ?? ROLE_OPTIONS[1];
  const Icon = currentOption.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
      >
        <Icon size={11} />
        {currentOption.label}
        <ChevronDown size={11} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden min-w-[130px]">
          {ROLE_OPTIONS.map(opt => {
            const RIcon = opt.icon;
            return (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`flex items-center gap-2 w-full px-3 py-2 text-[11px] hover:bg-gray-50 dark:hover:bg-zinc-800 transition text-left ${
                  opt.value === current ? 'text-[#2945D1] dark:text-blue-400 font-semibold' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <RIcon size={11} />
                {opt.label}
                {opt.value === current && <Check size={10} className="ml-auto" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * ShareModal — BUG-008 fixed.
 * Collaborator list now fetched from Supabase via useProjectCollaborators.
 * Falls back gracefully when no project is active or table is unavailable.
 */
export default function ShareModal({ setShowShareModal }: { setShowShareModal: (v: boolean) => void }) {
  const [copied, setCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviting, setInviting] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const projectId = localStorage.getItem('active_sequence_id') || null;
  const shareUrl = `${window.location.origin}/canvas?project=${projectId ?? 'no-project'}`;

  const { collaborators, loading, error, inviteByEmail, updateRole } =
    useProjectCollaborators(projectId);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleInvite = async () => {
    const trimmed = inviteEmail.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setInviteError('Enter a valid email address.');
      return;
    }
    setInviting(true);
    setInviteError(null);

    const { error: invErr } = await inviteByEmail(trimmed, 'viewer');
    setInviting(false);

    if (invErr) {
      setInviteError(invErr);
    } else {
      setInviteEmail('');
      setInviteSuccess(true);
      setTimeout(() => setInviteSuccess(false), 2500);
    }
  };

  const handleRoleChange = async (collaboratorId: string, role: CollaboratorRole) => {
    await updateRole(collaboratorId, role);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-auto"
      onClick={() => setShowShareModal(false)}
    >
      <div
        className="bg-white dark:bg-[#1e1e24] w-[440px] rounded-2xl shadow-2xl border border-gray-100 dark:border-zinc-800 p-6 relative z-10"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2945D1] to-[#A259FF] flex items-center justify-center shadow">
              <Users2 size={16} className="text-white" />
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-gray-900 dark:text-gray-100 leading-tight">
                Share Project
              </h3>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                Invite collaborators and manage access
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowShareModal(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          >
            <X size={15} />
          </button>
        </div>

        {/* Share URL */}
        <div className="flex items-center gap-2 mb-5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl px-3 py-2">
          <LinkIcon size={12} className="text-gray-400 shrink-0" />
          <span className="text-[11px] text-gray-500 dark:text-gray-400 truncate flex-1 font-mono">
            {shareUrl}
          </span>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 font-semibold shrink-0 hover:text-blue-700 transition"
          >
            {copied ? <Check size={11} className="text-green-500" /> : <LinkIcon size={10} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Invite row */}
        <div className="flex items-center gap-2 mb-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
            <input
              type="email"
              placeholder="Invite by email..."
              value={inviteEmail}
              onChange={e => { setInviteEmail(e.target.value); setInviteError(null); }}
              onKeyDown={e => e.key === 'Enter' && handleInvite()}
              className="w-full pl-8 pr-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-xs text-gray-700 dark:text-gray-300 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#2945D1]/30 focus:border-[#2945D1] transition"
            />
          </div>
          <button
            onClick={handleInvite}
            disabled={inviting}
            className="flex items-center gap-1.5 bg-[#2945D1] text-white px-4 py-2 rounded-xl text-[12px] font-semibold hover:bg-blue-700 active:scale-95 transition disabled:opacity-60"
          >
            {inviting ? <Loader2 size={12} className="animate-spin" /> : null}
            {inviting ? 'Inviting…' : 'Invite'}
          </button>
        </div>

        {/* Feedback messages */}
        {inviteError && (
          <div className="flex items-center gap-1.5 text-[11px] text-red-500 mb-3 mt-1 pl-1">
            <AlertCircle size={11} /> {inviteError}
          </div>
        )}
        {inviteSuccess && (
          <div className="flex items-center gap-1.5 text-[11px] text-green-600 mb-3 mt-1 pl-1">
            <Check size={11} /> Invite sent!
          </div>
        )}

        {/* Collaborator list */}
        <div className="mt-5">
          <h4 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
            Who has access
          </h4>

          {loading && (
            <div className="flex items-center justify-center py-6 gap-2 text-gray-400 text-xs">
              <Loader2 size={14} className="animate-spin" />
              Loading collaborators…
            </div>
          )}

          {!loading && error && (
            <div className="flex items-center gap-2 py-4 text-[11px] text-amber-600 dark:text-amber-400">
              <AlertCircle size={13} />
              <span>Could not load collaborators — project may not be saved yet.</span>
            </div>
          )}

          {!loading && !error && collaborators.length === 0 && (
            <p className="text-center py-6 text-[11px] text-gray-400 dark:text-gray-600">
              No collaborators yet. Invite someone above.
            </p>
          )}

          {!loading && collaborators.length > 0 && (
            <div className="space-y-3">
              {collaborators.map(collab => (
                <div key={collab.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <InitialAvatar name={collab.display_name} colorClass={collab.avatar_color} />
                    <div>
                      <p className="text-[12px] text-gray-700 dark:text-gray-300 font-semibold leading-tight">
                        {collab.display_name}
                      </p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500">{collab.email}</p>
                    </div>
                  </div>
                  {collab.role === 'owner' ? (
                    <span className="text-[10px] font-bold text-[#A259FF] dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded-full">
                      Owner
                    </span>
                  ) : (
                    <RoleDropdown
                      current={collab.role}
                      onChange={role => handleRoleChange(collab.id, role)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
