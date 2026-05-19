import { Settings, Play, Clock } from 'lucide-react';
import { useAgentBlockNode } from './useAgentBlockNode';

interface BlockPosition {
  x: number;
  y: number;
}

interface BlockData {
  id: string;
  name?: string;
  description?: string;
  position: BlockPosition;
  size?: { width?: number; height?: number };
  triggerConfig: { type: string; [key: string]: any };
  waitConfig: { type: string; [key: string]: any };
  [key: string]: any;
}

interface AgentBlockNodeProps {
  block: BlockData;
  isSelected: boolean;
}

const AgentBlockNode = ({ block, isSelected }: AgentBlockNodeProps) => {
  const {
    blockW,
    blockH,
    borderClasses,
    pulseClass,
    handleNodeClick,
  } = useAgentBlockNode({ block, isSelected });

  return (
    // eslint-disable-next-line
    <div
      onClick={handleNodeClick}
      className={`absolute border rounded-3xl p-5 transition-all duration-300 ease-out n8n-node overflow-visible group cursor-pointer font-sans flex flex-col ${borderClasses} ${pulseClass}`}
      style={{
        left: Math.round(block.position.x),
        top: Math.round(block.position.y),
        width: Math.round(blockW),
        height: Math.round(blockH),
      }}
    >
      {/* Port - Input */}
      <div
        className="absolute w-3.5 h-3.5 bg-[#181818] border border-[#5b5b5b] hover:border-[#DEF767] hover:bg-[#DEF767] rounded-full left-1/2 -translate-x-1/2 -top-1.5 z-20 transition-colors duration-150 cursor-crosshair connection-port"
        data-port-id={block.id}
        data-port-position="top"
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-3 pb-3 border-b border-[#3e3e3e] shrink-0 w-full">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-[#1a1a1a] border border-[#3e3e3e] text-[#DEF767]">
            <Settings size={14} />
          </div>
          <h3 className="text-[14px] font-bold text-white tracking-wide truncate max-w-[150px] font-sans">
            {block.name || 'Agent Block'}
          </h3>
        </div>
      </div>

      {/* Body Description */}
      <p className="text-[11px] text-zinc-300 line-clamp-3 font-sans mb-3 leading-relaxed flex-grow overflow-y-auto custom-scrollbar-neon pr-1 shrink">
        {block.description || 'No description provided.'}
      </p>

      {/* Footer Details */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#3e3e3e] text-[10px] text-zinc-400 font-bold uppercase tracking-widest gap-2 font-sans shrink-0 w-full">
        <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#3e3e3e] px-2.5 py-1 rounded-md min-w-max whitespace-nowrap">
          <Play size={10} className="text-zinc-400" /> {String(block.triggerConfig.type || '').toUpperCase()}
        </div>
        {(block.waitConfig.type !== 'none') && (
          <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#3e3e3e] px-2.5 py-1 rounded-md min-w-max whitespace-nowrap">
            <Clock size={10} className="text-zinc-400" /> {String(block.waitConfig.type || '').toUpperCase()}
          </div>
        )}
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

export default AgentBlockNode;
