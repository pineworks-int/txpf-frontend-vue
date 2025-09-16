const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:3001'

export interface ValidateResponse {
  valid: boolean
  user?: { id: string, email: string, role: 'admin' | 'guest' }
}

export async function validateToken(token: string): Promise<ValidateResponse> {
  const res = await fetch(`${AUTH_API_URL}/auth/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })

  if (res.ok) {
    return await res.json()
  }

  let message = 'Token validation failed'
  try {
    const data = await res.json()
    if (data?.message)
      message = data.message
  }
  catch {}

  throw new Error(message)
}
