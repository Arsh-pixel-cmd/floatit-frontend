import { useState, useEffect } from 'react';
import { useBuilderStore } from '../lib/builderStore';

export interface Coords {
  x: number;
  y: number;
}

export interface DraggingElement {
  type: 'block' | 'sticky';
  id: string;
  startX: number;
  startY: number;
  startMouseX: number;
  startMouseY: number;
}

export interface WiringState {
  sourceId: string;
  sourcePort: string | null;
  startPos: Coords;
  currentMousePos: Coords;
}

export interface ResizingElement {
  type: 'block' | 'sticky';
  id: string;
  elemX: number;
  elemY: number;
}

/**
 * useCanvasHandlers — Custom hook to isolate dragging, resizing, and wiring logic.
 * Follows the Single Responsibility Principle (SRP).
 */
export const useCanvasHandlers = (getCanvasCoords: (clientX: number, clientY: number) => Coords) => {
  const { updateBlock, connectBlocks, updateStickyNote } = useBuilderStore();

  const [draggingElement, setDraggingElement] = useState<DraggingElement | null>(null);
  const [wiringState, setWiringState] = useState<WiringState | null>(null);
  const [resizingElement, setResizingElement] = useState<ResizingElement | null>(null);

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
        setWiringState((prev) => (prev ? { ...prev, currentMousePos: coords } : null));
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
  }, [
    draggingElement,
    wiringState,
    resizingElement,
    getCanvasCoords,
    updateBlock,
    connectBlocks,
    updateStickyNote,
  ]);

  return {
    draggingElement,
    setDraggingElement,
    wiringState,
    setWiringState,
    resizingElement,
    setResizingElement,
  };
};

export default useCanvasHandlers;
