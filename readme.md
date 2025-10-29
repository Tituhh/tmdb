Sure 🔥 Here’s a redesigned, modern, colorful README.md for your Vercel-ready TMDB Blogger Post Generator — with buttons, colored badges, and styled code blocks 👇


---

<h1 align="center">🎬 TMDB Blogger Post Generator</h1>

<p align="center">
A stylish full-stack tool to <b>auto-fetch TMDB movie data</b>, generate <b>Blogger-ready HTML posts</b> 🎨, and <b>send them via Gmail SMTP</b> — deployable on <b>Vercel</b>.
</p>

---

## 🧠 Features

✅ Auto-fetch movie details by **TMDB ID or Name**  
✅ Dynamic **screenshots** (up to 5 images)  
✅ **Download buttons** with ripple effects  
✅ **Token-protected Admin API** (create/delete tokens)  
✅ **Live / Not Connected** status  
✅ **Receiver Mail field** → sends post directly to Blogger email  
✅ Modern dark-themed, responsive design  
✅ One-click deployment to **Vercel**

---

## 📂 Project Structure

```bash
tmdb-blogger-generator/
│
├── public/
│   ├── index.html          # Post Generator (Frontend)
│   └── admin.html          # Admin Control Panel
│
├── api/
│   ├── fetch.js            # TMDB API (secured by token)
│   ├── send_email.js       # Gmail SMTP mailer
│   ├── admin_add.js        # Add Token
│   ├── admin_delete.js     # Delete Token
│   ├── admin_list.js       # List Tokens
│
├── tokens.json             # Local token storage
├── package.json
├── vercel.json
└── .env                    # Secrets (TMDB + Gmail)


---

⚙️ Environment Variables (.env)

Add these inside your project root or in Vercel’s Environment Variables tab:

TMDB_KEY=your_tmdb_api_key
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_app_password

> 🔒 Generate Gmail App Password here:
👉 https://myaccount.google.com/apppasswords




---

🧩 Token System

Action	Description

➕ Add Token	Creates a new secure API token
❌ Delete Token	Removes existing token
📋 Copy API Link	Copies full endpoint with token
🟢 Live	Valid token — generator unlocked
🔴 Not Connected	Invalid/missing token — generator disabled


🪄 Example API Link:

https://yourapp.vercel.app/api/fetch?token=mytoken


---

🖥️ Frontend Generator (index.html)

🪶 Fields Auto-Filled From TMDB:

Title

Genre (used as Blogger labels)

Director, Cast, Country, Duration

IMDb, Rating, Review

Poster + Screenshots (up to 5)


🪶 Extra Features:

Dynamic Download Buttons

Receiver Mail (Blogger email)

Copy & Send buttons

Live token check (enables/disables fields)



---

📧 Email Sending (Frontend → Backend)

The frontend sends the final Blogger HTML directly to your Blogger mail using Gmail SMTP.

fetch("/api/send_email", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: postTitle,
    html: generatedHTML,
    receiver: document.getElementById("receiverMail").value
  })
});

> 💌 Sends instantly to your configured Blogger address!




---

🌐 API Usage Examples

# Fetch movie by TMDB ID
GET https://yourapp.vercel.app/api/fetch?token=mytoken&id=603692

# Fetch movie by name
GET https://yourapp.vercel.app/api/fetch?token=mytoken&name=Inception


---

🚀 Deployment on Vercel

1️⃣ Clone Repository

git clone https://github.com/yourname/tmdb-blogger-generator.git
cd tmdb-blogger-generator

2️⃣ Install Dependencies

npm install

3️⃣ Push to GitHub

git init
git add .
git commit -m "TMDB Blogger Generator"
git branch -M main
git remote add origin https://github.com/yourname/tmdb-blogger-generator.git
git push -u origin main

4️⃣ Import on Vercel

Add environment variables:
TMDB_KEY, SMTP_USER, SMTP_PASS

Click Deploy 🚀



---

🧾 Example: Generated Blogger HTML Output

<div class="movie-post">
  <h2>Kantara (2022)</h2>
  <p><b>Genre:</b> Action, Thriller</p>
  <p><b>Director:</b> Rishab Shetty</p>
  <p><b>Cast:</b> Achyuth Kumar, Kishore, Sapthami Gowda</p>
  <p><b>IMDb:</b> 8.7/10</p>
  <div class="screenshots">
    <img src="screenshot1.jpg" />
    <img src="screenshot2.jpg" />
    <img src="screenshot3.jpg" />
    <img src="screenshot4.jpg" />
    <img src="screenshot5.jpg" />
  </div>
  <div class="downloads">
    <a href="480p_link" class="btn">Download 480p</a>
    <a href="720p_link" class="btn">Download 720p</a>
  </div>
</div>


---

🛠 Tech Stack

Layer	Technology

Frontend	HTML5, CSS3, Vanilla JS
Backend	Vercel Serverless (Node.js)
API	TMDB (v3)
Email	Nodemailer (Gmail SMTP)
Auth	Token (JSON file)
Hosting	Vercel



---

🎨 UI Theme Highlights

🖤 Dark + Glassmorphic Design
🎞️ Poster Preview + Screenshot Grid
💬 Live/Not Connected Token Indicator
📮 Instant Mail to Blogger Inbox
💫 Ripple Animated Download Buttons


---

📸 Preview Screenshots

Admin Panel	Post Generator

	



---

💖 Author

Built with ❤️ by Your Name

> “Auto-Post smarter. Code once, post forever.”




---

🧩 Useful Links

🌍 TMDB Official API

☁️ Deploy on Vercel

📧 Gmail App Password Setup



---

<p align="center">
  <a href="https://vercel.com/new" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Deploy_on_Vercel-000000?style=for-the-badge&logo=vercel" />
  </a>
  <a href="https://developer.themoviedb.org" target="_blank">
    <img src="https://img.shields.io/badge/TMDB_API-01B4E4?style=for-the-badge&logo=themoviedatabase" />
  </a>
</p>
```
---

Would you like me to include copyable code badges/buttons (like “Copy .env” or “Copy deploy command” buttons) in the README for GitHub’s dark theme next?