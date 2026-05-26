import React from 'react';
import { Sparkles } from 'lucide-react';
import type { PhaseOverlayState } from '../../types/engine';

interface PhaseTransitionOverlayProps {
  phaseOverlay: PhaseOverlayState | null;
}

export default function PhaseTransitionOverlay({ phaseOverlay }: PhaseTransitionOverlayProps) {
  if (!phaseOverlay) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md pointer-events-auto">
      <div className="relative flex flex-col items-center bg-[#0a0a0f] border border-white/10 p-10 rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden max-w-md w-full animate-fade-in-up text-center">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#DEF767]/10 blur-[60px] rounded-full pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-[#DEF767]/10 border border-[#DEF767]/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(222,247,103,0.15)] pointer-events-none">
          <Sparkles className="text-[#DEF767]" size={28} />
        </div>

        <div className="text-[#DEF767] font-black tracking-[0.25em] text-[10px] uppercase mb-2">
          PHASE {phaseOverlay.phase} COMPLETE
        </div>

        <h2 className="text-2xl font-black text-white uppercase tracking-wider font-display mb-4">
          {phaseOverlay.phaseName}
        </h2>

        <div className="w-12 h-0.5 bg-white/10 my-4" />

        <div className="text-slate-400 text-xs tracking-widest uppercase font-bold">
          Initializing {phaseOverlay.nextPhaseName}
        </div>
      </div>
    </div>
  );
}
