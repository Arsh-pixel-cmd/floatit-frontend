import { ICommand } from '../ICommand';
import { useBuilderStore } from '../../builderStore';

export class DeleteAnnotationCommand implements ICommand {
  private deletedElement: any = null;
  constructor(
    private elementId: string,
    private type: 'sticky' | 'text' | 'image'
  ) {}

  execute() {
    const store = useBuilderStore.getState();
    if (this.type === 'sticky') {
      this.deletedElement = store.stickyNotes.find((n: any) => n.id === this.elementId);
      useBuilderStore.setState({
        stickyNotes: store.stickyNotes.filter((n: any) => n.id !== this.elementId),
        selectedElementId: store.selectedElementId === `sticky-${this.elementId}` ? null : store.selectedElementId
      });
    } else if (this.type === 'text') {
      this.deletedElement = store.textLabels.find((t: any) => t.id === this.elementId);
      useBuilderStore.setState({
        textLabels: store.textLabels.filter((t: any) => t.id !== this.elementId),
        selectedElementId: store.selectedElementId === `text-${this.elementId}` ? null : store.selectedElementId
      });
    } else if (this.type === 'image') {
      this.deletedElement = store.images.find((i: any) => i.id === this.elementId);
      useBuilderStore.setState({
        images: store.images.filter((i: any) => i.id !== this.elementId),
        selectedElementId: store.selectedElementId === `image-${this.elementId}` ? null : store.selectedElementId
      });
    }
  }

  undo() {
    if (!this.deletedElement) return;
    const store = useBuilderStore.getState();
    if (this.type === 'sticky') {
      useBuilderStore.setState({
        stickyNotes: [...store.stickyNotes, this.deletedElement],
        selectedElementId: `sticky-${this.elementId}`
      });
    } else if (this.type === 'text') {
      useBuilderStore.setState({
        textLabels: [...store.textLabels, this.deletedElement],
        selectedElementId: `text-${this.elementId}`
      });
    } else if (this.type === 'image') {
      useBuilderStore.setState({
        images: [...store.images, this.deletedElement],
        selectedElementId: `image-${this.elementId}`
      });
    }
  }
}
