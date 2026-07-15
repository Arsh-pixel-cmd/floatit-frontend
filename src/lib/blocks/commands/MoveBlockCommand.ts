import { ICommand } from '../ICommand';
import { useBuilderStore } from '../../builderStore';

export class MoveBlockCommand implements ICommand {
  constructor(
    private blockId: string,
    private oldPosition: { x: number; y: number },
    private newPosition: { x: number; y: number }
  ) {}

  execute() {
    useBuilderStore.getState().updateBlock(this.blockId, { position: this.newPosition });
  }

  undo() {
    useBuilderStore.getState().updateBlock(this.blockId, { position: this.oldPosition });
  }
}
