import { ICommand } from '../ICommand';
import { useBuilderStore } from '../../builderStore';

export class CreateGroupCommand implements ICommand {
  private createdGroup: any = null;
  private createdOutputBlock: any = null;
  private createdConnections: any[] = [];

  constructor(
    private groupName: string,
    private blockIds: string[]
  ) {}

  execute() {
    const store = useBuilderStore.getState();
    const prevConns = [...store.connections];

    // Set selection temporarily for createGroup to work
    const originalSelectedIds = store.selectedBlockIds;
    useBuilderStore.setState({ selectedBlockIds: this.blockIds });
    
    this.createdGroup = store.createGroup(this.groupName);

    // Restore original selection
    useBuilderStore.setState({ selectedBlockIds: originalSelectedIds });

    if (this.createdGroup) {
      const postStore = useBuilderStore.getState();
      this.createdOutputBlock = postStore.blocks.find(b => b.id === this.createdGroup.outputBlockId);
      this.createdConnections = postStore.connections.filter(c => 
        !prevConns.some(pc => pc.id === c.id) && c.targetBlockId === this.createdGroup.outputBlockId
      );
    }
  }

  undo() {
    if (!this.createdGroup) return;
    const store = useBuilderStore.getState();
    
    useBuilderStore.setState({
      groups: store.groups.filter(g => g.id !== this.createdGroup.id),
      blocks: store.blocks.filter(b => b.id !== this.createdGroup.outputBlockId),
      connections: store.connections.filter(c => 
        !this.createdConnections.some(cc => cc.id === c.id)
      )
    });
    
    store.saveBuilderState();
  }
}
