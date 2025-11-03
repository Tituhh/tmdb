import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { to, title, genres, htmlContent } = req.body;

  if (!to || !title || !htmlContent) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Create Blogger-compatible subject line (genres only for metadata)
    const subject = genres && genres.length
      ? `${title} [${genres.join(", ")}]`
      : title;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"TMDB Generator" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    });

    return res.status(200).json({ success: true, message: "Post sent successfully!" });
  } catch (error) {
    console.error("❌ Email send error:", error);
    return res.status(500).json({ error: "Failed to send email", details: error.message });
  }
}
