import { fetchTMDB } from '../../../lib/tmdb';
import { getCache, setCache } from '../../../lib/cache';

export default async function handler(req, res) {
  const { genre, year, rating, page = 1 } = req.query;
  const cacheKey = `tv-${genre}-${year}-${rating}-${page}`;
  const cached = getCache(cacheKey);
  if (cached) return res.status(200).json(cached);

  try {
    const params = {
      with_genres: genre,
      first_air_date_year: year,
      'vote_average.gte': rating,
      page,
    };
    const data = await fetchTMDB('/discover/tv', params);
    setCache(cacheKey, data, process.env.CACHE_TTL);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}