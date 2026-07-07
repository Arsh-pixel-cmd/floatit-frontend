import React, { useState } from 'react';
import { Layers, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface CreateGroupModalProps {
  isOpen: boolean;
  selectedAgentNames: string[];
  onCreate: (name: string) => void;
  onClose: () => void;
}

export default function CreateGroupModal({
  isOpen,
  selectedAgentNames,
  onCreate,
  onClose,
}: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) return;
    onCreate(groupName.trim());
    setGroupName('');
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md pointer-events-auto">
      <motion.div 
        drag
        dragMomentum={false}
        style={{ resize: 'both', overflow: 'auto', minWidth: '350px', minHeight: '300px', maxHeight: '90vh' }}
        className="relative w-[460px] max-w-[92vw] bg-[#0d0d15] border border-[#A259FF]/25 rounded-3xl shadow-[0_40px_120px_rgba(162,89,255,0.15)] pointer-events-auto flex flex-col"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#A259FF] to-transparent pointer-events-none" />
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#A259FF]/10 border border-[#A259FF]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_24px_rgba(162,89,255,0.2)] text-[#A259FF]">
              <Layers size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A259FF] mb-1">Execution Pipeline</p>
              <h2 className="text-2xl font-black text-white font-display leading-tight">Create Phase Group</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="group-name-input" className="text-[10px] text-slate-500 uppercase tracking-widest font-black block">
                Group Name
              </label>
              <input
                id="group-name-input"
                type="text"
                autoFocus
                placeholder="e.g., Target Identification"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full px-4 py-3.5 bg-white/[0.02] border border-white/10 rounded-2xl text-white outline-none focus:border-[#A259FF] focus:ring-1 focus:ring-[#A259FF]/50 transition-all font-sans text-sm"
                required
              />
            </div>

            <div className="space-y-3">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black block">
                Selected Agents ({selectedAgentNames.length})
              </span>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex-1 min-h-[140px] overflow-y-auto custom-scrollbar-neon space-y-2.5">
                {selectedAgentNames.map((name, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A259FF]/60" />
                    <span className="truncate">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-[#A259FF]/5 border border-[#A259FF]/10 rounded-2xl text-[11px] text-[#A259FF] leading-relaxed">
              <HelpCircle size={14} className="flex-shrink-0 mt-0.5" />
              <span>
                Creating a group will wrap these agents inside a phase and automatically add a synthesized <strong>Group Output</strong> node to summarize the combined outputs.
              </span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all uppercase tracking-widest"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!groupName.trim()}
                className="flex-[1.5] py-3.5 rounded-2xl bg-[#A259FF] text-white text-sm font-black uppercase tracking-widest hover:bg-[#b06fff] disabled:opacity-50 disabled:hover:bg-[#A259FF] active:scale-95 transition-all shadow-[0_8px_30px_rgba(162,89,255,0.3)]"
              >
                Create Phase
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
