import React, { useState, useRef, useEffect } from 'react';
import { MousePointer2, Image, Type, Square, MessageSquare, Pencil, Triangle, Spline, Grid3x3, PenSquare } from 'lucide-react';
import { initialTemplateAgents } from '../data/initialTemplateAgents';
import { useBuilderStore } from '../lib/builderStore';
import { useWorkflowExecution } from '../hooks/useWorkflowExecution';
import CanvasHeader from './CanvasHeader';
import CanvasSidebar from './CanvasSidebar';
import ShareModal from './ShareModal';
import AgentDetailsSidebar from './AgentDetailsSidebar';

export default function InteractiveCanvas({ mode, setCurrentPage }) {
  const [scale, setScale] = useState(0.76);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [draggedAgent, setDraggedAgent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeTool, setActiveTool] = useState('select');
  const [connectingFrom, setConnectingFrom] = useState(null);
  const canvasRef = useRef(null);

  const { blocks, connections, connectBlocks, updateBlockPosition, selectedElementId, setSelectedElementId } = useBuilderStore();

  // Load template agents into store on mount if empty
  useEffect(() => {
    if (blocks.length === 0 && mode === 'template') {
      const store = useBuilderStore.getState();
      initialTemplateAgents.forEach(agent => {
        store.addBlock({ x: agent.x, y: agent.y });
        // After adding, we need to update the newly added block's name and description
        // store.addBlock adds it with default name 'New Agent' and random ID, but that's okay, 
        // we can just update the last added block
        const allBlocks = useBuilderStore.getState().blocks;
        const lastBlock = allBlocks[allBlocks.length - 1];
        if (lastBlock) {
          store.updateBlock(lastBlock.id, { name: agent.title, description: agent.desc });
        }
      });
    }
  }, [mode]);

  const displayAgents = blocks.map(b => ({
    id: b.id,
    x: b.position.x,
    y: b.position.y,
    title: b.name,
    desc: b.description || 'Agent block',
    colors: ['#3b82f6', '#22c55e']
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        // Zoom
        const zoomSensitivity = 0.005;
        const delta = -e.deltaY * zoomSensitivity;
        setScale(s => {
          const newScale = Math.min(Math.max(0.1, s + delta), 3);
          const rect = canvas.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          setPan(p => ({
            x: mouseX - (mouseX - p.x) * (newScale / s),
            y: mouseY - (mouseY - p.y) * (newScale / s)
          }));
          return newScale;
        });
      } else {
        // Pan
        setPan(p => ({
          x: p.x - e.deltaX,
          y: p.y - e.deltaY
        }));
      }
    };

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, []);

  const handlePointerDown = (e) => {
    if (e.target.closest('.agent-card') || e.target.closest('.toolbar') || e.target.closest('.sidebar')) return;
    setIsPanning(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    setSelectedElementId(null);
  };

  const handlePointerMove = (e) => {
    if (isPanning) {
      setPan(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
    } else if (draggedAgent !== null) {
      if (blocks.length > 0) {
        const b = blocks.find(block => block.id === draggedAgent);
        if (b) {
          updateBlockPosition(b.id, { x: b.position.x + e.movementX / scale, y: b.position.y + e.movementY / scale });
        }
      } else {
        setAgents(prev => prev.map(a => 
          a.id === draggedAgent ? { ...a, x: a.x + e.movementX / scale, y: a.y + e.movementY / scale } : a
        ));
      }
    }
  };

  const handlePointerUp = (e) => {
    setIsPanning(false);
    setDraggedAgent(null);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="min-h-screen bg-[#eeedf3] text-gray-900 font-sans flex flex-col">
      <CanvasHeader setShowShareModal={setShowShareModal} />

      <div className="flex flex-1 overflow-hidden relative">
        <CanvasSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} setCurrentPage={setCurrentPage} mode={mode} />

        <div 
          ref={canvasRef}
          className="flex-1 relative overflow-hidden touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{ cursor: isPanning ? 'grabbing' : (draggedAgent !== null ? 'grabbing' : 'grab') }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-blue-500 z-10 pointer-events-none"></div>
          
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundColor: '#f0eef5',
            backgroundImage: `radial-gradient(circle, #d4d0e0 ${Math.max(1, 1*scale)}px, transparent ${Math.max(1, 1*scale)}px)`,
            backgroundSize: `${20*scale}px ${20*scale}px`,
            backgroundPosition: `${pan.x}px ${pan.y}px`
          }}></div>

          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
            <g style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`, transformOrigin: '0 0' }}>
              {connections.map(conn => {
                const source = displayAgents.find(a => a.id === conn.sourceBlockId);
                const target = displayAgents.find(a => a.id === conn.targetBlockId);
                if (!source || !target) return null;
                
                const x1 = source.x + 180; // Right edge of source
                const y1 = source.y + 40;  // Approximate middle
                const x2 = target.x;       // Left edge of target
                const y2 = target.y + 40;
                
                const cpx1 = x1 + 40;
                const cpx2 = x2 - 40;
                
                return (
                  <path 
                    key={conn.id} 
                    d={`M ${x1} ${y1} C ${cpx1} ${y1}, ${cpx2} ${y2}, ${x2} ${y2}`} 
                    stroke="#a3a3a3" 
                    strokeWidth="2" 
                    fill="none" 
                  />
                );
              })}
            </g>
          </svg>

          <div style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: '0 0',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}>
            {displayAgents.map(agent => (
              <div
                key={agent.id}
                className={`agent-card absolute w-[180px] bg-white rounded-xl shadow-sm border ${selectedElementId === agent.id || connectingFrom === agent.id ? 'border-[#2945D1] shadow-md' : 'border-gray-200'} p-3 hover:shadow-md transition cursor-grab active:cursor-grabbing ${connectingFrom === agent.id ? 'ring-2 ring-[#2945D1]/30' : ''}`}
                style={{ top: agent.y, left: agent.x }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  if (activeTool === 'connect') {
                    if (connectingFrom === null) {
                      setConnectingFrom(agent.id);
                    } else if (connectingFrom !== agent.id) {
                      connectBlocks(connectingFrom, agent.id, 'out', 'in');
                      setConnectingFrom(null);
                      setActiveTool('select');
                    } else {
                      setConnectingFrom(null); // Cancel if clicked same
                    }
                  } else {
                    setSelectedElementId(agent.id);
                    setDraggedAgent(agent.id);
                  }
                  e.currentTarget.setPointerCapture(e.pointerId);
                }}
              >
                <p className="text-[10px] text-orange-400 font-medium mb-0.5">Float It</p>
                <h3 className="text-[11px] font-bold text-gray-900 mb-0.5">{agent.title}</h3>
                <p className="text-[9px] text-gray-400 mb-2">{agent.desc}</p>
                <div className="flex gap-1.5">
                  {agent.colors.map((color, ci) => (
                    <div key={ci} className="w-5 h-5 rounded" style={{ backgroundColor: color, opacity: 0.8 }}></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="toolbar absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-20 pointer-events-auto">
            <div className="flex items-center bg-white rounded-[16px] shadow-sm border border-gray-200 px-1 py-1 gap-0.5">
              <button 
                onClick={() => setActiveTool('select')}
                className={`p-2 rounded-xl transition ${activeTool === 'select' ? 'bg-[#2945D1] text-white' : 'text-gray-500 hover:bg-gray-100'}`} 
                title="Select">
                <MousePointer2 size={18} />
              </button>
              <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition" title="Image"><Image size={18} /></button>
              <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition" title="Text"><Type size={18} /></button>
              <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition" title="Comment"><MessageSquare size={18} /></button>
              <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition" title="Sticky note">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M15 3v5h5"/></svg>
              </button>
              <div className="w-px h-5 bg-gray-200 mx-0.5"></div>
              <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition" title="Draw"><Pencil size={18} /></button>
              <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition" title="Eraser">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>
              </button>
              <div className="w-px h-5 bg-gray-200 mx-0.5"></div>
              <button 
                onClick={() => setActiveTool('connect')}
                className={`p-2 rounded-xl transition ${activeTool === 'connect' ? 'bg-[#2945D1] text-white' : 'text-gray-500 hover:bg-gray-100'}`} 
                title="Connect node">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>
              </button>
              <button 
                onClick={() => {
                  const id = useBuilderStore.getState().addBlock();
                  setDraggedAgent(id);
                  setActiveTool('select');
                }}
                className="p-2 rounded-xl text-[#2945D1] bg-blue-50 hover:bg-blue-100 transition" 
                title="Add agent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
              </button>
            </div>
            <div className="bg-white rounded-[16px] shadow-sm border border-gray-200 p-1 ml-1">
              <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition" title="Edit prompt">
                <PenSquare size={18} />
              </button>
            </div>
          </div>
          <div className="toolbar absolute bottom-5 right-6 bg-white rounded-lg shadow-md border border-gray-200 px-3 py-1.5 z-20 pointer-events-auto">
            <span className="text-xs font-medium text-gray-600">{Math.round(scale * 100)}%</span>
          </div>

          <AgentDetailsSidebar />
        </div>
      </div>

      {showShareModal && <ShareModal setShowShareModal={setShowShareModal} />}
    </div>
  );
}
