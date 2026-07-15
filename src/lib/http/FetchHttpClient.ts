import { IHttpClient } from './IHttpClient';

export class FetchHttpClient implements IHttpClient {
  async get<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      ...options,
      method: 'GET',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (errorData) {
        throw { ...errorData, status: response.status };
      }
      throw { message: `HTTP GET error: status ${response.status}`, status: response.status };
    }
    return response.json();
  }

  async post<T>(url: string, body: any, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (errorData) {
        throw { ...errorData, status: response.status };
      }
      throw { message: `HTTP POST error: status ${response.status}`, status: response.status };
    }
    return response.json();
  }
}
export const httpClient = new FetchHttpClient();
