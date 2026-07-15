import { ICommand } from '../ICommand';
import { useBuilderStore } from '../../builderStore';
import { CanvasElementFactory } from '../../canvas/CanvasElementFactory';

export class AddAnnotationCommand implements ICommand {
  private elementId: string | null = null;
  constructor(
    private type: 'sticky' | 'text' | 'image',
    private position: { x: number; y: number },
    private url?: string
  ) {}

  execute() {
    const store = useBuilderStore.getState();
    if (this.type === 'sticky') {
      const note = CanvasElementFactory.createSticky(this.position);
      this.elementId = note.id;
      useBuilderStore.setState({
        stickyNotes: [...store.stickyNotes, note],
        selectedElementId: `sticky-${note.id}`
      });
    } else if (this.type === 'text') {
      const text = CanvasElementFactory.createTextLabel(this.position);
      this.elementId = text.id;
      useBuilderStore.setState({
        textLabels: [...store.textLabels, text],
        selectedElementId: `text-${text.id}`
      });
    } else if (this.type === 'image' && this.url) {
      const image = CanvasElementFactory.createImage(this.position, this.url);
      this.elementId = image.id;
      useBuilderStore.setState({
        images: [...store.images, image],
        selectedElementId: `image-${image.id}`
      });
    }
  }

  undo() {
    if (!this.elementId) return;
    const store = useBuilderStore.getState();
    if (this.type === 'sticky') {
      useBuilderStore.setState({
        stickyNotes: store.stickyNotes.filter((n: any) => n.id !== this.elementId),
        selectedElementId: store.selectedElementId === `sticky-${this.elementId}` ? null : store.selectedElementId
      });
    } else if (this.type === 'text') {
      useBuilderStore.setState({
        textLabels: store.textLabels.filter((t: any) => t.id !== this.elementId),
        selectedElementId: store.selectedElementId === `text-${this.elementId}` ? null : store.selectedElementId
      });
    } else if (this.type === 'image') {
      useBuilderStore.setState({
        images: store.images.filter((i: any) => i.id !== this.elementId),
        selectedElementId: store.selectedElementId === `image-${this.elementId}` ? null : store.selectedElementId
      });
    }
  }
}
