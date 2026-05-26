import React from 'react';
import { GitMerge, LayoutGrid } from 'lucide-react';

type FlowHeaderViewMode = 'pipeline' | 'builder';

interface FlowHeaderViewToggleProps {
  viewMode: FlowHeaderViewMode;
  onChange: (mode: FlowHeaderViewMode) => void;
}

export default function FlowHeaderViewToggle({ viewMode, onChange }: FlowHeaderViewToggleProps) {
  return (
    <div className="flex items-center justify-center gap-[4rem] bg-white/[0.02] border border-white/[0.05] py-2 px-8 rounded-3xl shadow-xl backdrop-blur-xl flex-shrink-0 mx-4">
      <button
        data-tour="pipeline-toggle"
        onClick={() => onChange('pipeline')}
        className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${viewMode === 'pipeline'
          ? 'bg-[#242424] text-white '
          : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
          }`}
      >
        <GitMerge size={14} className={viewMode === 'pipeline' ? 'animate-pulse' : ''} /> Pipeline
      </button>
      <button
        onClick={() => onChange('builder')}
        className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${viewMode === 'builder'
          ? 'bg-[#A259FF] text-white shadow-[0_5px_20px_rgba(162,89,255,0.3)]'
          : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
          }`}
      >
        <LayoutGrid size={14} /> Builder
      </button>
    </div>
  );
}
