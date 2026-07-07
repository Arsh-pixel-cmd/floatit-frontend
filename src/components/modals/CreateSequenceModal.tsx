import React, { useState } from 'react';
import { Workflow, HelpCircle } from 'lucide-react';

interface CreateSequenceModalProps {
  isOpen: boolean;
  onCreate: (name: string) => void;
  onClose: () => void;
}

/**
 * CreateSequenceModal — Flow 1, PRD Steps 3 & 4
 *
 * Single Responsibility: Collects a sequence name from the user.
 * Delegates actual creation to the parent via `onCreate` callback.
 */
export default function CreateSequenceModal({
  isOpen,
  onCreate,
  onClose,
}: CreateSequenceModalProps) {
  const [sequenceName, setSequenceName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sequenceName.trim()) return;
    onCreate(sequenceName.trim());
    setSequenceName('');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if the backdrop itself was clicked (not the modal content)
    if (e.target === e.currentTarget) {
      onClose();
      setSequenceName('');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md pointer-events-auto"
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-[460px] max-w-[92vw] bg-[#0d0d15] border border-[#EB9A21]/25 rounded-3xl shadow-[0_40px_120px_rgba(235,154,33,0.15)] overflow-hidden pointer-events-auto"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#EB9A21] to-transparent pointer-events-none" />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#EB9A21]/10 border border-[#EB9A21]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_24px_rgba(235,154,33,0.2)] text-[#EB9A21]">
              <Workflow size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#EB9A21] mb-1">New Sequence</p>
              <h2 className="text-2xl font-black text-white font-display leading-tight">Create Flow</h2>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="sequence-name-input" className="text-[10px] text-slate-500 uppercase tracking-widest font-black block">
                Sequence Name
              </label>
              <input
                id="sequence-name-input"
                type="text"
                autoFocus
                placeholder="e.g., Market Research Pipeline"
                value={sequenceName}
                onChange={(e) => setSequenceName(e.target.value)}
                className="w-full px-4 py-3.5 bg-white/[0.02] border border-white/10 rounded-2xl text-white outline-none focus:border-[#EB9A21] focus:ring-1 focus:ring-[#EB9A21]/50 transition-all font-sans text-sm"
                required
              />
            </div>

            {/* Info callout */}
            <div className="flex items-start gap-3 p-3.5 bg-[#EB9A21]/5 border border-[#EB9A21]/10 rounded-2xl text-[11px] text-[#EB9A21] leading-relaxed">
              <HelpCircle size={14} className="flex-shrink-0 mt-0.5" />
              <span>
                This will create a new workflow sequence and open the <strong>Builder</strong> where you can add agents, configure triggers, and wire your pipeline.
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => { onClose(); setSequenceName(''); }}
                className="flex-1 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all uppercase tracking-widest"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!sequenceName.trim()}
                className="flex-[1.5] py-3.5 rounded-2xl bg-[#EB9A21] text-white text-sm font-black uppercase tracking-widest hover:bg-[#c57f12] disabled:opacity-50 disabled:hover:bg-[#EB9A21] active:scale-95 transition-all shadow-[0_8px_30px_rgba(235,154,33,0.3)]"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
