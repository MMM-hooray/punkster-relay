// GET /api/play?id=42
// Fetches current IP from JSONBin and redirects

const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/6a7dea68f5f4af5e2911d324';
const JSONBIN_KEY = '$2a$10$Mh9HtQ9Tz.MjI3rvjXdB0.5RnFtN1NtAAP5DpH0OW2G61mK3YwJhq';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const response = await fetch(JSONBIN_URL, {
      headers: {
        'X-Master-Key': JSONBIN_KEY,
        'X-Bin-Meta': 'false'
      }
    });
    
    const data = await response.json();
    const ip = data.ip;
    const port = data.port || 8080;

    if (!ip) {
      return res.status(503).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PUNKSTER</title>
          <style>
            body { background:#111; color:#fff; font-family:monospace; 
                   display:flex; align-items:center; justify-content:center; 
                   height:100vh; margin:0; text-align:center; padding:20px; }
            h1 { color:#FF1493; font-size:2rem; margin-bottom:20px; }
            p { color:#888; }
          </style>
        </head>
        <body>
          <div>
            <h1>PUNKSTER</h1>
            <p>Server nicht gefunden.</p>
            <p>Bitte start.bat starten!</p>
          </div>
        </body>
        </html>
      `);
    }

    const redirectUrl = `http://${ip}:${port}/play?id=${id}`;
    return res.redirect(302, redirectUrl);

  } catch(e) {
    return res.status(500).send('Fehler: ' + e.message);
  }
}
