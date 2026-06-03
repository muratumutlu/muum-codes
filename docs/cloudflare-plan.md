# Cloudflare Platform Plan

## Current Deployment Path

Muum Repo Explorer is currently a static Next.js export, so the correct Cloudflare target is Cloudflare Pages.

- Build command: `npm run build:web`
- Build output directory: `out`
- Pages project name: `muum-repo-explorer`
- Production domain target: `muum.dev`

The repository includes a direct-upload workflow with Wrangler. It requires these GitHub Actions secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Domain Notes

`muum.dev` is already using Cloudflare nameservers. After the Pages project exists, add `muum.dev` as a custom domain in the Cloudflare Pages project. Cloudflare should then create or guide the required DNS record.

## Future Product Architecture

Use storage only when product features require it:

- D1: saved repository lists, user workspaces, triage state, issue classifications, release-note drafts.
- R2: exported reports, repository snapshots, generated assets, long-lived files.
- Clerk: authentication and organization membership for private saved workspaces.
- Workers or Pages Functions: authenticated API routes, GitHub API proxying, rate-limit handling, and future AI workflows.

Do not add D1/R2 bindings before the first feature needs persisted server-side data. The current public search experience can remain static and client-side.
