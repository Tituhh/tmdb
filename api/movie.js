const axios = require("axios");

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed" });

    const { query, type } = req.body;
    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) return res.status(401).json({ error: "TMDB API key missing" });
    if (!query || !type)
      return res.status(400).json({ error: "Missing query or type" });

    const searchUrl = `https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&query=${encodeURIComponent(
      query
    )}`;

    const searchResp = await axios.get(searchUrl);
    const result = searchResp.data.results?.[0];
    if (!result) return res.status(404).json({ error: "No results found" });

    const id = result.id;
    const detailsUrl = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&append_to_response=credits,videos,images,external_ids,recommendations,similar`;

    const { data } = await axios.get(detailsUrl);

    const baseImg = "https://image.tmdb.org/t/p/";
    const poster = data.poster_path ? baseImg + "w500" + data.poster_path : "";
    const backdrop = data.backdrop_path
      ? baseImg + "original" + data.backdrop_path
      : "";

    const crew = data.credits?.crew || [];
    const crew_summary = {
      directors: crew
        .filter((c) => c.job === "Director")
        .map((c) => c.name),
      writers: crew.filter((c) => c.department === "Writing").map((c) => c.name),
      producers: crew
        .filter((c) => c.job === "Producer")
        .map((c) => c.name),
      composers: crew
        .filter((c) => c.job === "Original Music Composer")
        .map((c) => c.name),
    };

    const images_list = [
      ...(data.images?.backdrops || []),
      ...(data.images?.posters || []),
    ]
      .map((img) => ({
        path: baseImg + "original" + img.file_path,
        width: img.width,
        height: img.height,
        iso_639_1: img.iso_639_1,
      }))
      .slice(0, 20);

    const normalized = {
      id: data.id,
      type,
      title: data.title || data.name,
      original_title: data.original_title || data.original_name,
      tagline: data.tagline,
      overview: data.overview,
      release_date: data.release_date || data.first_air_date,
      runtime: data.runtime || data.episode_run_time?.[0] || null,
      rating: data.vote_average,
      votes: data.vote_count,
      language: data.original_language,
      production_companies: data.production_companies?.map((p) => p.name),
      genres: data.genres?.map((g) => g.name),
      poster_path: poster,
      backdrop_path: backdrop,
      homepage: data.homepage,
      external_ids: data.external_ids,
      credits: data.credits,
      videos: data.videos,
      recommendations: data.recommendations?.results || [],
      similar: data.similar?.results || [],
      crew_summary,
      images_list,
      raw: data,
    };

    res.status(200).json(normalized);
  } catch (err) {
    console.error("Movie API Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};