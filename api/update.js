// POST /api/update { ip: "192.168.1.22", port: 8080 }
// GET /api/update -> returns current IP

// Simple in-memory store (resets on redeploy, but that's fine)
// We use a global variable that persists between requests on same instance
global.punksterIP = global.punksterIP || null;
global.punksterPort = global.punksterPort || 8080;
global.lastUpdate = global.lastUpdate || null;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { ip, port } = req.body;
    if (ip) {
      global.punksterIP = ip;
      global.punksterPort = port || 8080;
      global.lastUpdate = new Date().toISOString();
      console.log('IP updated:', ip);
      return res.json({ ok: true, ip, port: global.punksterPort });
    }
    return res.status(400).json({ error: 'IP fehlt' });
  }

  return res.json({
    ip: global.punksterIP,
    port: global.punksterPort,
    lastUpdate: global.lastUpdate
  });
}
