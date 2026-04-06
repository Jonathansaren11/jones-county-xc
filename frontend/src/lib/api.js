/**
 * Base URL for API requests. Leave empty in dev to use same-origin `/api/*`
 * (see Vite proxy). In production, set VITE_API_BASE_URL if the API is on another host.
 */
export function getApiUrl(path) {
  const base = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "")
  const p = path.startsWith("/") ? path : `/${path}`
  return `${base}${p}`
}

async function handleJSONResponse(res) {
  if (!res.ok) {
    let detail = res.statusText || `HTTP ${res.status}`
    try {
      const text = await res.text()
      if (text) detail = text
    } catch {
      /* ignore */
    }
    throw new Error(detail)
  }
  const ct = res.headers.get("content-type")
  if (ct && ct.includes("application/json")) {
    return res.json()
  }
  return null
}

export async function fetchJSON(path) {
  const res = await fetch(getApiUrl(path))
  return handleJSONResponse(res)
}

export async function apiJSON(path, { method = "GET", body } = {}) {
  const res = await fetch(getApiUrl(path), {
    method,
    headers: { "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  return handleJSONResponse(res)
}

export async function loginWithPassword(password) {
  const res = await fetch(getApiUrl("/api/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || "login failed")
  }
  if (!data.token) {
    throw new Error("no token in response")
  }
  return data.token
}
