import { IExecutionStrategy } from './IExecutionStrategy';
import { callLLM } from '../llm';

export class GroqStrategy implements IExecutionStrategy {
  async execute(
    userTask: string,
    agent: any,
    neuralContext = '',
    attachment = null,
    useDefaultKey = false,
    signal?: AbortSignal
  ) {
    return callLLM(userTask, agent, neuralContext, attachment, useDefaultKey, 'groq-llama-3', signal);
  }
}
