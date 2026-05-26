import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface FlowHeaderValidationModalProps {
  validationErrors: string[];
  onClose: () => void;
}

export default function FlowHeaderValidationModal({ validationErrors, onClose }: FlowHeaderValidationModalProps) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md pointer-events-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-[32px] overflow-hidden flex flex-col border border-[#ff6a6a]/20 bg-[#0a0a0f] shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#ff6a6a]/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#ff6a6a]/10 border border-[#ff6a6a]/20">
              <AlertTriangle size={18} className="text-[#ff6a6a]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display uppercase tracking-wide">Pipeline Setup Incomplete</h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold mt-0.5">Please resolve before compiling</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/5 transition-all text-slate-500 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-6 py-5 max-h-[50vh] overflow-y-auto custom-scrollbar space-y-2">
          {validationErrors.map((err, i) => (
            <div
              key={i}
              className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5"
            >
              <span className="text-[#ff6a6a] text-xs font-mono font-bold mt-0.5 shrink-0">{i + 1}.</span>
              <span className="text-sm text-slate-300 leading-relaxed font-sans">{err}</span>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-white/5 bg-black/20">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#ff6a6a] text-black font-black uppercase tracking-widest hover:opacity-90 transition-opacity text-xs"
          >
            Got it — I'll fix it
          </button>
        </div>
      </div>
    </div>
  );
}
