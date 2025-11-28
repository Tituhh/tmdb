import axios from "axios";
import { checkServer } from "./serverCheck.js";

export async function generateHTML(tmdbId, type, season = 1, episode = 1) {

  const tmdb = await axios.get(
    `https://api.themoviedb.org/3/${type === "movie" ? "movie" : "tv"}/${tmdbId}?api_key=${process.env.TMDB_KEY}&append_to_response=credits,images`
  );

  const info = tmdb.data;

  const imdb = await axios.get(
    `http://www.omdbapi.com/?t=${info.title || info.name}&apikey=${process.env.OMDB_KEY}`
  );

  const title = info.title || info.name;
  const poster = `https://image.tmdb.org/t/p/w500${info.poster_path}`;
  const overview = info.overview;
  const release = info.release_date || info.first_air_date;
  const genre = info.genres.map((g) => g.name).join(", ");
  const cast = info.credits.cast.slice(0, 6).map((c) => c.name).join(", ");
  const imdbRating = imdb.data.imdbRating || "N/A";

  const screenshots = info.images.backdrops
    .slice(0, 5)
    .map((i) => `https://image.tmdb.org/t/p/w780${i.file_path}`);

  const servers = [
    `https://vidsrcme.ru/embed/${type}?tmdb=${tmdbId}&s=${season}&e=${episode}`,
    `https://vidsrcme.su/embed/${type}?tmdb=${tmdbId}&s=${season}&e=${episode}`,
    `https://vidsrc-embed.ru/${type}?tmdb=${tmdbId}&s=${season}&e=${episode}`,
    `https://vidbinge.dev/embed/${type}/${tmdbId}/${season}/${episode}`,
    `https://moviesapi.club/${type}/${tmdbId}`,
  ];

  let working = [];
  for (const url of servers) if (await checkServer(url)) working.push(url);

  let html = `
<h1>${title} (${release?.substring(0,4)})</h1>

<img src="${poster}" width="100%"/><br><br>

<b>IMDb:</b> ${imdbRating}/10<br>
<b>Genre:</b> ${genre}<br>
<b>Cast:</b> ${cast}<br>
<b>Release:</b> ${release}<br><br>

<p>${overview}</p>

<h2>Screenshots</h2>
`;

  screenshots.forEach((s) => (html += `<img src="${s}" width="100%"/><br>`));

  html += `<h2>Watch Online</h2>`;

  working.forEach(
    (link) =>
      (html += `<iframe width="100%" height="300" src="${link}" allowfullscreen frameborder="0"></iframe><br>`)
  );

  return html;
}