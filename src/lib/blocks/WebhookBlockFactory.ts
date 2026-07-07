import type { WebhookBlock } from '../../types/engine';
import type { IBlockFactory } from './BlockFactory';

export class WebhookBlockFactory implements IBlockFactory {
  createBlock(
    id: string,
    name: string,
    position: { x: number; y: number }
  ): WebhookBlock {
    return {
      id,
      type: 'webhook',
      name,
      description: 'Links to another workflow sequence...',
      linkedSequenceId: null,
      linkedSequenceName: '',
      position,
      waitConfig: { type: 'none', delay: 0 },
      triggerConfig: { type: 'event' },
    };
  }
}
