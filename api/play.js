// GET /api/play?id=42
// Redirects to http://[local-ip]:8080/play?id=42

global.punksterIP = global.punksterIP || null;
global.punksterPort = global.punksterPort || 8080;

export default function handler(req, res) {
  const { id } = req.query;

  if (!global.punksterIP) {
    // Server noch nicht registriert
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

  const redirectUrl = `http://${global.punksterIP}:${global.punksterPort}/play?id=${id}`;
  res.redirect(302, redirectUrl);
}
