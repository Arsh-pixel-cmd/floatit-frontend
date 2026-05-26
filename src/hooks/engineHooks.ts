import { useCallback, useEffect, useRef, useState } from 'react';
import { useToastStore } from '../lib/toastStore';
import { useWorkflowStore } from '../lib/store';
import { checkKeyAvailability } from '../lib/llm';
import type {
  ApiKeyModalType,
  CameraState,
  DraggingAppElement,
  ResizingAppElement,
  StickyNote,
  TextLabel,
  TokenLimitModalState,
  WorkflowStoreState,
  ToolType,
  KeyInfoState,
  PhaseOverlayState,
} from '../types/engine';

export function usePromptInput() {
  const projectPrompt = useWorkflowStore((state: WorkflowStoreState) => state.projectPrompt);
  const setProjectPrompt = useWorkflowStore((state: WorkflowStoreState) => state.setProjectPrompt);
  const projectAttachment = useWorkflowStore((state: WorkflowStoreState) => state.projectAttachment);
  const setProjectAttachment = useWorkflowStore((state: WorkflowStoreState) => state.setProjectAttachment);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return {
    projectPrompt,
    setProjectPrompt,
    projectAttachment,
    setProjectAttachment,
    fileInputRef,
  };
}

export function useModalState() {
  const addToast = useToastStore((state) => state.addToast);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyModalType, setKeyModalType] = useState<ApiKeyModalType>('NO_KEY');
  const [keyInfo, setKeyInfo] = useState<KeyInfoState>({
    activeSource: 'none',
    project: { hasKey: false },
    global: { any: false },
  });
  const [tokenLimitModal, setTokenLimitModal] = useState<TokenLimitModalState | null>(null);
  const [phaseOutputModal, setPhaseOutputModal] = useState<string | null>(null);
  const [showOutputScreen, setShowOutputScreen] = useState(false);

  useEffect(() => {
    const handleKeyError = (e: any) => {
      const { type } = e.detail || {};
      if (type === 'RATE_LIMIT') {
        addToast('warning', 'Rate limited. Please wait or switch keys.');
      } else {
        setKeyModalType(type);
        setShowKeyModal(true);
      }
    };

    const handleTokenLimit = (e: any) => {
      const { model, provider, message } = e.detail || {};
      setTokenLimitModal({ show: true, model, provider, message });
    };

    window.addEventListener('agentic:key-error', handleKeyError);
    window.addEventListener('agentic:token-limit', handleTokenLimit);

    const seqId = localStorage.getItem('active_sequence_id');
    if (seqId) {
      checkKeyAvailability(seqId).then(setKeyInfo);
    }

    return () => {
      window.removeEventListener('agentic:key-error', handleKeyError);
      window.removeEventListener('agentic:token-limit', handleTokenLimit);
    };
  }, [addToast]);

  return {
    showKeyModal,
    setShowKeyModal,
    keyModalType,
    setKeyModalType,
    keyInfo,
    setKeyInfo,
    tokenLimitModal,
    setTokenLimitModal,
    phaseOutputModal,
    setPhaseOutputModal,
    showOutputScreen,
    setShowOutputScreen,
  };
}

export function usePhaseOverlay() {
  const [phaseOverlay, setPhaseOverlay] = useState<PhaseOverlayState | null>(null);
  const [completedPhases, setCompletedPhases] = useState<string[]>([]);
  const [runningPhaseId, setRunningPhaseId] = useState<string | null>(null);

  return {
    phaseOverlay,
    setPhaseOverlay,
    completedPhases,
    setCompletedPhases,
    runningPhaseId,
    setRunningPhaseId,
  };
}

