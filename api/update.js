// Legacy endpoint - IP is now stored in JSONBin directly by server.js
export default function handler(req, res) {
  res.json({ ok: true, message: 'IP wird direkt von server.js an JSONBin gemeldet' });
}
