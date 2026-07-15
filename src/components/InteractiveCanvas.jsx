import React, { useState, useRef, useEffect } from 'react';
import { MousePointer2, Image, Type, Square, MessageSquare, Pencil, Triangle, Spline, Grid3x3, PenSquare, MessageCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import CanvasComment from './CanvasComment';
import ConfirmDialog from './ConfirmDialog';
import { initialTemplateAgents } from '../data/initialTemplateAgents';
import { useBuilderStore } from '../lib/builderStore';
import { useWorkflowExecution } from '../hooks/useWorkflowExecution';
import { useWorkflowStore } from '../lib/store';
import { useAuth } from '../lib/auth';
import { CommandHistory } from '../lib/blocks/CommandHistory';
import { AddBlockCommand } from '../lib/blocks/commands/AddBlockCommand';
import { MoveBlockCommand } from '../lib/blocks/commands/MoveBlockCommand';
import { AddAnnotationCommand } from '../lib/blocks/commands/AddAnnotationCommand';
import { DeleteAnnotationCommand } from '../lib/blocks/commands/DeleteAnnotationCommand';
import { CreateGroupCommand } from '../lib/blocks/commands/CreateGroupCommand';
import { DeleteBlockCommand } from '../lib/blocks/commands/DeleteBlockCommand';
import CanvasHeader from './CanvasHeader';
import CanvasSidebar from './CanvasSidebar';
import ShareModal from './ShareModal';
import AgentDetailsSidebar from './AgentDetailsSidebar';
import ChatbotPanel from './ChatbotPanel';
import OutputScreen from './OutputScreen';

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
  const draggedStartPos = useRef(null);

  const [draggedSticky, setDraggedSticky] = useState(null);
  const [currentLine, setCurrentLine] = useState(null);
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectionEnd, setSelectionEnd] = useState(null);

  const [keyInfo, setKeyInfo] = useState(null);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyModalType, setKeyModalType] = useState('NO_KEY');
  const [phaseOverlay, setPhaseOverlay] = useState(null);
  const [showOutputScreen, setShowOutputScreen] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [pendingDeleteBlockId, setPendingDeleteBlockId] = useState(null);

  const { comments, addComment } = useBuilderStore();
  const { user } = useAuth();
  const authorName = user?.name || user?.email?.split('@')[0] || 'User';

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target.result;
          const centerPos = {
            x: (window.innerWidth / 2 - pan.x) / scale,
            y: (window.innerHeight / 2 - pan.y) / scale
          };
          CommandHistory.execute(new AddAnnotationCommand('image', centerPos, url));
        };
        reader.readAsDataURL(file);
      });
    }
  });

  const { projectPrompt, projectAttachment, setGraphStatus, nodeStates, setProjectPrompt, nodeStatusTexts } = useWorkflowStore();

  const { 
    blocks, connections, connectBlocks, updateBlock, selectedElementId, setSelectedElementId,
    stickyNotes, textLabels, drawLines, addTextLabel, addStickyNote, updateTextLabel, updateStickyNote, addDrawLine, clearDrawings,
    selectedBlockIds, clearBlockSelection, toggleBlockSelection, createGroup, groups, images
  } = useBuilderStore();

  const updateBlockPosition = (id, pos) => updateBlock(id, { position: pos });

  const { runGroupWorkflow, stopExecution } = useWorkflowExecution({
    projectPrompt,
    projectAttachment,
    setKeyInfo,
    setShowKeyModal,
    setKeyModalType,
    setPhaseOverlay,
    setShowOutputScreen,
  });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const handleKeyDown = (e) => {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        const store = useBuilderStore.getState();
        const { selectedElementId, selectedBlockIds, deleteBlock, deleteStickyNote, deleteTextLabel, deleteConnection, deleteImage, setSelectedElementId: setSelId } = store;
        
        // Skip if typing in an input
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

        if (selectedElementId) {
          if (selectedElementId.startsWith('sticky-')) {
            CommandHistory.execute(new DeleteAnnotationCommand(selectedElementId.replace('sticky-', ''), 'sticky'));
          } else if (selectedElementId.startsWith('text-')) {
            CommandHistory.execute(new DeleteAnnotationCommand(selectedElementId.replace('text-', ''), 'text'));
          } else if (selectedElementId.startsWith('image-')) {
            CommandHistory.execute(new DeleteAnnotationCommand(selectedElementId.replace('image-', ''), 'image'));
          } else {
            const isBlock = store.blocks.some(b => b.id === selectedElementId);
            if (isBlock) {
              e.preventDefault();
              setPendingDeleteBlockId(selectedElementId);
            } else {
              deleteConnection(selectedElementId);
            }
          }
        }

        // BUG-017: selectedBlockIds is now string[], use .length and .forEach normally
        if (selectedBlockIds && selectedBlockIds.length > 0) {
          e.preventDefault();
          // We can use the first selected block to confirm deletion for the whole selection
          setPendingDeleteBlockId(selectedBlockIds[0]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [pan, scale]);

  const getCanvasCoords = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left - pan.x) / scale,
      y: (clientY - rect.top - pan.y) / scale
    };
  };

  const handlePointerDown = (e) => {
    if (e.target.closest('.agent-card') || e.target.closest('.toolbar') || e.target.closest('.sidebar') || e.target.closest('.sticky-note-el')) return;
    
    const coords = getCanvasCoords(e.clientX, e.clientY);
    
    if (activeTool === 'sticky') {
      CommandHistory.execute(new AddAnnotationCommand('sticky', coords));
      setActiveTool('select');
      return;
    }
    
    if (activeTool === 'text') {
      CommandHistory.execute(new AddAnnotationCommand('text', coords));
      setActiveTool('select');
      return;
    }

    if (activeTool === 'comment') {
      const text = window.prompt('Add a comment:');
      if (text?.trim()) {
        addComment(coords, text.trim(), { name: authorName });
      }
      setActiveTool('select');
      return;
    }
    
    if (activeTool === 'draw') {
      setCurrentLine({
        points: [coords],
        color: '#2945D1',
        width: 3
      });
      e.currentTarget.setPointerCapture(e.pointerId);
      return;
    }

    if (e.shiftKey && activeTool === 'select') {
      setSelectionStart(coords);
      setSelectionEnd(coords);
      clearBlockSelection();
      e.currentTarget.setPointerCapture(e.pointerId);
      return;
    }
    
    setIsPanning(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    setSelectedElementId(null);
  };

  const handlePointerMove = (e) => {
    if (currentLine) {
      const coords = getCanvasCoords(e.clientX, e.clientY);
      setCurrentLine(prev => ({
        ...prev,
        points: [...prev.points, coords]
      }));
      return;
    }

    if (selectionStart) {
      const coords = getCanvasCoords(e.clientX, e.clientY);
      setSelectionEnd(coords);
      return;
    }
    
    if (isPanning) {
      setPan(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
    } else if (draggedAgent !== null) {
      const b = blocks.find(block => block.id === draggedAgent);
      if (b) {
        updateBlockPosition(b.id, { x: b.position.x + e.movementX / scale, y: b.position.y + e.movementY / scale });
      }
    } else if (draggedSticky !== null) {
      const sticky = stickyNotes.find(s => s.id === draggedSticky);
      if (sticky) {
        updateStickyNote(draggedSticky, {
          position: {
            x: sticky.position.x + e.movementX / scale,
            y: sticky.position.y + e.movementY / scale
          }
        });
      }
    }
  };

  const handlePointerUp = (e) => {
    if (currentLine) {
      addDrawLine(currentLine);
      setCurrentLine(null);
      e.currentTarget.releasePointerCapture(e.pointerId);
      return;
    }

    if (selectionStart && selectionEnd) {
      const xMin = Math.min(selectionStart.x, selectionEnd.x);
      const xMax = Math.max(selectionStart.x, selectionEnd.x);
      const yMin = Math.min(selectionStart.y, selectionEnd.y);
      const yMax = Math.max(selectionStart.y, selectionEnd.y);

      // BUG-006: Check the full node bounding box, not just top-left corner
      const selectedIds = blocks
        .filter(block => {
          const bw = block.size?.width || 260;
          const bh = block.size?.height || 120;
          const bx = block.position.x;
          const by = block.position.y;
          // Block overlaps the selection rectangle
          return bx < xMax && bx + bw > xMin && by < yMax && by + bh > yMin;
        })
        .map(b => b.id);

      if (selectedIds.length > 0) {
        useBuilderStore.getState().setBlockSelection(selectedIds);
      }
      setSelectionStart(null);
      setSelectionEnd(null);
      e.currentTarget.releasePointerCapture(e.pointerId);
      return;
    }
    
    if (draggedAgent !== null && draggedStartPos.current) {
      const b = blocks.find(block => block.id === draggedAgent);
      if (b) {
        const dx = b.position.x - draggedStartPos.current.x;
        const dy = b.position.y - draggedStartPos.current.y;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          CommandHistory.execute(new MoveBlockCommand(
            draggedAgent,
            draggedStartPos.current,
            { x: b.position.x, y: b.position.y }
          ));
        }
      }
      draggedStartPos.current = null;
    }

    setIsPanning(false);
    setDraggedAgent(null);
    setDraggedSticky(null);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="min-h-screen bg-[#eeedf3] dark:bg-[#0c0c0e] text-gray-900 dark:text-gray-100 font-sans flex flex-col">
      <CanvasHeader 
        setShowShareModal={setShowShareModal} 
        startExecution={runGroupWorkflow}
        stopExecution={stopExecution}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <CanvasSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} setCurrentPage={setCurrentPage} mode={mode} />

        <div 
          ref={canvasRef}
          {...getRootProps()}
          className={`flex-1 relative overflow-hidden touch-none ${isDragActive ? 'ring-2 ring-blue-500 ring-inset bg-blue-500/5' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{ cursor: isPanning ? 'grabbing' : (draggedAgent !== null ? 'grabbing' : 'grab') }}
        >
          <input {...getInputProps()} />
          {isDragActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-blue-500/10 z-50 pointer-events-none">
              <p className="text-blue-600 font-semibold text-lg">Drop image here</p>
            </div>
          )}
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
                
                const sourceEl = document.getElementById(`agent-${conn.sourceBlockId}`);
                const targetEl = document.getElementById(`agent-${conn.targetBlockId}`);
                
                const w1 = sourceEl ? sourceEl.offsetWidth : 180;
                const h1 = sourceEl ? sourceEl.offsetHeight : 80;
                const w2 = targetEl ? targetEl.offsetWidth : 180;
                const h2 = targetEl ? targetEl.offsetHeight : 80;
                
                const x1 = source.x + w1; 
                const y1 = source.y + h1 / 2;  
                const x2 = target.x;       
                const y2 = target.y + h2 / 2;
                
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

              {/* Render saved drawing lines */}
              {drawLines && drawLines.map((line, li) => (
                <path
                  key={line.id || li}
                  d={line.points.reduce((acc, p, pi) => `${acc} ${pi === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '')}
                  stroke={line.color || '#2945D1'}
                  strokeWidth={line.width || 3}
                  fill="none"
                />
              ))}

              {/* Render current active drawing line */}
              {currentLine && (
                <path
                  d={currentLine.points.reduce((acc, p, pi) => `${acc} ${pi === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '')}
                  stroke={currentLine.color}
                  strokeWidth={currentLine.width}
                  fill="none"
                />
              )}

              {/* Render selection box */}
              {selectionStart && selectionEnd && (
                <rect
                  x={Math.min(selectionStart.x, selectionEnd.x)}
                  y={Math.min(selectionStart.y, selectionEnd.y)}
                  width={Math.abs(selectionStart.x - selectionEnd.x)}
                  height={Math.abs(selectionStart.y - selectionEnd.y)}
                  fill="rgba(41, 69, 209, 0.08)"
                  stroke="#2945D1"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              )}
              {/* Render Groups */}
              {groups && groups.map(group => {
                const groupBlocks = blocks.filter(b => group.blockIds.includes(b.id));
                if (groupBlocks.length === 0) return null;
                
                let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                groupBlocks.forEach(b => {
                  minX = Math.min(minX, b.position.x);
                  minY = Math.min(minY, b.position.y);
                  maxX = Math.max(maxX, b.position.x + (b.size?.width || 180));
                  maxY = Math.max(maxY, b.position.y + (b.size?.height || 140));
                });
                
                // Add padding
                const padding = 20;
                minX -= padding;
                minY -= padding;
                maxX += padding;
                maxY += padding;
                
                return (
                  <g key={group.id}>
                    <rect
                      x={minX}
                      y={minY}
                      width={maxX - minX}
                      height={maxY - minY}
                      fill="rgba(162, 89, 255, 0.05)"
                      stroke="#A259FF"
                      strokeWidth="2"
                      strokeDasharray="8 8"
                      rx="16"
                    />
                    <text
                      x={minX + 16}
                      y={minY - 10}
                      fill="#A259FF"
                      fontSize="12"
                      fontFamily="Outfit, sans-serif"
                      fontWeight="bold"
                    >
                      {group.name}
                    </text>
                  </g>
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
            {displayAgents.map(agent => {
              const nodeState = nodeStates[agent.id] || 'idle';
              const isSelected = selectedElementId === agent.id || (selectedBlockIds && selectedBlockIds.includes(agent.id));
              let statusBorder = 'border-gray-200';
              if (nodeState === 'running') {
                statusBorder = 'border-[#A259FF] ring-2 ring-[#A259FF]/30 animate-pulse';
              } else if (nodeState === 'completed') {
                statusBorder = 'border-[#DEF767] ring-2 ring-[#DEF767]/20 shadow-md';
              } else if (nodeState === 'stuck_debugger') {
                statusBorder = 'border-red-500 ring-2 ring-red-500/20';
              } else if (isSelected || connectingFrom === agent.id) {
                statusBorder = 'border-[#2945D1] shadow-md';
              }

              return (
                <div
                  key={agent.id}
                  id={`agent-${agent.id}`}
                  className={`agent-card absolute w-[180px] bg-white rounded-xl shadow-sm border ${statusBorder} p-3 hover:shadow-md transition cursor-grab active:cursor-grabbing ${connectingFrom === agent.id ? 'ring-2 ring-[#2945D1]/30' : ''}`}
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
                      draggedStartPos.current = { x: agent.x, y: agent.y };
                    }
                    e.currentTarget.setPointerCapture(e.pointerId);
                  }}
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <p className="text-[10px] text-orange-400 font-medium">Float It</p>
                    {nodeState === 'running' && (
                      <div className="w-2.5 h-2.5 border-2 border-[#A259FF] border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {nodeState === 'completed' && (
                      <span className="text-[10px] text-[#2945D1] font-bold">✓</span>
                    )}
                    {nodeState === 'stuck_debugger' && (
                      <span className="text-[10px] text-red-500 font-bold">!</span>
                    )}
                  </div>
                  <h3 className="text-[11px] font-bold text-gray-900 mb-0.5">{agent.title}</h3>
                  <p className="text-[9px] text-gray-400 mb-2">{agent.desc}</p>
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex gap-1.5">
                      {agent.colors.map((color, ci) => (
                        <div key={ci} className="w-5 h-5 rounded" style={{ backgroundColor: color, opacity: 0.8 }}></div>
                      ))}
                    </div>
                  </div>
                  {nodeState !== 'idle' && (
                    <div className={`mt-2 px-2 py-1 rounded text-[8px] font-semibold flex items-center gap-1.5 transition-colors ${
                      nodeState === 'running' 
                        ? 'bg-purple-50 text-purple-600 border border-purple-100 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900/50 animate-pulse' 
                        : nodeState === 'completed' 
                        ? 'bg-green-50 text-green-700 border border-green-100 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/50' 
                        : 'bg-red-50 text-red-600 border border-red-100 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50'
                    }`}>
                      {nodeState === 'running' && (
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping"></div>
                      )}
                      <span className="truncate">{nodeStatusTexts[agent.id] || (nodeState === 'running' ? 'Executing...' : 'Completed')}</span>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Render Sticky Notes */}
            {stickyNotes && stickyNotes.map(note => (
              <div
                key={note.id}
                id={`sticky-${note.id}`}
                className="sticky-note-el absolute p-3 rounded-xl shadow-sm border cursor-grab active:cursor-grabbing text-xs text-gray-900 flex flex-col"
                style={{
                  top: note.position.y,
                  left: note.position.x,
                  width: 140,
                  height: 140,
                  backgroundColor: note.color || '#faf5ff',
                  borderColor: selectedElementId === `sticky-${note.id}` ? '#2945D1' : '#e2e8f0',
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  setSelectedElementId(`sticky-${note.id}`);
                  setDraggedSticky(note.id);
                  e.currentTarget.setPointerCapture(e.pointerId);
                }}
              >
                <textarea
                  value={note.text || ''}
                  onChange={(e) => updateStickyNote(note.id, { text: e.target.value })}
                  className="w-full h-full bg-transparent border-none outline-none resize-none text-[11px] text-gray-800 placeholder-gray-400"
                  placeholder="Sticky note..."
                />
              </div>
            ))}

            {/* Render Text Labels */}
            {textLabels && textLabels.map(label => (
              <div
                key={label.id}
                id={`text-${label.id}`}
                className="absolute cursor-text text-xs text-gray-900 bg-white/80 px-2 py-1 rounded border border-dashed"
                style={{
                  top: label.y,
                  left: label.x,
                  borderColor: selectedElementId === `text-${label.id}` ? '#2945D1' : 'transparent',
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  setSelectedElementId(`text-${label.id}`);
                }}
              >
                <input
                  type="text"
                  value={label.text || ''}
                  onChange={(e) => updateTextLabel(label.id, e.target.value)}
                  className="bg-transparent border-none outline-none text-[11px] font-medium text-gray-800"
                  placeholder="Type note..."
                  autoFocus
                />
              </div>
            ))}

            {/* Render Images */}
            {images && images.map(img => (
              <div
                key={img.id}
                id={`image-${img.id}`}
                className="absolute cursor-grab active:cursor-grabbing border-2"
                style={{
                  top: img.y,
                  left: img.x,
                  width: img.width,
                  height: img.height,
                  borderColor: selectedElementId === `image-${img.id}` ? '#2945D1' : 'transparent',
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  setSelectedElementId(`image-${img.id}`);
                }}
              >
                <img src={img.url} alt="Canvas element" className="w-full h-full object-cover pointer-events-none rounded-lg shadow-sm" />
              </div>
            ))}

            {/* Render Canvas Comments (Task 9) */}
            {comments && comments.map(comment => (
              <CanvasComment key={comment.id} comment={comment} />
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
              <button 
                onClick={() => {
                  const url = prompt('Enter Image URL:');
                  if (url) {
                    // Place it in the center of the current view roughly
                    const centerPos = { x: pan.x * -1 / scale + window.innerWidth / (2 * scale), y: pan.y * -1 / scale + window.innerHeight / (2 * scale) };
                    CommandHistory.execute(new AddAnnotationCommand('image', centerPos, url));
                  }
                }}
                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition" 
                title="Image">
                <Image size={18} />
              </button>
              <button 
                onClick={() => setActiveTool('text')}
                className={`p-2 rounded-xl transition ${activeTool === 'text' ? 'bg-[#2945D1] text-white' : 'text-gray-500 hover:bg-gray-100'}`} 
                title="Text">
                <Type size={18} />
              </button>
              <button 
                onClick={() => setActiveTool('comment')}
                className={`p-2 rounded-xl transition ${activeTool === 'comment' ? 'bg-[#2945D1] text-white' : 'text-gray-500 hover:bg-gray-100'}`} 
                title="Comment">
                <MessageCircle size={18} />
              </button>
              <button 
                onClick={() => setShowChatbot(!showChatbot)}
                className={`p-2 rounded-xl transition ${showChatbot ? 'bg-[#2945D1] text-white' : 'text-gray-500 hover:bg-gray-100'}`} 
                title="Chatbot"
              >
                <MessageSquare size={18} />
              </button>
              <button 
                onClick={() => setActiveTool('sticky')}
                className={`p-2 rounded-xl transition ${activeTool === 'sticky' ? 'bg-[#2945D1] text-white' : 'text-gray-500 hover:bg-gray-100'}`} 
                title="Sticky note">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M15 3v5h5"/></svg>
              </button>
              <div className="w-px h-5 bg-gray-200 mx-0.5"></div>
              <button 
                onClick={() => setActiveTool('draw')}
                className={`p-2 rounded-xl transition ${activeTool === 'draw' ? 'bg-[#2945D1] text-white' : 'text-gray-500 hover:bg-gray-100'}`} 
                title="Draw">
                <Pencil size={18} />
              </button>
              <button 
                onClick={() => {
                  clearDrawings();
                  setActiveTool('select');
                }}
                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition" 
                title="Eraser">
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
                  CommandHistory.execute(new AddBlockCommand('agent'));
                  setActiveTool('select');
                }}
                className="p-2 rounded-xl text-[#2945D1] bg-blue-50 hover:bg-blue-100 transition" 
                title="Add agent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
              </button>
            </div>
            <div className="bg-white rounded-[16px] shadow-sm border border-gray-200 p-1 ml-1">
              <button 
                onClick={() => {
                  const newPrompt = prompt('Edit project directive:', projectPrompt || '');
                  if (newPrompt !== null) {
                    setProjectPrompt(newPrompt);
                  }
                }}
                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition" 
                title="Edit prompt"
              >
                <PenSquare size={18} />
              </button>
            </div>
            {selectedBlockIds && selectedBlockIds.length > 0 && (
              <div className="bg-white rounded-[16px] shadow-sm border border-[#2945D1] p-1 ml-1 animate-bounce">
                <button 
                  onClick={() => {
                    const groupName = prompt('Enter Group Name:', 'New Phase');
                    if (groupName) {
                      CommandHistory.execute(new CreateGroupCommand(groupName, selectedBlockIds));
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl text-white bg-[#2945D1] hover:bg-blue-700 transition font-bold text-[10px] uppercase tracking-wider"
                  title="Group Selected Agents"
                >
                  Group ({selectedBlockIds.length})
                </button>
              </div>
            )}
          </div>
          <div className="toolbar absolute bottom-5 right-6 bg-white rounded-lg shadow-md border border-gray-200 px-3 py-1.5 z-20 pointer-events-auto">
            <span className="text-xs font-medium text-gray-600">{Math.round(scale * 100)}%</span>
          </div>

          <AgentDetailsSidebar />
          {showChatbot && <ChatbotPanel onClose={() => setShowChatbot(false)} />}
        </div>
      </div>

      {showShareModal && <ShareModal setShowShareModal={setShowShareModal} />}
      {showOutputScreen && <OutputScreen onClose={() => setShowOutputScreen(false)} />}
      
      <ConfirmDialog
        open={!!pendingDeleteBlockId}
        onOpenChange={(open) => { if (!open) setPendingDeleteBlockId(null); }}
        title="Delete Agent?"
        description="This action cannot be undone. The agent and all its settings will be permanently deleted."
        onConfirm={() => {
          if (pendingDeleteBlockId) {
            const store = useBuilderStore.getState();
            const { selectedBlockIds } = store;
            if (selectedBlockIds && selectedBlockIds.includes(pendingDeleteBlockId)) {
              selectedBlockIds.forEach(id => {
                CommandHistory.execute(new DeleteBlockCommand(id));
              });
            } else {
              CommandHistory.execute(new DeleteBlockCommand(pendingDeleteBlockId));
            }
            setPendingDeleteBlockId(null);
          }
        }}
      />
    </div>
  );
}
