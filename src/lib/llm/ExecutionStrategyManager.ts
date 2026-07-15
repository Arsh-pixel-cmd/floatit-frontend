import { IExecutionStrategy } from './IExecutionStrategy';
import { GroqStrategy } from './GroqStrategy';
import { LocalStrategy } from './LocalStrategy';

export class ExecutionStrategyManager {
  private static strategies: Record<string, IExecutionStrategy> = {
    groq: new GroqStrategy(),
    local: new LocalStrategy(),
  };

  static getStrategy(type: string): IExecutionStrategy {
    return this.strategies[type] || this.strategies.local;
  }
}
