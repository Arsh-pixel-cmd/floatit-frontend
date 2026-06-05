import React, { useState, useEffect } from 'react';
import { useBuilderStore } from '../lib/builderStore';
import AgentBlockNode from './AgentBlockNode';
import WebhookBlockNode from './WebhookBlockNode';
import { Trash2 } from 'lucide-react';
import { computeEdgePath } from '../lib/edgeRouter';
import type { ToolType } from '../types/engine';
import MultiSelectActionBar from './MultiSelectActionBar';
import CreateGroupModal from './CreateGroupModal';

interface Coords { x: number; y: number; }

interface DraggingElement {
  type: 'block' | 'sticky';
  id: string;
  startX: number;
  startY: number;
  startMouseX: number;
  startMouseY: number;
}

interface WiringState {
  sourceId: string;
  sourcePort: string | null;
  startPos: Coords;
  currentMousePos: Coords;
}

interface ResizingElement {
  type: 'block' | 'sticky';
  id: string;
  elemX: number;
  elemY: number;
}

interface BuilderCanvasProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
  getCanvasCoords: (clientX: number, clientY: number) => Coords;
}

const BuilderCanvas = ({ activeTool, setActiveTool, getCanvasCoords }: BuilderCanvasProps) => {
  const { 
    blocks, connections, updateBlock, selectedElementId, 
    setSelectedElementId, connectBlocks,
    stickyNotes, addStickyNote, updateStickyNote, deleteStickyNote,
    textLabels, addTextLabel, updateTextLabel, deleteTextLabel,
    nodeStatus,  isTopologyLocked,
    groups, selectedBlockIds, toggleBlockSelection, clearBlockSelection, createGroup
  } = useBuilderStore();

  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);

  const [draggingElement, setDraggingElement] = useState<DraggingElement | null>(null);
  const [wiringState, setWiringState] = useState<WiringState | null>(null);
  const [resizingElement, setResizingElement] = useState<ResizingElement | null>(null);

  // Dragging + wiring + resizing logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggingElement) {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        const dx = coords.x - draggingElement.startMouseX;
        const dy = coords.y - draggingElement.startMouseY;
        const newPos = { x: draggingElement.startX + dx, y: draggingElement.startY + dy };
        
        if (draggingElement.type === 'block') {
          updateBlock(draggingElement.id, { position: newPos });
        } else if (draggingElement.type === 'sticky') {
          updateStickyNote(draggingElement.id, { position: newPos });
        }
      }

      if (wiringState) {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        setWiringState(prev => prev ? { ...prev, currentMousePos: coords } : null);
      }

      if (resizingElement) {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        const newWidth = Math.max(120, coords.x - resizingElement.elemX);
        const newHeight = Math.max(120, coords.y - resizingElement.elemY);
        
        if (resizingElement.type === 'block') {
          updateBlock(resizingElement.id, { size: { width: Math.max(180, newWidth), height: newHeight } });
        } else if (resizingElement.type === 'sticky') {
          updateStickyNote(resizingElement.id, { size: { width: newWidth, height: newHeight } });
        }
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (draggingElement) setDraggingElement(null);
      if (resizingElement) setResizingElement(null);
      
      if (wiringState) {
        const target = document.elementFromPoint(e.clientX, e.clientY);
        if (target && target.classList.contains('connection-port')) {
          const targetId = target.getAttribute('data-port-id');
          const targetPort = target.getAttribute('data-port-position');
          
          if (targetId && targetId !== wiringState.sourceId && wiringState.sourcePort && targetPort) {
            connectBlocks(wiringState.sourceId, targetId, wiringState.sourcePort, targetPort);
          }
        }
        setWiringState(null);
      }
    };

    if (draggingElement || wiringState || resizingElement) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingElement, wiringState, resizingElement, getCanvasCoords, updateBlock, connectBlocks, updateStickyNote]);

  const handleBlockMouseDown = (e: React.MouseEvent, block: any) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('resize-handle')) {
      if (isTopologyLocked) return; // Prevent resizing when topology is locked
      e.stopPropagation();
      setResizingElement({
        type: 'block',
        id: block.id,
        elemX: block.position.x,
        elemY: block.position.y
      });
      return;
    }

    // Check if clicked port
    if (target.classList.contains('connection-port')) {
        if (isTopologyLocked) return; // Prevent wiring when topology is locked
       e.stopPropagation();
       const portPosition = target.getAttribute('data-port-position');
       const blockW = block.size?.width || 260;
       const blockH = block.size?.height || 150;
       
       const getAnchorCoords = (b: any, port: string, w: number, h: number) => {
         if (port === 'top') return { x: b.position.x + w / 2, y: b.position.y };
         if (port === 'bottom') return { x: b.position.x + w / 2, y: b.position.y + h };
         if (port === 'left') return { x: b.position.x, y: b.position.y + h / 2 };
         if (port === 'right') return { x: b.position.x + w, y: b.position.y + h / 2 };
         return { x: b.position.x + w / 2, y: b.position.y };
       };

       const canvasStartCoords = getAnchorCoords(block, portPosition!, blockW, blockH);
       const coords = getCanvasCoords(e.clientX, e.clientY);
       
       setWiringState({
         sourceId: block.id,
         sourcePort: portPosition,
         startPos: canvasStartCoords,
         currentMousePos: coords
       });
       return;
    }

    if (activeTool === 'cursor') {
      e.stopPropagation();
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        toggleBlockSelection(block.id);
        return;
      }
      setSelectedElementId(block.id);
      clearBlockSelection();
      if (isTopologyLocked) return; // Prevent dragging when topology is locked
      const coords = getCanvasCoords(e.clientX, e.clientY);
      setDraggingElement({
        type: 'block',
        id: block.id,
        startX: block.position.x,
        startY: block.position.y,
        startMouseX: coords.x,
        startMouseY: coords.y
      });
    }
  };

  const handleStickyMouseDown = (e: React.MouseEvent, note: any) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('resize-handle')) {
      e.stopPropagation();
      setResizingElement({
        type: 'sticky',
        id: note.id,
        elemX: note.position.x,
        elemY: note.position.y
      });
      return;
    }

    if (activeTool === 'cursor') {
      e.stopPropagation();
      setSelectedElementId(`sticky-${note.id}`);
      const coords = getCanvasCoords(e.clientX, e.clientY);
      setDraggingElement({
        type: 'sticky',
        id: note.id,
        startX: note.position.x,
        startY: note.position.y,
        startMouseX: coords.x,
        startMouseY: coords.y
      });
    }
  };

  // Handle canvas click for adding tools
  const handleCanvasClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'builder-canvas-area') {
      if (activeTool === 'sticky') {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        addStickyNote(coords);
        setActiveTool('cursor');
      } else if (activeTool === 'text') {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        addTextLabel(coords);
        setActiveTool('cursor');
      }
    }
  };

  const renderGroupBoundaries = () => {
    return groups.map((group) => {
      const groupBlockIds = [...group.blockIds, group.outputBlockId];
      const groupBlocks = blocks.filter(b => groupBlockIds.includes(b.id));
      if (groupBlocks.length === 0) return null;

      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      groupBlocks.forEach(b => {
        const w = b.size?.width || 260;
        const h = b.size?.height || 150;
        minX = Math.min(minX, b.position.x);
        minY = Math.min(minY, b.position.y);
        maxX = Math.max(maxX, b.position.x + w);
        maxY = Math.max(maxY, b.position.y + h);
      });

      const padding = 24;
      const x = minX - padding;
      const y = minY - padding;
      const width = (maxX - minX) + padding * 2;
      const height = (maxY - minY) + padding * 2;

      return (
        <div
          key={`group-boundary-${group.id}`}
          className="absolute border border-dashed border-[#A259FF]/30 bg-[#A259FF]/3 rounded-[32px] pointer-events-none transition-all duration-300"
          style={{
            left: x,
            top: y,
            width,
            height,
            zIndex: 0,
          }}
        >
          <div className="absolute -top-7 left-6 bg-[#0f0f15] border border-[#A259FF]/30 text-[#A259FF] text-[9px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-lg">
            Phase: {group.name}
          </div>
        </div>
      );
    });
  };

  const renderConnections = () => {
    const paths = connections.map((conn: any) => {
      const srcBlock = blocks.find((b: any) => b.id === conn.sourceBlockId);
      const tgtBlock = blocks.find((b: any) => b.id === conn.targetBlockId);
      if (!srcBlock || !tgtBlock) return null;

      const srcW = srcBlock.size?.width || 260;
      const srcH = srcBlock.size?.height || 150;
      const tgtW = tgtBlock.size?.width || 260;
      const tgtH = tgtBlock.size?.height || 150;

      const isSrcAbove = srcBlock.position.y + srcH / 2 <= tgtBlock.position.y + tgtH / 2;

      const sPort = conn.sourcePort || (isSrcAbove ? 'bottom' : 'top');
      const tPort = conn.targetPort || (isSrcAbove ? 'top' : 'bottom');

      const getAnchor = (block: any, port: string, width: number, height: number) => {
        if (port === 'top') return { x: block.position.x + width / 2, y: block.position.y };
        if (port === 'bottom') return { x: block.position.x + width / 2, y: block.position.y + height };
        if (port === 'left') return { x: block.position.x, y: block.position.y + height / 2 };
        if (port === 'right') return { x: block.position.x + width, y: block.position.y + height / 2 };
        return { x: block.position.x + width / 2, y: block.position.y };
      };

      const p1 = getAnchor(srcBlock, sPort, srcW, srcH);
      const p2 = getAnchor(tgtBlock, tPort, tgtW, tgtH);

      const isSelected = selectedElementId === conn.id;
      const srcStatus = nodeStatus[conn.sourceBlockId];
      const tgtStatus = nodeStatus[conn.targetBlockId];
      const isAnimating = srcStatus === 'success' && tgtStatus === 'running';

      // Generate Manhattan Path
      const pathData = computeEdgePath(p1, p2, { sPort: sPort as any, tPort: tPort as any });

      return (
        <g key={conn.id} onClick={(e) => { e.stopPropagation(); setSelectedElementId(conn.id); }}>
          {/* Thick hover buffer wire */}
          <path d={pathData} stroke="transparent" strokeWidth="20" fill="none" className="cursor-pointer" style={{ strokeLinejoin: 'round', strokeLinecap: 'round' }} />
          {/* Main wire path */}
          <path
            d={pathData}
            stroke={isSelected || isAnimating ? "#b5b5b5" : "#5b5b5b"}
            strokeWidth={isSelected || isAnimating ? "3" : "1.5"}
            fill="none"
            strokeDasharray={isSelected || isAnimating ? undefined : "6 4"}
            strokeLinejoin="round"
            strokeLinecap="round"
            className={`transition-all cursor-pointer thread-wire ${isAnimating ? 'thread-active' : 'hover:stroke-[#b5b5b5]'}`}
          />
        </g>
      );
    });

    if (wiringState) {
      const p1 = wiringState.startPos;
      const p2 = wiringState.currentMousePos;
      const sPort = wiringState.sourcePort;

      const dx = Math.abs(p2.x - p1.x);
      const dy = Math.abs(p2.y - p1.y);
      const controlDist = Math.max(5, Math.min(100, Math.max(dx, dy) * 0.5));

      let cp1 = { x: p1.x, y: p1.y };
      if (sPort === 'right') cp1.x += controlDist;
      else if (sPort === 'left') cp1.x -= controlDist;
      else if (sPort === 'bottom') cp1.y += controlDist;
      else if (sPort === 'top') cp1.y -= controlDist;

      let cp2 = { x: p2.x, y: p2.y };
      if (sPort === 'bottom' || sPort === 'top') {
        cp2.y += p2.y < p1.y ? controlDist : -controlDist;
      } else {
        cp2.x += p2.x < p1.x ? controlDist : -controlDist;
      }

      const actPath = `M ${p1.x} ${p1.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p2.x} ${p2.y}`;
      paths.push(
        <path 
          key="active-wire" 
          d={actPath} 
          stroke="#b5b5b5" 
          strokeWidth="2" 
          fill="none" 
          strokeDasharray="6 4" 
          strokeLinejoin="round" 
          strokeLinecap="round" 
        />
      );
    }

    return paths;
  };

  return (
    <div id="builder-canvas-area" className="pointer-events-auto w-full h-full z-40 absolute inset-0" onClick={handleCanvasClick}>
      <svg className="absolute inset-0 pointer-events-none w-full h-full overflow-visible z-0">
         <g style={{ pointerEvents: 'all' }}>
           {renderConnections()}
         </g>
      </svg>
      
      {renderGroupBoundaries()}

      {/* Agent & Webhook Blocks */}
      {blocks.map((block: any) => (
        <div key={block.id} className="pointer-events-auto absolute" onMouseDown={(e) => handleBlockMouseDown(e, block)}>
          {block.type === 'webhook' ? (
            <WebhookBlockNode
              block={block}
              isSelected={selectedElementId === block.id}
              isTopologyLocked={isTopologyLocked}
              isMultiSelected={selectedBlockIds.has(block.id)}
            />
          ) : (
            <AgentBlockNode
              block={block}
              isSelected={selectedElementId === block.id}
              isTopologyLocked={isTopologyLocked}
              isMultiSelected={selectedBlockIds.has(block.id)}
            />
          )}
        </div>
      ))}

      {/* Builder Sticky Notes (Flat Brutalist Styling) */}
      {stickyNotes.map((note: any) => {
        const noteColor = '#DEF767'; // Enforce binary Lime accent
        const noteW = note.size?.width || 220;
        const noteH = note.size?.height || 160;
        const isSelected = selectedElementId === `sticky-${note.id}`;

        return (
          <div
            key={`builder-sticky-${note.id}`}
            className={`absolute sticky-note p-3 rounded-2xl z-20 transition-all font-sans flex flex-col group cursor-pointer border ${
              isSelected ? 'border-[#DEF767]' : 'border-[#2e2e2e]'
            }`}
            onMouseDown={(e) => handleStickyMouseDown(e, note)}
            style={{
              left: note.position.x,
              top: note.position.y,
              width: noteW,
              height: noteH,
              background: '#181818',
              pointerEvents: 'auto',
            }}
          >
            <div 
              className="w-full h-1 rounded-t-xl absolute top-0 left-0" 
              style={{ background: isSelected ? '#DEF767' : '#5b5b5b' }} 
            />
            
            <button
              aria-label="Delete Sticky Note"
              title="Delete Sticky Note"
              onClick={(e) => {
                e.stopPropagation();
                deleteStickyNote(note.id);
              }}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#2e2e2e] text-slate-400 hover:text-white hover:bg-[#ff6a6a] transition-all opacity-0 group-hover:opacity-100 z-50"
            >
              <Trash2 size={12} />
            </button>
            
            <textarea
              className="flex-1 w-full mt-3 bg-transparent outline-none resize-none text-slate-200 text-sm placeholder-slate-500 custom-scrollbar-neon"
              placeholder="Note insights here..."
              value={note.text}
              onMouseDown={e => e.stopPropagation()}
              onChange={(e) => updateStickyNote(note.id, { text: e.target.value })}
            />

            {/* Resize Handle */}
            <div
              className="resize-handle absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize opacity-0 group-hover:opacity-100 transition-opacity z-30"
              style={{
                background: `linear-gradient(135deg, transparent 50%, ${isSelected ? '#DEF767' : '#5b5b5b'} 50%)`,
                borderRadius: '0 0 16px 0',
              }}
            />
          </div>
        );
      })}

      {/* Builder Text Labels */}
      {textLabels.map((label: any) => (
        // eslint-disable-next-line
        <div
          key={`builder-label-${label.id}`}
          className="absolute z-20 pointer-events-auto group"
          style={{ left: label.x - 75, top: label.y - 15 }}
        >
          <input
            className="bg-transparent outline-none text-white text-sm font-bold w-[150px] placeholder-slate-500 border-b border-dashed border-[#2e2e2e] focus:border-[#DEF767] pb-1 transition-colors font-sans"
            placeholder="Type label..."
            value={label.text}
            onMouseDown={e => e.stopPropagation()}
            onChange={(e) => updateTextLabel(label.id, e.target.value)}
          />
          <button
            aria-label="Delete Label"
            title="Delete Label"
            onClick={() => deleteTextLabel(label.id)}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-md bg-[#2e2e2e] hover:bg-[#ff6a6a] border border-[#2e2e2e] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
          >
            <Trash2 size={10} />
          </button>
        </div>
      ))}

      <MultiSelectActionBar
        selectedCount={selectedBlockIds.size}
        onCreateGroup={() => setIsCreateGroupModalOpen(true)}
        onClearSelection={clearBlockSelection}
      />

      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        selectedAgentNames={blocks.filter(b => selectedBlockIds.has(b.id)).map(b => b.name || 'New Agent')}
        onCreate={(name) => {
          createGroup(name);
          setIsCreateGroupModalOpen(false);
        }}
        onClose={() => setIsCreateGroupModalOpen(false)}
      />
    </div>
  );
};

export default BuilderCanvas;
