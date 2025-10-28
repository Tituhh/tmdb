const cache = new Map();

export function setCache(key, value, ttl = 300) {
  const expires = Date.now() + ttl * 1000;
  cache.set(key, { value, expires });
}

export function getCache(key) {
  const cached = cache.get(key);
  if (!cached) return null;
  if (cached.expires < Date.now()) {
    cache.delete(key);
    return null;
  }
  return cached.value;
}