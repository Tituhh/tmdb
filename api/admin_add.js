import fs from "fs";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
  const { token } = req.body;
  const path = "tokens.json";

  const tokens = fs.existsSync(path)
    ? JSON.parse(fs.readFileSync(path))
    : [];

  if (!tokens.includes(token)) tokens.push(token);

  fs.writeFileSync(path, JSON.stringify(tokens, null, 2));
  res.status(200).json({ success: true, token });
}