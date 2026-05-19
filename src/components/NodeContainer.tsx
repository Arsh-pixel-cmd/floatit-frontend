import React from 'react';
import {
  Search, Eye, Users, BookOpen, User, Compass, Target, Lightbulb,
  Sparkles, Layers, Box, Palette, ShieldCheck, RefreshCw, FileText, Rocket, AlertTriangle
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import ThinkingTerminal from './ThinkingTerminal';
import { useWorkflowStore } from '../lib/store';
import { useBuilderStore } from '../lib/builderStore';

const ICON_MAP = {
  Search, Eye, Users, BookOpen, User, Compass, Target, Lightbulb,
  Sparkles, Layers, Box, Palette, ShieldCheck, RefreshCw, FileText, Rocket,
};

const PHASE_COLORS = {
  'discover': { accent: '#DEF767', bg: '#1a1a1a' },
  'define': { accent: '#ff6a6a', bg: '#1a1a1a' },
  'develop': { accent: '#DEF767', bg: '#1a1a1a' },
  'deliver': { accent: '#ff6a6a', bg: '#1a1a1a' },
};

interface NodeData {
  id: string;
  x: number;
  y: number;
  icon: string;
  phase: string;
  category: { name: string; description?: string; tools?: string[] };
  [key: string]: any;
}

interface NodeContainerProps {
  node: NodeData;
  state: string;
  onClick: () => void;
  isVisible?: boolean;
}

const NodeContainer = ({ node, state, onClick, isVisible = true }: NodeContainerProps) => {
  const IconComponent = ICON_MAP[node.icon as keyof typeof ICON_MAP] || Box;
  const phaseColor = PHASE_COLORS[node.phase as keyof typeof PHASE_COLORS] || PHASE_COLORS['discover'];

  const [size, setSize] = React.useState({
    width: node.blockRef?.size?.width || node.size?.width || 260,
    height: node.blockRef?.size?.height || node.size?.height || 150
  });

  // Keep size in sync if node properties change (e.g. database hydration)
  React.useEffect(() => {
    setSize({
      width: node.blockRef?.size?.width || node.size?.width || 260,
      height: node.blockRef?.size?.height || node.size?.height || 150
    });
  }, [node]);

  const handleResizeMouseDown = (mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.stopPropagation();
    mouseDownEvent.preventDefault();

    const startWidth = size.width;
    const startHeight = size.height;
    const startMouseX = mouseDownEvent.clientX;
    const startMouseY = mouseDownEvent.clientY;

    // Dynamically retrieve canvas zoom level from DOM state custom property
    const canvasContent = document.querySelector('.canvas-content') as HTMLElement;
    const zoom = canvasContent ? parseFloat(getComputedStyle(canvasContent).getPropertyValue('--canvas-zoom')) || 1.0 : 1.0;

    const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
      const dx = (mouseMoveEvent.clientX - startMouseX) / zoom;
      const dy = (mouseMoveEvent.clientY - startMouseY) / zoom;

      const newWidth = Math.max(180, startWidth + dx);
      const newHeight = Math.max(120, startHeight + dy);

      setSize({ width: newWidth, height: newHeight });

      // Propagate dimension changes to the Builder Zustand store
      const store = useBuilderStore.getState();
      if (store.updateBlock && node.id) {
        store.updateBlock(node.id, {
          size: { width: newWidth, height: newHeight }
        });
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className={`absolute border rounded-3xl p-5 transition-all duration-300 ease-out n8n-node overflow-visible cursor-pointer font-sans flex flex-col pointer-events-auto group ${
        isVisible ? 'revealed' : 'hidden'
      } ${
        state === 'running'
          ? 'border-white bg-[#242424] shadow-[0_0_30px_rgba(255,255,255,0.25)] scale-[1.01] -translate-y-0.5 z-40 animate-pulse'
          : state === 'completed'
          ? 'border-[#5b8a62] bg-[#242424] shadow-[0_12px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(91,138,98,0.15)] z-30'
          : 'border-[#3e3e3e] bg-[#242424] shadow-[0_12px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.7)] hover:-translate-y-1 hover:scale-[1.01] z-10'
      }`}
      style={{
        left: node.x,
        top: node.y,
        width: Math.round(size.width),
        height: Math.round(size.height),
      }}
      onClick={onClick}
    >
      {/* Stream Logs & Thinking Terminal integration */}
      <ThinkingTerminal node={node} isRunning={state === 'running'} />

      {/* Port - Input (Left) */}
      <div
        className="absolute w-3.5 h-3.5 bg-[#181818] rounded-full -left-1.5 top-1/2 -translate-y-1/2 z-20 transition-colors duration-150 border"
        style={{
          borderColor: state === 'running' ? '#ffffff' : state === 'completed' ? '#5b8a62' : '#5b5b5b'
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-3 pb-3 border-b border-[#3e3e3e] shrink-0 w-full">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-[#1a1a1a] border border-[#3e3e3e] flex items-center justify-center shrink-0">
            <IconComponent size={14} style={{ color: phaseColor.accent }} />
          </div>
          <h3 className="text-[14px] font-bold text-white tracking-wide truncate max-w-[150px] font-sans">
            {node.category.name}
          </h3>
        </div>
      </div>

      {/* Body Description */}
      <p className="text-[11px] text-zinc-300 line-clamp-3 font-sans mb-3 leading-relaxed flex-grow overflow-y-auto custom-scrollbar-neon pr-1 shrink text-left w-full">
        {node.category.description || `Orchestrating ${node.category.name.toLowerCase()} agent protocols...`}
      </p>

      {/* Footer Details */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#3e3e3e] text-[10px] text-zinc-400 font-bold uppercase tracking-widest gap-2 font-sans shrink-0 w-full">
        <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#3e3e3e] px-2.5 py-1 rounded-md min-w-max whitespace-nowrap">
          <StatusBadge state={state} />
        </div>
        {node.phase && (
          <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#3e3e3e] px-2.5 py-1 rounded-md min-w-max whitespace-nowrap">
            <span style={{ color: phaseColor.accent }}>{node.phase.toUpperCase()}</span>
          </div>
        )}
      </div>

      {/* Port - Output (Right) */}
      <div
        className="absolute w-3.5 h-3.5 bg-[#181818] rounded-full -right-1.5 top-1/2 -translate-y-1/2 z-20 transition-colors duration-150 border"
        style={{
          borderColor: state === 'completed' ? '#5b8a62' : state === 'running' ? '#ffffff' : '#5b5b5b'
        }}
      />

      {/* Stuck Debugger Overlay */}
      {state === 'stuck_debugger' && (
        <div className="absolute inset-0 bg-[#242424] rounded-3xl flex flex-col items-center justify-center p-5 z-50 border border-[#ff6a6a] shadow-[0_15px_40px_rgba(255,106,106,0.2)]">
          <AlertTriangle size={24} className="text-[#ff6a6a] mb-2" />
          <span className="text-[11px] font-bold text-red-200 uppercase tracking-widest text-center leading-tight mb-4 font-sans">Process Halted</span>
          <div className="flex gap-2.5 mt-auto w-full">
             <button 
               onClick={(e) => { e.stopPropagation(); useWorkflowStore.getState().setNodeState(node.id, 'running'); }}
               className="flex-1 bg-[#ff6a6a]/20 text-[#ff6a6a] text-[10px] font-bold py-2 rounded-xl border border-[#ff6a6a]/40 hover:bg-[#ff6a6a]/40 transition-all duration-200 font-sans"
             >
               RETRY
             </button>
             <button 
               onClick={(e) => { 
                 e.stopPropagation(); 
                 useWorkflowStore.getState().setNodeResult(node.id, { content: 'Skipped manually', ui: '<div style="padding:20px;color:#888;">Manually skipped by user.</div>' });
                 useWorkflowStore.getState().setNodeState(node.id, 'completed'); 
               }}
               className="flex-1 bg-[#1a1a1a] text-white text-[10px] font-bold py-2 rounded-xl border border-[#3e3e3e] hover:bg-white/10 transition-all duration-200 font-sans"
             >
               SKIP
             </button>
          </div>
        </div>
      )}

      {/* Resize Handle */}
      {/* eslint-disable-next-line */}
      <div
        onMouseDown={handleResizeMouseDown}
        className="resize-handle absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize opacity-0 group-hover:opacity-100 transition-opacity z-30 flex items-end justify-end p-1.5"
      >
        <div className="w-2.5 h-2.5 border-r-2 border-b-2 border-[#5b5b5b] group-hover:border-[#DEF767] transition-colors pointer-events-none" />
      </div>
    </div>
  );
};

export default React.memo(NodeContainer);
