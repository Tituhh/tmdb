import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Only POST allowed" });

  const { title, type, genres, htmlContent } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Post title → TV show or Movie name (no emoji)
    const subject =
      type === "tv"
        ? `TV Show: ${title}`
        : `Movie: ${title}`;

    // Blogger labels from genres (added in subject metadata, hidden in post)
    const labelPart = genres?.length ? ` [${genres.join(", ")}]` : "";

    await transporter.sendMail({
      from: `"TMDB Generator" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: subject + labelPart,
      html: htmlContent,
    });

    res.status(200).json({ message: "Post sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send email", error: err });
  }
}
