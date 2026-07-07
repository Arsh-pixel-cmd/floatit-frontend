import type { Block } from '../../types/engine';

/**
 * IBlockFactory — Interface contract for all block factories.
 * Follows the Factory Method Pattern.
 */
export interface IBlockFactory {
  createBlock(
    id: string,
    name: string,
    position: { x: number; y: number },
    extra?: any
  ): Block;
}

/**
 * BlockRegistry — Registry for managing and invoking block factories.
 * Allows extending block types without modifying core instantiation code (OCP).
 */
export class BlockRegistry {
  private static factories = new Map<string, IBlockFactory>();

  /**
   * Register a factory for a given block type.
   */
  static register(type: string, factory: IBlockFactory) {
    this.factories.set(type, factory);
  }

  /**
   * Instantiate a block of the given type using its registered factory.
   */
  static create(
    type: string,
    id: string,
    name: string,
    position: { x: number; y: number },
    extra?: any
  ): Block {
    const factory = this.factories.get(type);
    if (!factory) {
      throw new Error(`No factory registered for block type: ${type}`);
    }
    return factory.createBlock(id, name, position, extra);
  }
}
