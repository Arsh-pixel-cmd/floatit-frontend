import type { AgentBlock } from '../../types/engine';
import type { IBlockFactory } from './BlockFactory';

export class AgentBlockFactory implements IBlockFactory {
  createBlock(
    id: string,
    name: string,
    position: { x: number; y: number },
    extra?: { isGroupOutput?: boolean; description?: string }
  ): AgentBlock {
    const isGroupOutput = extra?.isGroupOutput ?? false;
    const description = extra?.description ?? 'Describe the agent objective...';
    
    return {
      id,
      type: 'agent',
      name,
      description,
      apiKey: '',
      useCustomKey: false,
      isGroupOutput,
      phase: isGroupOutput ? 'synthesis' : 'discover',
      waitConfig: { type: 'none', delay: 0 },
      triggerConfig: { type: 'manual' },
      position,
      outputContext: '',
    };
  }
}
