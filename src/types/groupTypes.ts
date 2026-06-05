/**
 * Dynamic Group System — Type Definitions
 * 
 * Groups are execution phases. Each group:
 * - Contains agent blocks
 * - Has a synthesis output node
 * - Has an execution order
 * - Can execute independently or as part of a workflow
 */

export interface Group {
  id: string;
  name: string;
  blockIds: string[];       // Agent block IDs in this group
  outputBlockId: string;    // Auto-created synthesis output node
  order: number;            // Workflow execution sequence (creation order)
}
