import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { to, subject, htmlContent } = req.body;

  if (!to || !subject || !htmlContent) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // --- Gmail SMTP configuration ---
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,   // your Gmail address (e.g. sender@gmail.com)
        pass: process.env.GMAIL_PASS,   // Gmail App password (not real password)
      },
    });

    // --- Send mail to Blogger ---
    await transporter.sendMail({
      from: `"TMDB Post Generator" <${process.env.GMAIL_USER}>`,
      to,                      // "asatkarsarvesh39.titu@blogger.com"
      subject,                 // Title + [Genres]  → becomes Blogger title & labels
      html: htmlContent,       // Full generated HTML post body
    });

    console.log("✅ Post sent successfully to Blogger");
    return res.status(200).json({ success: true, message: "Post sent successfully!" });

  } catch (error) {
    console.error("❌ Error sending mail:", error);
    return res.status(500).json({ error: "Failed to send email", details: error.message });
  }
}
