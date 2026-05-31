# Copilot instructions — ha-youtubevideocard

> Canonical standards live in the `dev-standards` repo on SOUNDWAVE/Gitea.
> Read by Copilot chat **and** inline suggestions.

## What this repo is

A **Home Assistant Lovelace card** (HACS frontend/plugin) that embeds a YouTube
video. JavaScript card shipped from `dist/`. Not a `custom_components/` integration.

## Repo shape

- `dist/youtube-video-card.js` — the shipped card (what HACS serves).
- `package.json`, `hacs.json`, `info.md`, `README.md`.
- `.github/workflows/` — `build.yaml` + `validate.yml` (HACS validation).

## Conventions

- HACS **plugin** (frontend): **no `manifest.json`/`hassfest`/pytest** — the HA
  component pipeline does NOT apply.
- If a build step exists, edit source and rebuild rather than hand-editing the
  shipped `dist/` bundle.
- Bump `version` in `package.json` + `hacs.json` for releases (HACS consumes the
  release/tag).

## Never

- Don't commit secrets. (No API keys expected — it's a presentational card.)
