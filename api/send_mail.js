import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const { title, html, receiver } = req.body || {};
  if (!receiver) return res.status(400).json({ error: "Receiver required" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"TMDB Generator" <${process.env.SMTP_USER}>`,
      to: receiver,
      subject: `🎬 New Blogger Post: ${title}`,
      html,
    });

    res.json({ message: "✅ Post sent to Blogger mail!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send email", details: err.message });
  }
}