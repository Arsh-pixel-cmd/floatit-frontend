import { ICommand } from '../ICommand';
import { useBuilderStore } from '../../builderStore';

export class AddBlockCommand implements ICommand {
  private blockId: string | null = null;
  constructor(private type: 'agent' | 'webhook', private position?: { x: number; y: number }) {}

  execute() {
    const store = useBuilderStore.getState();
    const prevBlocksCount = store.blocks.length;
    
    if (this.type === 'agent') {
      store.addBlock(this.position);
    } else {
      store.addWebhookBlock(this.position);
    }
    
    // Find the newly added block's id
    const currentBlocks = useBuilderStore.getState().blocks;
    if (currentBlocks.length > prevBlocksCount) {
      const newBlock = currentBlocks[currentBlocks.length - 1];
      if (newBlock) {
        this.blockId = newBlock.id;
      }
    }
  }

  undo() {
    if (this.blockId) {
      useBuilderStore.getState().deleteBlock(this.blockId);
    }
  }
}
