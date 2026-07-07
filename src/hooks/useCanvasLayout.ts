import { useMemo } from 'react';
import { WORKFLOW_PHASES } from '../data/schema';
import { computeLayout } from '../lib/layoutEngine';
import { useBuilderStore } from '../lib/builderStore';
import { useWorkflowStore } from '../lib/store';

/**
 * useCanvasLayout — Custom hook to isolate graph layout calculation.
 * Follows the Single Responsibility Principle (SRP).
 */
export const useCanvasLayout = () => {
  const graphStatus = useWorkflowStore((state) => state.graphStatus);
  const deployedTemplateId = useBuilderStore((state) => state.deployedTemplateId);
  const templates = useBuilderStore((state) => state.templates);

  const layout = useMemo(() => {
    if (graphStatus === 'error') return null;
    if (deployedTemplateId) {
      let activeTemplate = templates.find((t: any) => t.id === deployedTemplateId);

      // Fallback: If not in templates array yet (e.g. local deploy), build from builderStore blocks directly
      if (!activeTemplate) {
        const builderState = useBuilderStore.getState();
        if (builderState.blocks.length > 0) {
          activeTemplate = {
            id: deployedTemplateId,
            blocks: builderState.blocks,
            connections: builderState.connections,
          };
        }
      }

      if (activeTemplate) {
        const depths: Record<string, number> = {};
        const adj: Record<string, any[]> = {};
        const inDegree: Record<string, number> = {};

        activeTemplate.blocks.forEach((b: any) => {
          adj[b.id] = [];
          inDegree[b.id] = 0;
          depths[b.id] = 0;
        });

        activeTemplate.connections.forEach((c: any) => {
          if (adj[c.sourceBlockId] && inDegree[c.targetBlockId] !== undefined) {
            adj[c.sourceBlockId]!.push(c.targetBlockId);
            inDegree[c.targetBlockId]!++;
          }
        });

        let queue: any[] = [];
        Object.keys(inDegree).forEach(id => {
          if (inDegree[id] === 0) queue.push(id);
        });

        while (queue.length > 0) {
          const curr = queue.shift();
          adj[curr]!.forEach(neighbor => {
            depths[neighbor] = Math.max(depths[neighbor]!, depths[curr]! + 1);
            inDegree[neighbor]!--;
            if (inDegree[neighbor] === 0) queue.push(neighbor);
          });
        }

        const phaseIds = WORKFLOW_PHASES.map(p => p.id);
        const depthGroups: Record<number, any[]> = {};

        activeTemplate.blocks.forEach((block: any) => {
          const d = depths[block.id] || 0;
          const phaseIndex = Math.min(d, phaseIds.length - 1);
          block.dynamicPhase = phaseIds[phaseIndex];
          if (!depthGroups[d]) depthGroups[d] = [];
          depthGroups[d]!.push(block);
        });

        const newLayout: Record<string, any> = {};
        const maxDepth = Math.max(0, ...Object.keys(depthGroups).map(Number));

        for (let d = 0; d <= maxDepth; d++) {
          const blocksInCol = depthGroups[d] || [];
          const x = 350 + (d * 500);
          const startY = 400 - ((blocksInCol.length - 1) * 200) / 2;

          blocksInCol.forEach((block: any, bIdx: any) => {
            const phaseIndex = Math.min(d, phaseIds.length - 1);
            newLayout[block.id] = {
              id: block.id,
              x: x + (bIdx % 2 !== 0 ? 60 : 0),
              y: startY + (bIdx * 200),
              category: { name: block.name, description: block.description },
              phase: phaseIds[phaseIndex],
              tools: [],
              blockRef: block
            };
          });
        }
        return newLayout;
      }
    }
    return computeLayout('desktop', 2000, 1000);
  }, [graphStatus, deployedTemplateId, templates]);

  return layout;
};
export default useCanvasLayout;
