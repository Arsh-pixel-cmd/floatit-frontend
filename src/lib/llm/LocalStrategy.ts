import { IExecutionStrategy } from './IExecutionStrategy';
import { callLLM } from '../llm';

export class LocalStrategy implements IExecutionStrategy {
  async execute(
    userTask: string,
    agent: any,
    neuralContext = '',
    attachment = null,
    useDefaultKey = false,
    signal?: AbortSignal
  ) {
    return callLLM(userTask, agent, neuralContext, attachment, useDefaultKey, 'meta/llama-3.1-70b-instruct', signal);
  }
}
