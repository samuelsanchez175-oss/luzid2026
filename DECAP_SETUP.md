# Decap CMS GitHub Login Setup

The "Login with GitHub" button requires a GitHub OAuth App and Vercel environment variables. Follow these steps:

## 1. Create a GitHub OAuth App

1. Go to [GitHub Developer Settings → OAuth Apps](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in:
   - **Application name:** Luzid Productions CMS (or any name)
   - **Homepage URL:** `https://luzidproductions.com`
   - **Authorization callback URL:** `https://luzidproductions.com/api/auth/complete`
4. Click **Register application**
5. Copy the **Client ID**
6. Click **Generate a new client secret** and copy the **Client Secret**

## 2. Add Environment Variables in Vercel

1. Go to your [Vercel project](https://vercel.com/dashboard)
2. Open **Settings → Environment Variables**
3. Add these variables (for Production, Preview, and Development):

| Name | Value |
|------|-------|
| `OAUTH_CLIENT_ID` | Your GitHub OAuth Client ID |
| `OAUTH_CLIENT_SECRET` | Your GitHub OAuth Client Secret |
| `COMPLETE_URL` | `https://luzidproductions.com/api/auth/complete` |
| `ORIGIN` | `luzidproductions.com` |

4. Redeploy the project for the env vars to take effect.

## 3. Test

1. Visit `https://luzidproductions.com/admin/`
2. Click **Login with GitHub**
3. Authorize the app when prompted
4. You should land in the CMS editor

---

**Note:** If you use a different domain (e.g. a Vercel preview URL), update `base_url` in `admin/config.yml` and the `COMPLETE_URL` / `ORIGIN` env vars to match that domain.
