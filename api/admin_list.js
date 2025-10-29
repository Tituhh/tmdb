import fs from "fs";

export default async function handler(req, res) {
  const TOKENS_FILE = "./tokens.json";
  if (!fs.existsSync(TOKENS_FILE)) fs.writeFileSync(TOKENS_FILE, JSON.stringify([]));
  const tokens = JSON.parse(fs.readFileSync(TOKENS_FILE));
  res.json(tokens);
}