import axios from "axios";

export async function fetchOMDB(title) {
  try {
    const res = await axios.get(
      `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${process.env.OMDB_KEY}`
    );
    return res.data;
  } catch (err) {
    console.log("OMDB Error:", err);
    return null;
  }
}