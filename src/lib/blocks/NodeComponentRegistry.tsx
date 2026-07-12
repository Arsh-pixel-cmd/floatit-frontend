import type React from 'react';

export interface INodeRendererProps {
  block: any;
  isSelected: boolean;
  isTopologyLocked: boolean;
  isMultiSelected: boolean;
}

/**
 * NodeComponentRegistry — Registry mapping block types to React render components.
 * Follows the Open/Closed Principle (OCP) for rendering nodes.
 */
export class NodeComponentRegistry {
  private static components = new Map<string, React.ComponentType<INodeRendererProps>>();

  static register(type: string, component: React.ComponentType<INodeRendererProps>) {
    this.components.set(type, component);
  }

  static get(type: string): React.ComponentType<INodeRendererProps> | undefined {
    return this.components.get(type);
  }
}

// Note: Component registration happens in the components that use them
// to avoid circular dependency with old repo components that don't exist here
