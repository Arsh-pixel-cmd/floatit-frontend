import { supabase } from '../supabaseClient';
import { IHttpClient } from './IHttpClient';
import { httpClient } from './FetchHttpClient';

export class AuthenticatedApiProxy implements IHttpClient {
  private wrapped: IHttpClient;

  constructor(wrapped: IHttpClient) {
    this.wrapped = wrapped;
  }

  private async getHeaders(options?: RequestInit): Promise<HeadersInit> {
    const headers = { ...options?.headers } as Record<string, string>;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (e) {
      console.warn('[Proxy] Failed to resolve auth session:', e);
    }
    return headers;
  }

  async get<T>(url: string, options?: RequestInit): Promise<T> {
    const headers = await this.getHeaders(options);
    return this.wrapped.get<T>(url, {
      ...options,
      headers,
    });
  }

  async post<T>(url: string, body: any, options?: RequestInit): Promise<T> {
    const headers = await this.getHeaders(options);
    return this.wrapped.post<T>(url, body, {
      ...options,
      headers,
    });
  }
}

export const apiProxy = new AuthenticatedApiProxy(httpClient);
