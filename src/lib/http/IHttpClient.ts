export interface IHttpClient {
  get<T>(url: string, options?: RequestInit): Promise<T>;
  post<T>(url: string, body: any, options?: RequestInit): Promise<T>;
}
