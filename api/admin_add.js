import fs from "fs";

export default async function handler(req, res) {
  const { token } = req.body || {};
  if (!token) return res.status(400).json({ error: "Token required" });
  const TOKENS_FILE = "./tokens.json";
  if (!fs.existsSync(TOKENS_FILE)) fs.writeFileSync(TOKENS_FILE, JSON.stringify([]));
  const tokens = JSON.parse(fs.readFileSync(TOKENS_FILE));
  if (tokens.includes(token)) return res.status(400).json({ error: "Already exists" });
  tokens.push(token);
  fs.writeFileSync(TOKENS_FILE, JSON.stringify(tokens, null, 2));
  res.json({ message: "Token added", link: `/api/fetch?token=${token}` });
}