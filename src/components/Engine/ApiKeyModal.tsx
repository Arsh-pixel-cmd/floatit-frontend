import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, Globe, Info as InfoIcon } from 'lucide-react';
import { useToastStore } from '../../lib/toastStore';
import { supabase } from '../../lib/supabaseClient';
import type { ApiKeyModalType } from '../../types/engine';

interface ApiKeyModalProps {
  type: ApiKeyModalType;
  onClose: () => void;
  onSaved: () => void;
}

const titles: Record<ApiKeyModalType, string> = {
  NO_KEY: 'API Key Required',
  INVALID_KEY: 'Invalid API Key',
  RATE_LIMIT: 'Rate Limit Reached'
};

const descriptions: Record<ApiKeyModalType, string> = {
  NO_KEY: 'An API key is required to orchestrate this neural sequence. Choose how you want to store it.',
  INVALID_KEY: 'The provided key was rejected by the provider. Please enter a valid OpenRouter or LLM API key.',
  RATE_LIMIT: 'The current key is being rate limited. You can wait or provide a new key for this project.'
};

export default function ApiKeyModal({ type, onClose, onSaved }: ApiKeyModalProps) {
  const [key, setKey] = useState('');
  const [scope, setScope] = useState<'project' | 'global'>('project');
  const [showKey, setShowKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const addToast = useToastStore(s => s.addToast);

  const handleSave = async () => {
    if (!key.trim()) return;
    setSaving(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const seqId = localStorage.getItem('active_sequence_id');
      const endpoint = scope === 'project' ? '/api/keys/save-project' : '/api/keys/save';
      const payload = scope === 'project'
        ? { userId: session.user.id, sequenceId: seqId, apiKey: key.trim() }
        : { userId: session.user.id, apiKey: key.trim() };

      const API_BASE = import.meta.env.PROD ? '' : 'http://localhost:3001';
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save key');

      addToast('success', `API Key saved ${scope === 'project' ? 'for this project' : 'globally'}`);
      onSaved();
    } catch (err: any) {
      addToast('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 pointer-events-auto">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto"
      />

      <div className="relative w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-[32px] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden pointer-events-auto">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#A259FF]/20 blur-[60px] rounded-full" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A259FF] to-[#46B1FF] flex items-center justify-center text-white shadow-lg">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white font-display tracking-tight">{titles[type]}</h3>
              <p className="text-xs text-slate-500 font-medium">Neural Conductor Authentication</p>
            </div>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed mb-8">
            {descriptions[type]}
          </p>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">API Key</label>
              <div className="relative group">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="sk-or-v1-..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-5 pr-12 text-sm text-white focus:border-[#A259FF]/50 outline-none transition-all placeholder:text-slate-700"
                />
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                  title={showKey ? 'Hide key' : 'Show key'}
                  aria-label={showKey ? 'Hide key' : 'Show key'}
                >
                  {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setScope('project')}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${scope === 'project'
                    ? 'bg-[#A259FF]/10 border-[#A259FF]/40 text-white'
                    : 'bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/10'
                  }`}
              >
                <ShieldCheck size={20} className={scope === 'project' ? 'text-[#A259FF]' : ''} />
                <span className="text-[10px] font-black uppercase tracking-wider">Project Only</span>
              </button>
              <button
                onClick={() => setScope('global')}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${scope === 'global'
                    ? 'bg-[#46B1FF]/10 border-[#46B1FF]/40 text-white'
                    : 'bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/10'
                  }`}
              >
                <Globe size={20} className={scope === 'global' ? 'text-[#46B1FF]' : ''} />
                <span className="text-[10px] font-black uppercase tracking-wider">Global Use</span>
              </button>
            </div>

            <div className="flex items-center gap-3 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
              <InfoIcon size={16} className="text-slate-600 shrink-0" />
              <p className="text-[10px] text-slate-500 leading-normal">
                {scope === 'project'
                  ? 'Project keys are encrypted and stored specifically for this neural sequence.'
                  : 'Global keys are saved to your profile and used as a fallback for all your sequences.'}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-4 rounded-2xl border border-white/10 text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !key.trim()}
                className="flex-[2] py-4 rounded-2xl bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-[#DEF767] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl active:scale-95"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Authorize Access'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
