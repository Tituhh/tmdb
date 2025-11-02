import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { title, html, labels } = req.body;
  if (!title || !html) return res.status(400).json({ message: "Missing required fields" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.BLOGGER_EMAIL,
      subject: title,
      html: `${html}<br><br>Labels: ${labels || ""}`,
    });

    res.status(200).json({ success: true, message: "✅ Post sent to Blogger!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "SMTP send failed", error: error.message });
  }
}