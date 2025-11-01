const q = (id) => document.getElementById(id);

q("fetchBtn").onclick = async () => {
  const query = q("query").value.trim();
  const type = q("type").value;
  if (!query) return alert("Enter a title");

  const res = await fetch("/api/movie", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, type }),
  });
  const data = await res.json();
  if (!res.ok) return alert(data.error || "Fetch failed");

  q("title").value = data.title;
  q("tagline").value = data.tagline;
  q("overview").value = data.overview;
  q("release_date").value = data.release_date;
  q("runtime").value = data.runtime;
  q("rating").value = data.rating;
  q("language").value = data.language;
  q("genres").value = data.genres?.join(", ");
  q("companies").value = data.production_companies?.join(", ");
  q("directors").value = data.crew_summary.directors.join(", ");
  q("writers").value = data.crew_summary.writers.join(", ");
  q("poster").src = data.poster_path;

  const screenshotsDiv = q("screenshots");
  screenshotsDiv.innerHTML = "";
  data.images_list.forEach((img) => {
    const el = document.createElement("img");
    el.src = img.path;
    el.onclick = () => el.classList.toggle("selected");
    screenshotsDiv.appendChild(el);
  });
};

q("addDownload").onclick = () => {
  const row = document.createElement("div");
  row.className = "dl-row";
  row.innerHTML = `
    <input placeholder="Button Text" class="btn-label" />
    <input placeholder="Button URL" class="btn-url" />
    <button class="remove">✕</button>`;
  row.querySelector(".remove").onclick = () => row.remove();
  q("downloads").appendChild(row);
};

q("generateBtn").onclick = () => {
  const title = q("title").value;
  const tagline = q("tagline").value;
  const overview = q("overview").value;
  const release = q("release_date").value;
  const rating = q("rating").value;
  const runtime = q("runtime").value;
  const genres = q("genres").value.split(",").map((g) => g.trim());
  const screenshots = Array.from(
    document.querySelectorAll("#screenshots img.selected")
  ).map((i) => i.src);

  const downloads = Array.from(document.querySelectorAll(".dl-row"))
    .map((r) => ({
      label: r.querySelector(".btn-label").value,
      url: r.querySelector(".btn-url").value,
    }))
    .filter((d) => d.label && d.url);

  let html = `
<div style="font-family:Poppins,sans-serif;background:#fff;padding:15px;border-radius:10px;">
  <h1>${title}</h1>
  <h3 style="color:#666;">${tagline}</h3>
  <p>${overview}</p>
  <p><b>Release Date:</b> ${release} | <b>Runtime:</b> ${runtime} min | <b>Rating:</b> ${rating}</p>
  <p><b>Genres:</b> ${genres.join(", ")}</p>
  ${screenshots.map((s) => `<img src="${s}" style="max-width:100%;margin:5px 0;border-radius:8px;">`).join("")}
  <div style="margin-top:10px;">
    ${downloads.map(
      (d) =>
        `<a href="${d.url}" style="display:inline-block;margin:5px;padding:8px 12px;background:#007bff;color:white;text-decoration:none;border-radius:6px;">${d.label}</a>`
    ).join("")}
  </div>
  <!-- Labels: ${genres.join(", ")} -->
</div>`;

  q("output").textContent = html;
};

q("copyBtn").onclick = () => {
  navigator.clipboard.writeText(q("output").textContent);
  alert("Copied!");
};

q("sendBtn").onclick = async () => {
  const title = q("title").value;
  const html = q("output").textContent;
  const labels = q("genres").value.split(",").map((g) => g.trim());

  const res = await fetch("/api/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, html, labels }),
  });
  const data = await res.json();
  if (res.ok) alert("Sent successfully!");
  else alert("Send failed: " + data.error);
};