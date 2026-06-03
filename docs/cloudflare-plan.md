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

## Workspace Architecture

The first persisted workflow is saved repositories:

- Clerk: client sign-in and session tokens.
- Pages Functions: authenticated workspace API.
- D1: saved repository records keyed by Clerk user ID.
- R2: repository snapshot JSON for long-lived export and later analysis workflows.

## Cloudflare Setup

The repository now declares the D1 and R2 bindings in `wrangler.toml`:

- D1 binding: `DB`
- D1 database name: `muum-repo-explorer`
- R2 binding: `REPO_BUCKET`
- R2 bucket name: `muum-repo-explorer-repo-snapshots`

Apply migrations locally:

```bash
npm run db:migrate:local
```

Apply migrations remotely after the Cloudflare account resources exist:

```bash
npm run db:migrate:remote
```

Run the Pages Functions target locally:

```bash
npm run dev:cloudflare
```

## Clerk Setup

Set the publishable key for the Next.js build:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_or_pk_live
```

Set these runtime values for Pages Functions in Cloudflare Pages environment variables or `.dev.vars` for local Wrangler runs:

```bash
CLERK_JWKS_URL=https://your-clerk-domain/.well-known/jwks.json
CLERK_JWT_ISSUER=https://your-clerk-domain
CLERK_JWT_AUDIENCE=
```

`CLERK_JWT_AUDIENCE` is optional. Leave it unset unless the Clerk JWT template uses an audience claim.
