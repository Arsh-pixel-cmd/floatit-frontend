import { Webhook, Link2 } from 'lucide-react';
import { useBuilderStore } from '../lib/builderStore';

interface BlockData {
  id: string;
  name?: string;
  description?: string;
  linkedSequenceId?: string | null;
  linkedSequenceName?: string;
  position: { x: number; y: number };
  size?: { width?: number; height?: number };
  triggerConfig: { type: string;[key: string]: any };
  waitConfig: { type: string;[key: string]: any };
  [key: string]: any;
}

interface WebhookBlockNodeProps {
  block: BlockData;
  isSelected: boolean;
}

const WebhookBlockNode = ({ block, isSelected }: WebhookBlockNodeProps) => {
  const { setSelectedElementId, nodeStatus } = useBuilderStore();
  const status = nodeStatus[block.id] || 'idle';
  const blockW = block.size?.width || 260;
  const blockH = block.size?.height || 150;

  // Accessible Depth Design: Elevated 3D look with custom shadow states
  let borderClasses = 'border-[#3e3e3e] bg-[#242424] shadow-[0_12px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.7)] hover:-translate-y-1 hover:scale-[1.01] z-10';
  let pulseClass = '';

  if (isSelected) {
    borderClasses = 'border-[#DEF767] bg-[#242424] shadow-[0_15px_40px_rgba(222,247,103,0.2)] scale-[1.01] -translate-y-0.5 z-50';
  } else if (status === 'running') {
    borderClasses = 'border-white bg-[#242424] shadow-[0_0_30px_rgba(255,255,255,0.25)] scale-[1.01] -translate-y-0.5 z-40';
    pulseClass = 'animate-pulse';
  } else if (status === 'success') {
    borderClasses = 'border-[#5b8a62] bg-[#242424] shadow-[0_12px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(91,138,98,0.15)] z-30';
  } else if (status === 'error') {
    borderClasses = 'border-[#ff6a6a] bg-[#242424] shadow-[0_15px_40px_rgba(255,106,106,0.15)] z-30';
  }

  return (
    // eslint-disable-next-line
    <div
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElementId(block.id);
      }}
      className={`absolute border rounded-3xl p-5 transition-all duration-300 ease-out n8n-node overflow-visible group cursor-pointer font-sans ${borderClasses} ${pulseClass}`}
      style={{
        left: Math.round(block.position.x),
        top: Math.round(block.position.y),
        width: Math.round(blockW),
        minHeight: Math.round(blockH),
      }}
    >
      {/* Port - Input */}
      <div
        className="absolute w-3.5 h-3.5 bg-[#181818] border border-[#5b5b5b] hover:border-[#DEF767] hover:bg-[#DEF767] rounded-full left-1/2 -translate-x-1/2 -top-1.5 z-20 transition-colors duration-150 cursor-crosshair connection-port"
        data-port-id={block.id}
        data-port-position="top"
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4 pb-3 border-b border-[#3e3e3e] w-full">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-[#1a1a1a] border border-[#3e3e3e] text-[#DEF767]">
            <Webhook size={14} />
          </div>
          <h3 className="text-[14px] font-bold text-white tracking-wide truncate max-w-[150px] font-sans">
            {block.name || 'Webhook Bridge'}
          </h3>
        </div>
      </div>

      {/* Body */}
      <p className="text-[11px] text-zinc-300 line-clamp-2 min-h-[32px] font-sans mb-3 leading-relaxed w-full">
        {block.description || 'Links to another workflow...'}
      </p>

      {/* Linked Sequence Badge */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1a1a1a] border border-[#3e3e3e] mb-3 w-full">
        <Link2 size={12} className="text-[#DEF767]" />
        <span className="text-[10px] font-bold text-[#DEF767] uppercase tracking-wider truncate font-sans">
          {block.linkedSequenceName || 'No workflow linked'}
        </span>
      </div>

      {/* Footer Details */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#3e3e3e] text-[10px] text-zinc-400 font-bold uppercase tracking-widest font-sans w-full">
        <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#3e3e3e] px-2.5 py-1.5 rounded-md">
          <Webhook size={10} className="text-[#DEF767]" /> Bridge
        </div>
      </div>

      {/* Port - Output (Bottom) */}
      <div
        className="absolute w-3.5 h-3.5 bg-[#181818] border border-[#5b5b5b] hover:border-[#DEF767] hover:bg-[#DEF767] rounded-full left-1/2 -translate-x-1/2 -bottom-1.5 z-20 transition-colors duration-150 cursor-crosshair connection-port"
        data-port-id={block.id}
        data-port-position="bottom"
      />

      {/* Port - Left */}
      <div
        className="absolute w-3.5 h-3.5 bg-[#181818] border border-[#5b5b5b] hover:border-[#DEF767] hover:bg-[#DEF767] rounded-full -left-1.5 top-1/2 -translate-y-1/2 z-20 transition-colors duration-150 cursor-crosshair connection-port"
        data-port-id={block.id}
        data-port-position="left"
      />

      {/* Port - Right */}
      <div
        className="absolute w-3.5 h-3.5 bg-[#181818] border border-[#5b5b5b] hover:border-[#DEF767] hover:bg-[#DEF767] rounded-full -right-1.5 top-1/2 -translate-y-1/2 z-20 transition-colors duration-150 cursor-crosshair connection-port"
        data-port-id={block.id}
        data-port-position="right"
      />

      {/* Resize Handle */}
      {/* eslint-disable-next-line */}
      <div
        className="resize-handle absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize opacity-0 group-hover:opacity-100 transition-opacity z-30 flex items-end justify-end p-1.5"
      >
        <div className="w-2.5 h-2.5 border-r-2 border-b-2 border-[#5b5b5b] group-hover:border-[#DEF767] transition-colors pointer-events-none" />
      </div>
    </div>
  );
};

export default WebhookBlockNode;
