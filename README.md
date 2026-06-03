# Muum Repo Explorer

Muum Repo Explorer is an open-source repository discovery and maintenance triage tool for web and macOS.

The current app helps developers search GitHub repositories by topic and language, sort by activity signals, and open repository records quickly. The long-term direction is a lightweight maintainer workspace: discover relevant projects, compare repository health, triage issues, and prepare review or release work with AI-assisted workflows.

Website: [muum.dev](https://muum.dev)

## Why This Project Exists

Open-source maintainers spend a large amount of time on repetitive project work: finding related repositories, checking activity, comparing ecosystems, classifying issues, reviewing pull requests, and preparing release notes. Muum Repo Explorer starts with repository search and is being shaped into a practical maintenance surface for those workflows.

The project is intentionally available as both:

- A web app for quick public access.
- A macOS app for maintainers who want a local desktop workspace.

## Current Features

- Search GitHub repositories by topic or custom term.
- Filter results by programming language.
- Sort results by stars, forks, and last update.
- Browse paginated repository results.
- Open repositories directly from the results table.
- Sign in with Clerk and save repositories to a private workspace.
- Store saved repository records in Cloudflare D1 and repository snapshots in R2.
- Run as a static web app or packaged Electron macOS app.

## Roadmap

- Improve GitHub API error, empty, and rate-limit states.
- Add repository health signals such as open issues, recent releases, maintainer activity, and license.
- Add saved research lists for maintainers comparing ecosystems.
- Add issue and pull request triage views.
- Add Codex-assisted summaries for project health, issue queues, and release preparation.
- Add signed and notarized macOS releases.
- Harden dependency security and add audit coverage to CI.

## Codex for Open Source Fit

The project is being prepared for real open-source maintenance workflows. Codex and API credits would be used to:

- Summarize repository health and maintenance risk from public GitHub signals.
- Classify issues and pull requests into actionable maintenance buckets.
- Draft release notes and maintainer handoff summaries.
- Build security and code-quality checks into the maintainer workflow.
- Accelerate implementation of the macOS and web app surfaces.

This is not positioned as a generic GitHub search clone. The goal is a focused tool for maintainers who need to understand and act on open-source repository activity faster.

## Development

```bash
npm ci
npm run dev
```

Run the full local quality suite:

```bash
npm test
```

Build the static web app:

```bash
npm run build:web
```

Run the Cloudflare Pages Functions build locally:

```bash
npm run db:migrate:local
npm run dev:cloudflare
```

Build the macOS app:

```bash
npm run build:mac
```

The macOS build outputs DMG and ZIP artifacts under `dist/macos`.

Deploy the static web app to Cloudflare Pages:

```bash
npm run deploy:cloudflare
```

## CI

The GitHub Actions workflow in `.github/workflows/macos-app.yml` installs dependencies with `npm ci`, runs the test suite, builds the macOS app, and uploads the generated DMG/ZIP artifacts.

The workflow in `.github/workflows/cloudflare-pages.yml` builds the static web app and deploys `out/` to Cloudflare Pages. It requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets.

See [docs/cloudflare-plan.md](docs/cloudflare-plan.md) for the Cloudflare Pages, D1, R2, and Clerk plan.

## Tech Stack

- Next.js
- TypeScript
- Mantine UI
- Clerk
- Redux Toolkit
- TanStack Query
- Cloudflare Pages Functions
- Cloudflare D1
- Cloudflare R2
- Electron
- electron-builder
