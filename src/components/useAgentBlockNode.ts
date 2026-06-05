import { useBuilderStore } from '../lib/builderStore';
import { useWorkflowStore } from '../lib/store';

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
  triggerConfig: { type: string;[key: string]: any };
  waitConfig: { type: string;[key: string]: any };
  [key: string]: any;
}

interface UseAgentBlockNodeProps {
  block: BlockData;
  isSelected: boolean;
  isMultiSelected?: boolean | undefined;
}

export const useAgentBlockNode = ({ block, isSelected, isMultiSelected }: UseAgentBlockNodeProps) => {
  const { setSelectedElementId } = useBuilderStore();
  const nodeStates = useWorkflowStore((state: any) => state.nodeStates);
  const rawStatus = nodeStates[block.id] || 'idle';
  const status = rawStatus === 'completed' ? 'success' : rawStatus === 'stuck_debugger' ? 'error' : rawStatus;
  const blockW = block.size?.width || 260;
  const blockH = block.size?.height || 150;

  // Accessible Depth Design: Elevated 3D look with custom shadow states
  let borderClasses = 'border-[#3e3e3e] bg-[#242424] shadow-[0_12px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.7)] hover:-translate-y-1 hover:scale-[1.01] z-10';
  let pulseClass = '';

  if (block.isGroupOutput) {
    if (isSelected) {
      borderClasses = 'border-[#A259FF] bg-[#242424] shadow-[0_15px_40px_rgba(162,89,255,0.35)] scale-[1.01] -translate-y-0.5 z-50';
    } else if (isMultiSelected === true) {
      borderClasses = 'border-dashed border-2 border-[#DEF767] bg-[#242424] shadow-[0_10px_25px_rgba(222,247,103,0.15)] z-40';
    } else if (status === 'running') {
      borderClasses = 'border-[#A259FF] bg-[#242424] shadow-[0_0_30px_rgba(162,89,255,0.3)] scale-[1.01] -translate-y-0.5 z-40';
      pulseClass = 'animate-pulse';
    } else if (status === 'success') {
      borderClasses = 'border-[#5b8a62] bg-[#242424] shadow-[0_12px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(91,138,98,0.15)] z-30';
    } else if (status === 'error') {
      borderClasses = 'border-[#ff6a6a] bg-[#242424] shadow-[0_15px_40px_rgba(255,106,106,0.15)] z-30';
    } else {
      borderClasses = 'border-[#A259FF] bg-[#242424] shadow-[0_12px_30px_rgba(162,89,255,0.15)] z-20';
    }
  } else {
    if (isSelected) {
      borderClasses = 'border-[#DEF767] bg-[#242424] shadow-[0_15px_40px_rgba(222,247,103,0.2)] scale-[1.01] -translate-y-0.5 z-50';
    } else if (isMultiSelected === true) {
      borderClasses = 'border-dashed border-2 border-[#DEF767] bg-[#242424] shadow-[0_10px_25px_rgba(222,247,103,0.15)] z-40';
    } else if (status === 'running') {
      borderClasses = 'border-white bg-[#242424] shadow-[0_0_30px_rgba(255,255,255,0.25)] scale-[1.01] -translate-y-0.5 z-40';
      pulseClass = 'animate-pulse';
    } else if (status === 'success') {
      borderClasses = 'border-[#5b8a62] bg-[#242424] shadow-[0_12px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(91,138,98,0.15)] z-30';
    } else if (status === 'error') {
      borderClasses = 'border-[#ff6a6a] bg-[#242424] shadow-[0_15px_40px_rgba(255,106,106,0.15)] z-30';
    }
  }

  const handleNodeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.shiftKey || e.ctrlKey || e.metaKey) {
      return;
    }
    setSelectedElementId(block.id);
  };

  return {
    blockW,
    blockH,
    borderClasses,
    pulseClass,
    handleNodeClick,
  };
};
