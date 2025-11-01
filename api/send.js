const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed" });

    const { title, html, labels } = req.body;
    const { GMAIL_USER, GMAIL_PASS, BLOGGER_EMAIL } = process.env;

    if (!GMAIL_USER || !GMAIL_PASS || !BLOGGER_EMAIL)
      return res.status(401).json({ error: "Missing email configuration" });

    if (!title || !html)
      return res.status(400).json({ error: "Missing title or HTML content" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: GMAIL_USER, pass: GMAIL_PASS },
    });

    const labelComment = labels?.length
      ? `<!-- Labels: ${labels.join(", ")} -->`
      : "";

    const mailOptions = {
      from: GMAIL_USER,
      to: BLOGGER_EMAIL,
      subject: title,
      html: `${labelComment}\n${html}`,
    };

    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, info });
  } catch (err) {
    console.error("Send API Error:", err.message);
    res.status(500).json({ error: "Failed to send email" });
  }
};