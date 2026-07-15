/**
 * CanvasElementFactory — Factory Method pattern
 *
 * Centralizes creation of canvas annotation elements (sticky notes, text labels, image nodes)
 * so that new element types can be added by registering a new creator, not editing callers.
 */

const generateId = () => `id_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

export type CanvasElementType = 'sticky' | 'text' | 'image';

export interface StickyNoteElement {
  id: string;
  type: 'sticky';
  text: string;
  color: string;
  position: { x: number; y: number };
}

export interface TextLabelElement {
  id: string;
  type: 'text';
  text: string;
  x: number;
  y: number;
}

export interface ImageElement {
  id: string;
  type: 'image';
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type CanvasElement = StickyNoteElement | TextLabelElement | ImageElement;

interface ElementCreators {
  sticky: (position: { x: number; y: number }, opts?: Partial<StickyNoteElement>) => StickyNoteElement;
  text: (position: { x: number; y: number }, opts?: Partial<TextLabelElement>) => TextLabelElement;
  image: (position: { x: number; y: number }, url: string, opts?: Partial<ImageElement>) => ImageElement;
}

const creators: ElementCreators = {
  sticky: (position, opts = {}) => ({
    id: generateId(),
    type: 'sticky',
    text: '',
    color: opts.color || '#A259FF',
    position: {
      x: position?.x ?? 400 + Math.random() * 200,
      y: position?.y ?? 400 + Math.random() * 200,
    },
    ...opts,
  }),

  text: (position, opts = {}) => ({
    id: generateId(),
    type: 'text',
    text: '',
    x: position.x,
    y: position.y,
    ...opts,
  }),

  image: (position, url, opts = {}) => ({
    id: generateId(),
    type: 'image',
    url,
    x: position.x,
    y: position.y,
    width: opts.width || 200,
    height: opts.height || 200,
    ...opts,
  }),
};

export const CanvasElementFactory = {
  createSticky: (position: { x: number; y: number }, opts?: Partial<StickyNoteElement>): StickyNoteElement =>
    creators.sticky(position, opts),

  createTextLabel: (position: { x: number; y: number }, opts?: Partial<TextLabelElement>): TextLabelElement =>
    creators.text(position, opts),

  createImage: (position: { x: number; y: number }, url: string, opts?: Partial<ImageElement>): ImageElement =>
    creators.image(position, url, opts),
};
