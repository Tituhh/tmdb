import { fetchTMDB } from '../../lib/tmdb';
import { getCache, setCache } from '../../lib/cache';

export default async function handler(req, res) {
  const { query, type = 'multi', page = 1 } = req.query;
  if (!query) return res.status(400).json({ error: 'query is required' });

  const cacheKey = `search-${type}-${query}-${page}`;
  const cached = getCache(cacheKey);
  if (cached) return res.status(200).json(cached);

  try {
    const data = await fetchTMDB('/search/' + type, { query, page });
    setCache(cacheKey, data, process.env.CACHE_TTL);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}