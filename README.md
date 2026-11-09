# maktub-page

The maktub web front — the portfolio homepage seed, and the browser landing that
completes the **email-confirmation** and **password-reset** links for the apps
(so they work from any device, not just the phone with the app installed).

Angular 19 SPA, deployed to **GitHub Pages** at
`https://shadycoll.github.io/maktub-page/`.

## Routes

- `/` — provider homepage (today the holding; becomes the operating company's page)
- `/niyya` — the Niyya product page. Two layouts for the founder to pick from:
  `?v=a` (default, text column) and `?v=b` (tiles); the loser gets removed.
- `/niyya/konto-loeschen` — account deletion without the app (required by Google
  Play): in-app steps plus a request by email
- `/auth` — Supabase redirect target: shows "email confirmed", or a
  password-reset form (branches on the auth event). Lazy-loaded, so only this
  page ships the Supabase library.
- `/datenschutz` — Datenschutzerklärung (DSGVO), for the website and Niyya
- `/impressum` — Impressum (§5 DDG)

`/datenschutz` and `/impressum` stay at the root: the app links to them
(`kImpressumUrl`, `kDatenschutzUrl` in the Niyya repo).

## Provider details

Name, address, email and register entry live in **one** place:
`src/app/core/provider.ts` (`PROVIDER`, `LEGAL_LAST_UPDATED`). When the operating
company takes over, change it there (and the app's `_companyName` in
`about_settings_section.dart`).

The privacy policy states what the app really does with data; its doc comment
lists the Niyya source files each statement was checked against. Change the app's
data flows → update the page.

## Look

Colors follow the app's "Sand" palette, light and dark via
`prefers-color-scheme` (`src/styles.css`). System fonts only, on purpose: a web
font from a foreign server would send the visitor's IP address there.

## Develop

```sh
npm install
npm start                       # ng serve → http://localhost:4200
npm test -- --watch=false --browsers=ChromeHeadless
npx ng build --base-href /maktub-page/
```

On Windows in Git Bash, prefix the build with `MSYS_NO_PATHCONV=1`; otherwise Git
Bash rewrites `/maktub-page/` into `C:/Program Files/Git/maktub-page/` and the
built page stays blank. CI builds on Linux and is not affected.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.
**One-time setup (founder):** create the GitHub repo `maktub-page`, push, then in
**Settings → Pages** set the source to **GitHub Actions**. The workflow copies
`index.html` to `404.html` so deep links + Supabase's URL tokens work on Pages.

After the first deploy, allowlist `https://shadycoll.github.io/maktub-page/auth`
in Supabase → Authentication → URL Configuration (redirect URLs).
