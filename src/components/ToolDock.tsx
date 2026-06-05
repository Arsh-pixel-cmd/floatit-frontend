import React, { useState, useEffect, useRef } from 'react';
import { MousePointer2, StickyNote, Highlighter, LayoutTemplate, Eraser, Camera, Lock, Unlock, Type, PlusSquare, Network, Webhook } from 'lucide-react';
import { useBuilderStore } from '../lib/builderStore';
import type { ToolType } from '../types/engine';

interface ToolDockProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
  canvasLocked: boolean;
  setCanvasLocked: (locked: boolean) => void;
  onScreenshot: () => void;
  onEraseAll: () => void;
  onLockToggle?: (locked: boolean) => void;
}

const ToolDock = ({ activeTool, setActiveTool, canvasLocked, setCanvasLocked, onScreenshot, onEraseAll, onLockToggle }: ToolDockProps) => {
  const { viewMode, setViewMode, addBlock, addWebhookBlock, isTopologyLocked } = useBuilderStore();

  // Apple-style persistent scaling state
  const [dockScale, setDockScale] = useState(1);
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedScale = localStorage.getItem('agentic_flow_dock_scale');
    if (savedScale) {
      setDockScale(parseFloat(savedScale));
    }
  }, []);

  const handleSeparatorDrag = (e: React.PointerEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startScale = dockScale;

    document.body.style.cursor = 'ew-resize';

    const onPointerMove = (moveEvent: PointerEvent) => {
      const deltaX = startX - moveEvent.clientX;
      const sensitivity = 0.005;
      const newScale = Math.min(Math.max(0.5, startScale - deltaX * sensitivity), 2.5);

      setDockScale(newScale);
      localStorage.setItem('agentic_flow_dock_scale', newScale.toString());
    };

    const onPointerUp = () => {
      document.body.style.cursor = '';
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const Separator = () => (
    <div
      className="w-12 h-4 flex items-center justify-center group/sep self-center"
      style={{ cursor: 'ew-resize' }}
      onPointerDown={handleSeparatorDrag}
      title="Drag to resize dock"
    >
      <div className="w-8 h-px bg-white/10 group-hover/sep:bg-slate-500 transition-colors rounded-full" />
    </div>
  );

  return (
    <div
      ref={dockRef}
      className="absolute left-6 top-1/2 z-[60] flex flex-col items-center gap-4 p-4 py-6 rounded-[32px] border border-white/10 bg-[#0a0a0f]/80 backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] group/dock font-sans"
      style={{
        transform: `translateY(-50%) scale(${dockScale})`,
        transformOrigin: 'left center',
        transition: 'transform 0.1s ease-out, background-color 0.3s, border 0.3s'
      }}
    >

      {viewMode === 'builder' && (
        <>
          {!isTopologyLocked && (
            <>
              <ToolButton data-tour="add-agent-btn" onClick={() => addBlock()} icon={<PlusSquare size={20} />} title="Add Agent Block" />
              <ToolButton data-tour="add-webhook-btn" onClick={() => addWebhookBlock()} icon={<Webhook size={20} />} title="Add Webhook Bridge" />
              <ToolButton active={activeTool === 'connect'} onClick={() => setActiveTool('connect')} icon={<Network size={20} />} title="Connect Blocks" />
              <Separator />
            </>
          )}
        </>
      )}

      <ToolButton active={activeTool === 'cursor'} onClick={() => setActiveTool('cursor')} icon={<MousePointer2 size={20} />} title="Cursor" />
      <ToolButton active={activeTool === 'sticky'} onClick={() => setActiveTool('sticky')} icon={<StickyNote size={20} />} title="Sticky Note" />
      <ToolButton active={activeTool === 'text'} onClick={() => setActiveTool('text')} icon={<Type size={20} />} title="Text Label" />
      <ToolButton active={activeTool === 'highlighter'} onClick={() => setActiveTool('highlighter')} icon={<Highlighter size={20} />} title="Highlighter" />

      <Separator />

      <ToolButton onClick={onEraseAll} icon={<Eraser size={20} />} title="Clear & Reset" />
      <ToolButton onClick={onScreenshot} icon={<Camera size={20} />} title="Screenshot Canvas" />
      <ToolButton
        active={canvasLocked}
        onClick={() => {
          const newState = !canvasLocked;
          setCanvasLocked(newState);
          onLockToggle?.(newState);
        }}
        icon={canvasLocked ? <Lock size={20} /> : <Unlock size={20} />}
        title={canvasLocked ? "Unlock Canvas" : "Lock Canvas"}
      />

      <Separator />

      <ToolButton
        active={viewMode === 'templates'}
        onClick={() => setViewMode(viewMode === 'templates' ? 'builder' : 'templates')}
        icon={<LayoutTemplate size={20} />}
        title="Templates Library"
      />
    </div>
  );
};

interface ToolButtonProps {
  active?: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  'data-tour'?: string;
}

const ToolButton = ({ active, onClick, icon, title, ...rest }: ToolButtonProps) => (
  <div className="relative group/btn w-12 flex justify-center font-sans" data-tour={rest['data-tour']}>
    <button
      onClick={onClick}
      className={`p-3 rounded-xl transition-all duration-300 origin-left group-hover/btn:scale-[1.2] group-hover/btn:translate-x-2 active:scale-95 border ${active
        ? 'bg-[#DEF767] text-black border-[#DEF767] shadow-[0_0_20px_rgba(222,247,103,0.3)]'
        : 'text-slate-400 border-transparent group-hover/btn:text-white group-hover/btn:bg-white/5 group-hover/btn:border-white/10'
        }`}
    >
      {icon}
    </button>
    <div className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-[0_10px_30px_rgba(0,0,0,0.8)] font-sans z-50">
      {title}
    </div>
    {active && <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1 h-1 rounded-full bg-[#DEF767]" />}
  </div>
);

export default ToolDock;
