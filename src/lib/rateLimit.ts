const hits = new Map<string, { count: number; time: number }>()

export function rateLimit(ip: string, limit = 20, windowMs = 10 * 60 * 1000) {
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || now - entry.time > windowMs) {
    hits.set(ip, { count: 1, time: now })
    return true
  }
  if (entry.count >= limit) return false
  entry.count++
  return true
}
