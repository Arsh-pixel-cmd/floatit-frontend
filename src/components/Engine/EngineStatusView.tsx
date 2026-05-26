import React from 'react';
import { AlertTriangle } from 'lucide-react';
import type { GraphStatus } from '../../types/engine';

interface EngineStatusViewProps {
  graphStatus: GraphStatus;
  initError: string | null;
  layout: Record<string, any> | null;
}

export default function EngineStatusView({ graphStatus, initError, layout }: EngineStatusViewProps) {
  if (graphStatus === 'error') {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#0a0a10] text-slate-200 relative p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,106,106,0.03)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative flex flex-col items-center bg-[#0d0d15] border border-[#ff6a6a]/20 p-10 rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden max-w-md w-full text-center">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#ff6a6a]/10 blur-[60px] rounded-full pointer-events-none" />

          <div className="w-16 h-16 rounded-2xl bg-[#ff6a6a]/10 border border-[#ff6a6a]/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,106,106,0.15)] pointer-events-none">
            <AlertTriangle className="text-[#ff6a6a]" size={28} />
          </div>

          <div className="text-[#ff6a6a] font-black tracking-[0.25em] text-[10px] uppercase mb-2">
            CRITICAL SYSTEM HALT
          </div>

          <h2 className="text-2xl font-black text-white uppercase tracking-wider font-display mb-4">
            Graph Validation Failed
          </h2>

          <div className="w-12 h-0.5 bg-white/10 my-4" />

          <p className="text-slate-400 text-xs font-mono bg-white/[0.02] border border-white/5 p-4 rounded-xl w-full break-all leading-relaxed">
            {initError}
          </p>
        </div>
      </div>
    );
  }

  if (!layout) {
    return (
      <div className="h-screen w-screen bg-[#0a0a10] flex flex-col items-center justify-center relative p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(162,89,255,0.03)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative flex flex-col items-center bg-[#0d0d15] border border-white/10 p-10 rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden max-w-sm w-full text-center">
          <div className="relative w-16 h-16 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-white/5" />
            <div className="absolute inset-0 rounded-full border-4 border-[#A259FF] border-t-transparent animate-spin" />
          </div>

          <div className="text-[#A259FF] font-black tracking-[0.25em] text-[10px] uppercase mb-2">
            INITIALIZING CANVAS
          </div>

          <h2 className="text-xl font-black text-white uppercase tracking-wider font-display mb-4">
            Loading Neural Pipeline
          </h2>

          <div className="w-12 h-0.5 bg-white/10 my-2" />

          <p className="text-slate-500 text-xs mt-2">
            Connecting node matrices and building visual canvas layers...
          </p>
        </div>
      </div>
    );
  }

  return null;
}
