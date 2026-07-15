export interface IExecutionStrategy {
  execute(
    userTask: string,
    agent: any,
    neuralContext?: string,
    attachment?: any,
    useDefaultKey?: boolean,
    signal?: AbortSignal
  ): Promise<{ content: string; ui: string; _errorType?: string }>;
}
