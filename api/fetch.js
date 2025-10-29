import fetch from "node-fetch";
import fs from "fs";

export default async function handler(req, res) {
  const { token, id, name } = req.query;
  const TOKENS_FILE = "./tokens.json";
  if (!fs.existsSync(TOKENS_FILE)) fs.writeFileSync(TOKENS_FILE, JSON.stringify([]));
  const tokens = JSON.parse(fs.readFileSync(TOKENS_FILE));
  if (!tokens.includes(token)) return res.status(403).json({ error: "Invalid token" });

  const API_KEY = process.env.TMDB_KEY;
  try {
    let movieId = id;
    if (!id && name) {
      const searchRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(name)}`);
      const searchData = await searchRes.json();
      movieId = searchData.results?.[0]?.id;
    }
    const detailsRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,images`);
    const detailsData = await detailsRes.json();
    res.json(detailsData);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch TMDB data" });
  }
}