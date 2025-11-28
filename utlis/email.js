import nodemailer from "nodemailer";

export async function sendEmail(html) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Auto Publisher" <${process.env.SMTP_USER}>`,
    to: process.env.BLOGGER_EMAIL,
    subject: "Auto Published Post",
    html,
  });
}