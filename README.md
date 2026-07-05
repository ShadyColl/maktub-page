# maktub-page

The maktub web front — the portfolio homepage seed, and the browser landing that
completes the **email-confirmation** and **password-reset** links for the apps
(so they work from any device, not just the phone with the app installed).

Angular 19 SPA, deployed to **GitHub Pages** at
`https://shadycoll.github.io/maktub-page/`.

## Routes

- `/` — minimal landing (grows into the homepage)
- `/auth` — Supabase redirect target: shows "email confirmed", or a
  password-reset form (branches on the auth event)
- `/datenschutz` — Datenschutzerklärung (DSGVO)
- `/impressum` — Impressum (§5 DDG)

## Develop

```sh
npm install
npm start                       # ng serve → http://localhost:4200
npm test -- --watch=false --browsers=ChromeHeadless
npx ng build --base-href /maktub-page/
```

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.
**One-time setup (founder):** create the GitHub repo `maktub-page`, push, then in
**Settings → Pages** set the source to **GitHub Actions**. The workflow copies
`index.html` to `404.html` so deep links + Supabase's URL tokens work on Pages.

After the first deploy, allowlist `https://shadycoll.github.io/maktub-page/auth`
in Supabase → Authentication → URL Configuration (redirect URLs).
