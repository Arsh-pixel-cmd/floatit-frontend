const generateId = () => `dd_${Math.random().toString(36).substr(2, 9)}`;

export function buildDoubleDiamondBlocks() {
  return [
    // DISCOVER
    { id: 'dd_reviews',            phase: 'discover', name: 'Reviews',            type: 'agent' as const, isOutputNode: false, position: { x: 160, y: 80  }, description: 'Analyze user reviews and feedback to identify pain points and patterns.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_observations',       phase: 'discover', name: 'Observations',        type: 'agent' as const, isOutputNode: false, position: { x: 160, y: 230 }, description: 'Document field observations and contextual research findings.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_primary_research',   phase: 'discover', name: 'Primary Research',    type: 'agent' as const, isOutputNode: false, position: { x: 160, y: 380 }, description: 'Conduct primary research including interviews and surveys.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_secondary_research', phase: 'discover', name: 'Secondary Research',  type: 'agent' as const, isOutputNode: false, position: { x: 160, y: 530 }, description: 'Gather and synthesize secondary research, market data and competitor analysis.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_tech_channels',      phase: 'discover', name: 'Tech & Channels',     type: 'agent' as const, isOutputNode: false, position: { x: 160, y: 680 }, description: 'Audit existing technology stack and distribution channels.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_discover_output',    phase: 'discover', name: 'Discover Output',     type: 'agent' as const, isOutputNode: true,  position: { x: 160, y: 830 }, description: 'Synthesize all Discover phase findings into a comprehensive summary.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },

    // DEFINE
    { id: 'dd_architecture',       phase: 'define', name: 'Architecture',       type: 'agent' as const, isOutputNode: false, position: { x: 620, y: 80  }, description: 'Define the information architecture and structural framework.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_ux_flow',            phase: 'define', name: 'UX Flow Mapping',    type: 'agent' as const, isOutputNode: false, position: { x: 620, y: 230 }, description: 'Map user flows and journey paths through the system.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_persuasion',         phase: 'define', name: 'Persuasion Tools',   type: 'agent' as const, isOutputNode: false, position: { x: 620, y: 380 }, description: 'Identify persuasion patterns and behavioral design opportunities.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_define_output',      phase: 'define', name: 'Define Output',      type: 'agent' as const, isOutputNode: true,  position: { x: 620, y: 530 }, description: 'Synthesize all Define phase outputs into actionable design specifications.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },

    // DEVELOP
    { id: 'dd_screens',            phase: 'develop', name: 'Screens',            type: 'agent' as const, isOutputNode: false, position: { x: 1080, y: 80  }, description: 'Design and specify key screens and interface components.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_interactions',       phase: 'develop', name: 'Interactions',       type: 'agent' as const, isOutputNode: false, position: { x: 1080, y: 230 }, description: 'Define interaction patterns, animations and micro-interactions.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_images_texts',       phase: 'develop', name: 'Images & Texts',     type: 'agent' as const, isOutputNode: false, position: { x: 1080, y: 380 }, description: 'Develop visual content strategy, copy and imagery guidelines.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_navigations',        phase: 'develop', name: 'Navigations',        type: 'agent' as const, isOutputNode: false, position: { x: 1080, y: 530 }, description: 'Design navigation systems and wayfinding patterns.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_develop_output',     phase: 'develop', name: 'Develop Output',     type: 'agent' as const, isOutputNode: true,  position: { x: 1080, y: 680 }, description: 'Synthesize all Develop phase outputs into a complete design solution.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },

    // DELIVER
    { id: 'dd_brand_test',         phase: 'deliver', name: 'Brand Test',         type: 'agent' as const, isOutputNode: false, position: { x: 1540, y: 80  }, description: 'Validate brand consistency and identity alignment across deliverables.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_ux_test',            phase: 'deliver', name: 'UX Test',            type: 'agent' as const, isOutputNode: false, position: { x: 1540, y: 230 }, description: 'Conduct usability testing and gather user feedback on prototypes.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_expert_review',      phase: 'deliver', name: 'Expert Review',      type: 'agent' as const, isOutputNode: false, position: { x: 1540, y: 380 }, description: 'Perform expert heuristic evaluation and accessibility audit.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_usability_test',     phase: 'deliver', name: 'Usability Test',     type: 'agent' as const, isOutputNode: false, position: { x: 1540, y: 530 }, description: 'Run structured usability tests with target users.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_deliver_output',     phase: 'deliver', name: 'Deliver Output',     type: 'agent' as const, isOutputNode: true,  position: { x: 1540, y: 680 }, description: 'Produce the final delivery report with all validated recommendations.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
  ];
}

export function buildDoubleDiamondConnections() {
  return [
    // DISCOVER → Discover Output
    { id: generateId(), sourceBlockId: 'dd_reviews',            targetBlockId: 'dd_discover_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_observations',       targetBlockId: 'dd_discover_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_primary_research',   targetBlockId: 'dd_discover_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_secondary_research', targetBlockId: 'dd_discover_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_tech_channels',      targetBlockId: 'dd_discover_output', sourcePort: 'right', targetPort: 'left' },
    // Discover Output → DEFINE
    { id: generateId(), sourceBlockId: 'dd_discover_output', targetBlockId: 'dd_architecture', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_discover_output', targetBlockId: 'dd_ux_flow',      sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_discover_output', targetBlockId: 'dd_persuasion',   sourcePort: 'right', targetPort: 'left' },
    // DEFINE → Define Output
    { id: generateId(), sourceBlockId: 'dd_architecture', targetBlockId: 'dd_define_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_ux_flow',      targetBlockId: 'dd_define_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_persuasion',   targetBlockId: 'dd_define_output', sourcePort: 'right', targetPort: 'left' },
    // Define Output → DEVELOP
    { id: generateId(), sourceBlockId: 'dd_define_output', targetBlockId: 'dd_screens',       sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_define_output', targetBlockId: 'dd_interactions',  sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_define_output', targetBlockId: 'dd_images_texts',  sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_define_output', targetBlockId: 'dd_navigations',   sourcePort: 'right', targetPort: 'left' },
    // DEVELOP → Develop Output
    { id: generateId(), sourceBlockId: 'dd_screens',      targetBlockId: 'dd_develop_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_interactions', targetBlockId: 'dd_develop_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_images_texts', targetBlockId: 'dd_develop_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_navigations',  targetBlockId: 'dd_develop_output', sourcePort: 'right', targetPort: 'left' },
    // Develop Output → DELIVER
    { id: generateId(), sourceBlockId: 'dd_develop_output', targetBlockId: 'dd_brand_test',     sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_develop_output', targetBlockId: 'dd_ux_test',        sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_develop_output', targetBlockId: 'dd_expert_review',  sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_develop_output', targetBlockId: 'dd_usability_test', sourcePort: 'right', targetPort: 'left' },
    // DELIVER → Deliver Output
    { id: generateId(), sourceBlockId: 'dd_brand_test',     targetBlockId: 'dd_deliver_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_ux_test',        targetBlockId: 'dd_deliver_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_expert_review',  targetBlockId: 'dd_deliver_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_usability_test', targetBlockId: 'dd_deliver_output', sourcePort: 'right', targetPort: 'left' },
  ];
}