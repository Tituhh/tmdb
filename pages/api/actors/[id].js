import { fetchTMDB } from '../../../lib/tmdb';
import { getCache, setCache } from '../../../lib/cache';

export default async function handler(req, res) {
  const { id } = req.query;
  const cacheKey = `actor-${id}`;
  const cached = getCache(cacheKey);
  if (cached) return res.status(200).json(cached);

  try {
    const details = await fetchTMDB(`/person/${id}`);
    const credits = await fetchTMDB(`/person/${id}/combined_credits`);
    const data = { ...details, credits };
    setCache(cacheKey, data, process.env.CACHE_TTL);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}