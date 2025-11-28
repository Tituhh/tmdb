import axios from "axios";

export async function searchTMDB(query) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_KEY}&query=${query}`
    );
    return res.data.results[0];
  } catch (err) {
    console.log("TMDB Search Error:", err);
    return null;
  }
}

export async function fetchTMDBDetails(tmdbId, type) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${type === "movie" ? "movie" : "tv"}/${tmdbId}?api_key=${process.env.TMDB_KEY}&append_to_response=credits,images`
    );
    return res.data;
  } catch (err) {
    console.log("TMDB Details Error:", err);
    return null;
  }
}