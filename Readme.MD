🎬 TMDB Clone API

 

A developer-friendly, secure, fast, and fully dynamic TMDB-like REST API, fetching live movies, TV shows, and actor data directly from the official TMDB API. Built with Next.js API Routes, fully deployable on Vercel, and designed for modern web apps.


---

✨ Features

🌐 Dynamic real-time fetching from TMDB API

⚡ Fast responses with in-memory caching (TTL configurable)

🔒 API Key authentication for security

📄 Pagination support for listing endpoints

🎨 Poster & backdrop image URLs included

📝 JSON responses matching TMDB schema

🚀 Ready for Vercel deployment



---

📌 Endpoints

🎥 Movies

Endpoint	Method	Description

/api/movies	GET	List movies (filters: genre, year, rating, page)
/api/movies/{id}	GET	Movie details


📺 TV Shows

Endpoint	Method	Description

/api/tv	GET	List TV shows (filters: genre, year, rating, page)
/api/tv/{id}	GET	TV show details


🧑‍🎤 Actors

Endpoint	Method	Description

/api/actors/{id}	GET	Actor details + associated movies/TV shows


🔍 Search

Endpoint	Method	Description

/api/search	GET	Search movies, TV shows, or actors. Query params: query, type, page



---

🛠 Query Parameters

Parameter	Description

genre	Filter by genre ID
year	Filter by release year
rating	Minimum vote average
page	Pagination page number
query	Search keyword (required for search)
type	Search type: movie, tv, person (default: multi)



---

🔑 Authentication

All endpoints require a custom API key via the x-api-key header:

GET /api/movies
x-api-key: YOUR_API_KEY

Unauthorized requests return:

{
  "error": "Unauthorized"
}


---

💻 Installation

1. Clone the repo:



git clone https://github.com/yourusername/tmdb-clone.git
cd tmdb-clone

2. Install dependencies:



npm install

3. Create .env.local:



TMDB_API_KEY=your_tmdb_api_key_here
API_KEY=your_custom_api_key_here
CACHE_TTL=300


---

🚀 Run Locally

npm run dev

Visit http://localhost:3000/api/movies to test the API.


---

☁️ Deployment on Vercel

1. Push to GitHub.


2. Create a new project on Vercel and link the repo.


3. Add environment variables in Vercel:



TMDB_API_KEY
API_KEY
CACHE_TTL

4. Deploy! Access endpoints like:



https://your-vercel-domain/api/movies
https://your-vercel-domain/api/movies/550
https://your-vercel-domain/api/tv
https://your-vercel-domain/api/search?query=matrix

