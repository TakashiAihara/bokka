// HTTP Client Helper for E2E Testing

// Default E2E test endpoints
const E2E_HTTP_ENDPOINTS = {
  usersBff: process.env.USERS_BFF_URL ?? 'http://localhost:3010',
  managersBff: process.env.MANAGERS_BFF_URL ?? 'http://localhost:3011',
  bookmarksRead: process.env.BOOKMARKS_READ_URL ?? 'http://localhost:3001',
  bookmarksWrite: process.env.BOOKMARKS_WRITE_URL ?? 'http://localhost:3002',
  feedsRead: process.env.FEEDS_READ_URL ?? 'http://localhost:3003',
  feedsWrite: process.env.FEEDS_WRITE_URL ?? 'http://localhost:3004',
} as const;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
}

interface HttpResponse<T = unknown> {
  status: number;
  statusText: string;
  headers: Headers;
  data: T;
}

/**
 * Make an HTTP request to an E2E test endpoint
 */
export async function request<T = unknown>(
  url: string,
  options: RequestOptions = {},
): Promise<HttpResponse<T>> {
  const { method = 'GET', headers = {}, body } = options;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data: T;
  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    data = (await response.json()) as T;
  } else {
    data = (await response.text()) as unknown as T;
  }

  return {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    data,
  };
}

/**
 * Create an HTTP client for a specific base URL
 */
export function createHttpClient(baseUrl: string) {
  return {
    get: <T = unknown>(path: string, headers?: Record<string, string>) =>
      request<T>(`${baseUrl}${path}`, { method: 'GET', headers }),

    post: <T = unknown>(
      path: string,
      body?: unknown,
      headers?: Record<string, string>,
    ) => request<T>(`${baseUrl}${path}`, { method: 'POST', body, headers }),

    put: <T = unknown>(
      path: string,
      body?: unknown,
      headers?: Record<string, string>,
    ) => request<T>(`${baseUrl}${path}`, { method: 'PUT', body, headers }),

    patch: <T = unknown>(
      path: string,
      body?: unknown,
      headers?: Record<string, string>,
    ) => request<T>(`${baseUrl}${path}`, { method: 'PATCH', body, headers }),

    delete: <T = unknown>(path: string, headers?: Record<string, string>) =>
      request<T>(`${baseUrl}${path}`, { method: 'DELETE', headers }),
  };
}

/**
 * Pre-configured HTTP clients for E2E testing
 */
export const httpClients = {
  usersBff: () => createHttpClient(E2E_HTTP_ENDPOINTS.usersBff),
  managersBff: () => createHttpClient(E2E_HTTP_ENDPOINTS.managersBff),
  bookmarksRead: () => createHttpClient(E2E_HTTP_ENDPOINTS.bookmarksRead),
  bookmarksWrite: () => createHttpClient(E2E_HTTP_ENDPOINTS.bookmarksWrite),
  feedsRead: () => createHttpClient(E2E_HTTP_ENDPOINTS.feedsRead),
  feedsWrite: () => createHttpClient(E2E_HTTP_ENDPOINTS.feedsWrite),
};

export { E2E_HTTP_ENDPOINTS };
