import { BlockRegistry } from './BlockFactory';
import { AgentBlockFactory } from './AgentBlockFactory';
import { WebhookBlockFactory } from './WebhookBlockFactory';

// Register standard factories automatically on module import
BlockRegistry.register('agent', new AgentBlockFactory());
BlockRegistry.register('webhook', new WebhookBlockFactory());

export { BlockRegistry, type IBlockFactory } from './BlockFactory';
export { AgentBlockFactory } from './AgentBlockFactory';
export { WebhookBlockFactory } from './WebhookBlockFactory';
