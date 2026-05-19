import React from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface StatusBadgeProps {
  state: 'idle' | 'running' | 'completed' | string;
  mini?: boolean;
}

const StatusBadge = ({ state }: StatusBadgeProps) => {
  if (state === 'running') {
    return (
      <div className="flex items-center gap-1.5">
        <Loader2 className="animate-spin text-white" size={12} />
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">
          Running
        </span>
      </div>
    );
  }

  if (state === 'completed' || state === 'success') {
    return (
      <div className="flex items-center gap-1.5">
        <CheckCircle2 className="text-[#5b8a62]" size={12} />
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#5b8a62]">
          Ready
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 opacity-60">
      <div className="w-1.5 h-1.5 rounded-full border border-zinc-500" />
      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">
        Standby
      </span>
    </div>
  );
};

export default StatusBadge;
