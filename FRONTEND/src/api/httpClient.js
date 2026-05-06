const API_BASE_URL = 'http://localhost:8080'

const defaultHeaders = {
  'Content-Type': 'application/json',
}

async function parseResponse(response) {
  if (response.status === 204) {
    return null
  }

  const isJson = response.headers.get('content-type')?.includes('application/json')
  const data = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const message = (data && data.message) || `Request failed with status ${response.status}`
    throw new Error(message)
  }

  return data
}

export async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: defaultHeaders,
    ...options,
  })

  return parseResponse(response)
}
