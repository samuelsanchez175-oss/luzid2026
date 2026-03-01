# Decap CMS Setup (DecapBridge)

This site uses [DecapBridge](https://decapbridge.com) for CMS authentication. No GitHub OAuth App or Vercel environment variables are required.

## 1. Create a DecapBridge Account

1. Sign up at [decapbridge.com/auth/signup](https://decapbridge.com/auth/signup)
2. In the dashboard, add a new site

## 2. Add Your Site in DecapBridge

When adding a site, fill in:

| Field | Value |
|-------|-------|
| **Git provider** | GitHub |
| **Git repository** | `samuelsanchez175-oss/luzid2026` |
| **Git access token** | Create a [GitHub Personal Access Token](https://github.com/settings/tokens) with `repo` scope (or fine-grained with Contents read/write for this repo) |
| **Decap CMS login URL** | `https://luzidproductions.com/admin/` |
| **Auth type** | PKCE (for Google/Microsoft login) or Classic (password-only) |

## 3. Update admin/config.yml

After creating the site, DecapBridge shows a generated `config.yml` template. Copy the **backend** block from it and replace the backend section in `admin/config.yml` (keep the existing `media_folder`, `public_folder`, `locale`, and `collections`).

## 4. Deploy

Push your changes and redeploy. The CMS will be ready to use.

## 5. Invite Collaborators

In the DecapBridge dashboard, open your site and go to **Manage collaborators**. Enter email addresses and send invitations. Collaborators can log in with Google, Microsoft, or a password—no GitHub account required.

---

**Docs:** [DecapBridge Getting Started](https://decapbridge.com/docs/getting-started)
