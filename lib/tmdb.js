import fetch from 'node-fetch';

const TMDB_BASE = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

export async function fetchTMDB(path, params = {}) {
  const url = new URL(`${TMDB_BASE}${path}`);
  url.searchParams.append('api_key', API_KEY);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status}`);
  }
  return res.json();
}