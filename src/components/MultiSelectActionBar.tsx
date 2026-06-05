import React from 'react';
import { Layers, X } from 'lucide-react';

interface MultiSelectActionBarProps {
  selectedCount: number;
  onCreateGroup: () => void;
  onClearSelection: () => void;
}

export default function MultiSelectActionBar({
  selectedCount,
  onCreateGroup,
  onClearSelection,
}: MultiSelectActionBarProps) {
  if (selectedCount < 2) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[50] pointer-events-auto">
      <div className="flex items-center gap-6 px-6 py-4 bg-[#141419]/90 backdrop-blur-md border border-[#3e3e4a] shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-2xl animate-fade-in transition-all">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#DEF767]/10 border border-[#DEF767]/20 text-[#DEF767]">
            <Layers size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Selection Mode</span>
            <span className="text-sm font-bold text-white tracking-wide">
              {selectedCount} agent{selectedCount > 1 ? 's' : ''} selected
            </span>
          </div>
        </div>

        <div className="h-8 w-[1px] bg-[#2e2e38]" />

        <div className="flex items-center gap-3">
          <button
            onClick={onClearSelection}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all uppercase tracking-wider"
          >
            <X size={12} /> Clear
          </button>
          <button
            onClick={onCreateGroup}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#DEF767] to-[#A3E636] text-black text-xs font-black uppercase tracking-widest shadow-lg shadow-[#DEF767]/15 hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
}
