import { ICommand } from '../ICommand';
import { useBuilderStore } from '../../builderStore';
import { Block } from '../../../types/engine';

export class DeleteBlockCommand implements ICommand {
  private deletedBlock: Block | null = null;
  private connections: any[] = [];
  constructor(private blockId: string) {}

  execute() {
    const store = useBuilderStore.getState();
    this.deletedBlock = store.blocks.find(b => b.id === this.blockId) || null;
    this.connections = store.connections.filter(c => c.sourceBlockId === this.blockId || c.targetBlockId === this.blockId);
    store.deleteBlock(this.blockId);
  }

  undo() {
    if (this.deletedBlock) {
      const store = useBuilderStore.getState();
      useBuilderStore.setState({
        blocks: [...store.blocks, this.deletedBlock],
        connections: [...store.connections, ...this.connections],
        selectedElementId: this.deletedBlock.id
      });
    }
  }
}
