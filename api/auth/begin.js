const { createVercelBeginHandler } = require('netlify-cms-oauth-provider-node');

let handler;
try {
  handler = createVercelBeginHandler({}, { useEnv: true });
} catch (err) {
  handler = (req, res) => {
    res.status(500).setHeader('Content-Type', 'text/html;charset=utf-8');
    res.send(
      `<html><body style="font-family:sans-serif;padding:2rem;max-width:600px;margin:0 auto;">
        <h1>CMS OAuth configuration error</h1>
        <p>${err.message || 'Missing or invalid environment variables.'}</p>
        <p>Add <code>OAUTH_CLIENT_ID</code>, <code>OAUTH_CLIENT_SECRET</code>, <code>COMPLETE_URL</code>, and <code>ORIGIN</code> in Vercel → Settings → Environment Variables.</p>
        <p>See <a href="https://github.com/samuelsanchez175-oss/luzid2026/blob/main/DECAP_SETUP.md">DECAP_SETUP.md</a> for instructions.</p>
      </body></html>`
    );
  };
}

module.exports = handler;
