import fs from "fs";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
  const { token } = req.body;
  const path = "tokens.json";

  let tokens = fs.existsSync(path)
    ? JSON.parse(fs.readFileSync(path))
    : [];

  tokens = tokens.filter(t => t !== token);
  fs.writeFileSync(path, JSON.stringify(tokens, null, 2));
  res.status(200).json({ success: true });
}