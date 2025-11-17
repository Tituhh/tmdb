import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Missing title or content" });
  }

  // Gmail SMTP Transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  // Blogger secret email
  const bloggerEmail = process.env.BLOGGER_POST_EMAIL;

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: bloggerEmail,
      subject: title,
      html: content
    });

    return res.status(200).json({
      message: "Post sent to Blogger successfully!"
    });

  } catch (err) {
    return res.status(500).json({
      message: "Failed to send email",
      error: err.message
    });
  }
}