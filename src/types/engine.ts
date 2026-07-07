export type ApiKeyModalType = 'NO_KEY' | 'INVALID_KEY' | 'RATE_LIMIT';

export interface BaseBlock {
  id: string;
  name: string;
  description: string;
  position: { x: number; y: number };
  size?: { width: number; height: number };
  waitConfig: { type: string; delay: number };
  triggerConfig: { type: string };
  isGroupOutput?: boolean;
  useCustomKey?: boolean;
  apiKey?: string;
  outputContext?: string; // Information to be passed on to other agents (Flow 2, Step 3)
  linkedSequenceId?: string | null;
  linkedSequenceName?: string;
}

export interface AgentBlock extends BaseBlock {
  type: 'agent';
  apiKey: string;
  useCustomKey?: boolean;
  isGroupOutput?: boolean;
  phase?: string;
  outputContext?: string;
}

export interface WebhookBlock extends BaseBlock {
  type: 'webhook';
  linkedSequenceId: string | null;
  linkedSequenceName: string;
}

export type Block = AgentBlock | WebhookBlock;


export interface KeyInfoState {
  activeSource: 'none' | 'project' | 'global';
  project: {
    hasKey: boolean;
    lastFour?: string;
  };
  global: {
    any: boolean;
    lastFour?: string;
  };
}

export interface SequenceAttachment {
  name: string;
  content: string;
  type: string;
}

export interface CameraState {
  x: number;
  y: number;
  zoom: number;
}

export interface PhaseOverlayState {
  phase: number;
  phaseName: string;
  nextPhaseName: string;
}

export interface StickyNote {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  width: number;
  height: number;
}

export interface TextLabel {
  id: number;
  x: number;
  y: number;
  text: string;
}

export interface DraggingAppElement {
  type: 'sticky' | 'label';
  id: number;
  startX: number;
  startY: number;
  startMouseX: number;
  startMouseY: number;
}

export interface ResizingAppElement {
  type: 'sticky';
  id: number;
  elemX: number;
  elemY: number;
}

export interface StrokePoint {
  x: number;
  y: number;
}

export interface TokenLimitModalState {
  show: boolean;
  model: string;
  provider: string;
  message: string;
}

export type ToolType = 'cursor' | 'sticky' | 'text' | 'highlighter'| 'connect';

export type GraphStatus = 'idle' | 'loading' | 'ready' | 'running' | 'completed' | 'error';

export interface WorkflowNodeResult {
  content?: string;
  ui?: string;
  agentName?: string;
  _errorType?: string;
}

export type WorkflowNodeResults = Record<string, WorkflowNodeResult>;

export interface WorkflowStoreState {
  graphStatus: GraphStatus;
  setGraphStatus: (status: GraphStatus) => void;
  animationState: {
    phase: string;
    activeNodes: string[];
    queuedTransitions: any[];
  };
  setAnimationState: (newState: any) => void;
  projectPrompt: string;
  setProjectPrompt: (prompt: string) => void;
  flowTitle: string;
  setFlowTitle: (title: string) => void;
  projectAttachment: SequenceAttachment | null;
  setProjectAttachment: (attachment: SequenceAttachment | null) => void;
  currentPhaseIndex: number;
  setCurrentPhaseIndex: (idx: number) => void;
  nodeStates: Record<string, string>;
  nodeResults: WorkflowNodeResults;
  setNodeState: (nodeId: string, state: string) => void;
  setNodeResult: (nodeId: string, result: any) => void;
  resetExecution: (nodes: string[]) => void;
  selectedNodeId: string | null;
  selectNode: (nodeId: string | null, source?: any) => void;
}
