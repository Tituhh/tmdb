import { fetchTMDB } from '../../../lib/tmdb';
import { getCache, setCache } from '../../../lib/cache';

export default async function handler(req, res) {
  const { id } = req.query;
  const cacheKey = `movie-${id}`;
  const cached = getCache(cacheKey);
  if (cached) return res.status(200).json(cached);

  try {
    const data = await fetchTMDB(`/movie/${id}`);
    setCache(cacheKey, data, process.env.CACHE_TTL);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}