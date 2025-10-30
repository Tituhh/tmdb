import fs from "fs";

export default async function handler(req, res) {
  const { token, query, id } = req.query;
  const tokens = fs.existsSync("tokens.json")
    ? JSON.parse(fs.readFileSync("tokens.json"))
    : [];

  if (!tokens.includes(token))
    return res.status(403).json({ error: "Invalid token" });

  const apiKey = "55b11132b5aef36e8376418dcce756f2";
  const baseUrl = "https://api.themoviedb.org/3";

  try {
    let data;

    if (id) {
      const detailRes = await fetch(
        `${baseUrl}/movie/${id}?api_key=${apiKey}&append_to_response=credits,videos`
      );
      data = await detailRes.json();
    } else {
      const searchRes = await fetch(
        `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
      );
      const searchData = await searchRes.json();
      const movieId = searchData.results?.[0]?.id;
      if (!movieId) return res.status(404).json({ error: "Movie not found" });
      const detailRes = await fetch(
        `${baseUrl}/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,videos`
      );
      data = await detailRes.json();
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch TMDB data", details: err.message });
  }
}