export function useCanvasControls() {
  const [camera, setCamera] = useState<CameraState>({ x: 100, y: 60, zoom: 0.55 });
  const [isPanning, setIsPanning] = useState(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const [activeTool, setActiveTool] = useState<ToolType>('cursor');
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([]);
  const [strokes, setStrokes] = useState<{ id: number; points: Array<{ x: number; y: number }> }[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Array<{ x: number; y: number }> | null>(null);
  const currentStrokeRef = useRef<Array<{ x: number; y: number }>>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const isDrawingRef = useRef(false);
  const [canvasLocked, setCanvasLocked] = useState(false);
  const [textLabels, setTextLabels] = useState<TextLabel[]>([]);
  const [draggingAppElement, setDraggingAppElement] = useState<DraggingAppElement | null>(null);
  const [resizingAppElement, setResizingAppElement] = useState<ResizingAppElement | null>(null);
  const [editingStickyId, setEditingStickyId] = useState<number | null>(null);
  const [editingLabelId, setEditingLabelId] = useState<number | null>(null);
  const preFocusCamera = useRef<CameraState | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onWheel = (e: WheelEvent) => {
      if (canvasLocked) {
        e.preventDefault();
        return;
      }
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }

      requestAnimationFrame(() => {
        if (e.ctrlKey || e.metaKey) {
          setCamera((prev) => {
            const zoomMultiplier = Math.exp(-e.deltaY * 0.005);
            const newZoom = Math.min(Math.max(prev.zoom * zoomMultiplier, 0.05), 4);
            const zoomRatio = newZoom / prev.zoom;
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            return {
              zoom: newZoom,
              x: mouseX - (mouseX - prev.x) * zoomRatio,
              y: mouseY - (mouseY - prev.y) * zoomRatio,
            };
          });
        } else {
          setCamera((prev) => ({
            ...prev,
            x: prev.x - e.deltaX * 1.5,
            y: prev.y - e.deltaY * 1.5,
          }));
        }
      });
    };

    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', onWheel);
  }, [canvasLocked]);

  const getCanvasCoords = useCallback(
    (clientX: number, clientY: number) => ({
      x: (clientX - camera.x) / camera.zoom,
      y: (clientY - camera.y) / camera.zoom,
    }),
    [camera]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (canvasLocked) return;
      if (e.target instanceof Element && (e.target.closest('.n8n-node') || e.target.closest('.sticky-note'))) return;

      if (activeTool === 'cursor') {
        if (e.button === 1 || (e.button === 0 && e.altKey) || (e.target as HTMLElement).id === 'canvas-bg') {
          setIsPanning(true);
          lastMousePos.current = { x: e.clientX, y: e.clientY };
        }
      } else if (activeTool === 'sticky') {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        const newId = Date.now();
        setStickyNotes((prev) => [...prev, { id: newId, x: coords.x - 120, y: coords.y - 90, text: '', color: '#A259FF', width: 240, height: 180 }]);
        setActiveTool('cursor');
      } else if (activeTool === 'text') {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        setTextLabels((prev) => [...prev, { id: Date.now(), x: coords.x, y: coords.y, text: '' }]);
        setActiveTool('cursor');
      } else if (activeTool === 'highlighter') {
        isDrawingRef.current = true;
        setIsDrawing(true);
        const coords = getCanvasCoords(e.clientX, e.clientY);
        currentStrokeRef.current = [coords];
        setCurrentStroke([coords]);
      }
    },
    [activeTool, canvasLocked, getCanvasCoords]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        canvasRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        canvasRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }

      if (draggingAppElement) {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        const dx = coords.x - draggingAppElement.startMouseX;
        const dy = coords.y - draggingAppElement.startMouseY;
        if (draggingAppElement.type === 'sticky') {
          setStickyNotes((prev) => prev.map((n) => (n.id === draggingAppElement.id ? { ...n, x: draggingAppElement.startX + dx, y: draggingAppElement.startY + dy } : n)));
        } else if (draggingAppElement.type === 'label') {
          setTextLabels((prev) => prev.map((l) => (l.id === draggingAppElement.id ? { ...l, x: draggingAppElement.startX + dx, y: draggingAppElement.startY + dy } : l)));
        }
      }

      if (resizingAppElement) {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        const newWidth = Math.max(120, coords.x - resizingAppElement.elemX);
        const newHeight = Math.max(120, coords.y - resizingAppElement.elemY);
        if (resizingAppElement.type === 'sticky') {
          setStickyNotes((prev) => prev.map((n) => (n.id === resizingAppElement.id ? { ...n, width: newWidth, height: newHeight } : n)));
        }
      }

      if (isPanning) {
        requestAnimationFrame(() => {
          const dx = e.clientX - lastMousePos.current.x;
          const dy = e.clientY - lastMousePos.current.y;
          setCamera((prev) => ({ ...prev, x: prev.x + dx * 1.5, y: prev.y + dy * 1.5 }));
          lastMousePos.current = { x: e.clientX, y: e.clientY };
        });
      } else if (isDrawingRef.current && activeTool === 'highlighter') {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        currentStrokeRef.current.push(coords);
        if (currentStrokeRef.current.length % 2 === 0) {
          setCurrentStroke([...currentStrokeRef.current]);
        }
      }
    },
    [activeTool, draggingAppElement, getCanvasCoords, isPanning, resizingAppElement]
  );

  const handleMouseUp = useCallback(() => {
    if (draggingAppElement) setDraggingAppElement(null);
    if (resizingAppElement) setResizingAppElement(null);
    if (isPanning) setIsPanning(false);
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      setIsDrawing(false);
      if (currentStrokeRef.current.length > 1) {
        setStrokes((prev) => [...prev, { id: Date.now(), points: [...currentStrokeRef.current] }]);
      }
      currentStrokeRef.current = [];
      setCurrentStroke(null);
    }
  }, [draggingAppElement, isPanning, resizingAppElement]);

  return {
    canvasRef,
    camera,
    setCamera,
    isPanning,
    activeTool,
    setActiveTool,
    stickyNotes,
    setStickyNotes,
    strokes,
    setStrokes,
    currentStroke,
    setCurrentStroke,
    textLabels,
    setTextLabels,
    canvasLocked,
    setCanvasLocked,
    draggingAppElement,
    setDraggingAppElement,
    resizingAppElement,
    setResizingAppElement,
    editingStickyId,
    setEditingStickyId,
    editingLabelId,
    setEditingLabelId,
    preFocusCamera,
    getCanvasCoords,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}
