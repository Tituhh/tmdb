export default function auth(req, res, next) {
  const clientKey = req.headers['x-api-key'];
  if (!clientKey || clientKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}