import fs from "fs";

export default function handler(req, res) {
  const path = "tokens.json";
  const tokens = fs.existsSync(path)
    ? JSON.parse(fs.readFileSync(path))
    : [];
  res.status(200).json(tokens);
}