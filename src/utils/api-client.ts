import { createClient } from '@/utils/supabase/server'

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
  }
}

async function getAuthHeader() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token ? `Bearer ${session.access_token}` : ''
}

async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const authHeader = await getAuthHeader()
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/api'

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader,
      ...(options.headers || {})
    }
  }

  console.log('requesting ', `${baseUrl}${url}`);
  const response = await fetch(`${baseUrl}${url}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {})
    }
  })

  console.log('response ', response);

  if (!response.ok) {
    throw new ApiError(response.status, `API Error: ${response.statusText}`)
  }

  return response
}

export const api = {
  get: async <T>(url: string, options?: RequestInit): Promise<T> => {
    const response = await fetchWithAuth(url, {
      ...options,
      method: 'GET'
    })
    return response.json()
  },

  post: async <T>(url: string, data: unknown, options?: RequestInit): Promise<T> => {
    const response = await fetchWithAuth(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    })
    return response.json()
  },

  // Add other methods as needed (PUT, DELETE, etc.)
}