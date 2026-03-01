/**
 * Minimal GitHub OAuth "begin" handler for Decap CMS.
 * Redirects to GitHub's authorization URL.
 */
module.exports = (req, res) => {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const completeUrl = process.env.COMPLETE_URL;

  if (!clientId || !completeUrl) {
    res.status(500).setHeader('Content-Type', 'text/html;charset=utf-8');
    return res.end(
      `<html><body style="font-family:sans-serif;padding:2rem;max-width:600px;margin:0 auto;">
        <h1>CMS OAuth configuration error</h1>
        <p>Missing OAUTH_CLIENT_ID or COMPLETE_URL in Vercel environment variables.</p>
        <p>See <a href="https://github.com/samuelsanchez175-oss/luzid2026/blob/main/DECAP_SETUP.md">DECAP_SETUP.md</a> for instructions.</p>
      </body></html>`
    );
  }

  const state = Math.random().toString(36).slice(2) + Date.now().toString(36);
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: completeUrl,
    scope: 'repo,user',
    state,
  });

  res.status(302);
  res.setHeader('Location', `https://github.com/login/oauth/authorize?${params}`);
  res.end();
};
