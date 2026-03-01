/**
 * Minimal GitHub OAuth "complete" handler for Decap CMS.
 * Exchanges code for token and returns HTML that hands off to Decap via postMessage.
 */
module.exports = async (req, res) => {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const origin = process.env.ORIGIN || 'luzidproductions.com';

  if (!clientId || !clientSecret) {
    res.status(500).setHeader('Content-Type', 'text/html;charset=utf-8');
    return res.end(
      `<html><body style="font-family:sans-serif;padding:2rem;max-width:600px;margin:0 auto;">
        <h1>CMS OAuth configuration error</h1>
        <p>Missing OAUTH_CLIENT_ID or OAUTH_CLIENT_SECRET in Vercel environment variables.</p>
        <p>See <a href="https://github.com/samuelsanchez175-oss/luzid2026/blob/main/DECAP_SETUP.md">DECAP_SETUP.md</a> for instructions.</p>
      </body></html>`
    );
  }

  const code = (req.query && req.query.code) || null;

  if (!code) {
    return res.status(200).setHeader('Content-Type', 'text/html;charset=utf-8').end(renderHtml('error', 'No authorization code received from GitHub.'));
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await tokenRes.json();

    if (data.error) {
      return res.status(200).setHeader('Content-Type', 'text/html;charset=utf-8').end(
        renderHtml('error', data.error_description || data.error)
      );
    }

    if (!data.access_token) {
      return res.status(200).setHeader('Content-Type', 'text/html;charset=utf-8').end(
        renderHtml('error', 'GitHub did not return an access token.')
      );
    }

    const content = JSON.stringify({ token: data.access_token, provider: 'github' });
    const originPattern = escapeForRegex(origin);

    res.status(200).setHeader('Content-Type', 'text/html;charset=utf-8');
    res.end(renderSuccessHtml(content, originPattern));
  } catch (err) {
    res.status(200).setHeader('Content-Type', 'text/html;charset=utf-8');
    res.end(renderHtml('error', err.message || 'An error occurred during login.'));
  }
};

function escapeForRegex(str) {
  const escaped = str.replace(/\./g, '\\.');
  return `^https?:\\/\\/([^\\/]*\\.)?${escaped}(:\\d+)?$`;
}

function renderHtml(message, content) {
  const escaped = String(content).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Logging in...</title></head><body><p>${escaped}</p><script>
(function(){
  if(window.opener){
    var msg='authorization:github:${message}:${escaped}';
    window.opener.postMessage(msg,'*');
  }
  window.close();
})();
</script></body></html>`;
}

function renderSuccessHtml(content, originPattern) {
  const contentStr = JSON.stringify(content);
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Logging you in via GitHub...</title></head><body><p>Logging you in via GitHub...</p><script>
(function(){
  if(!window.opener){document.body.innerHTML='No opener. Please close this window.';return;}
  var content=${contentStr.replace(/</g, '\\u003c')};
  function receiveMessage(e){
    var origin=e.origin==='null'?false:e.origin;
    if(!origin||!new RegExp(${JSON.stringify(originPattern)},'i').test(origin))return;
    window.removeEventListener('message',receiveMessage,false);
    window.opener.postMessage('authorization:github:success:'+content,origin);
    window.close();
  }
  window.addEventListener('message',receiveMessage,false);
  window.opener.postMessage('authorizing:github','*');
})();
</script></body></html>`;
}
