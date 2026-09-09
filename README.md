# ЧАНДМАНЬ УНДАРГА — Энергийн төв

Premium wellness & energy-center presentation site.

- **client/** — React 19 + Vite + Tailwind v4 marketing site
- **server/** — Express + PostgreSQL API that records gift-card purchase requests
- **netlify/functions/api.js** — the same Express app wrapped for Netlify (prod)

## Requirements

- Node.js **20+**
- PostgreSQL **13+**

## Setup

```bash
npm install                 # installs client + server workspaces
cp .env.example .env        # then edit DATABASE_URL etc.
npm run migrate             # creates the gift_orders table
```

## Develop

```bash
npm run dev                 # client on :5173, server on :3001 (Vite proxies /api)
```

Or run each side alone: `npm run dev:client` / `npm run dev:server`.

## Build

```bash
npm run build               # -> client/dist
npm run preview             # serve the production build locally
npm start                   # run the API in production mode
```

## API

| Method | Path               | Notes                                             |
| ------ | ------------------ | ------------------------------------------------- |
| GET    | `/api/health`      | DB connectivity check                            |
| POST   | `/api/gift-orders` | `{ buyerName, buyerPhone, recipient?, quantity?, message? }` |
| GET    | `/api/gift-orders` | Read-only listing — requires `x-admin-key` header |

Example:

```bash
curl -X POST http://localhost:3001/api/gift-orders \
  -H 'content-type: application/json' \
  -d '{"buyerName":"Бат","buyerPhone":"9900-0000","recipient":"Ээж","quantity":1}'
```

## Deploy to Netlify

The static site and the API ship together: Vite output is published, and the
Express app runs as a single serverless function. `netlify.toml` maps `/api/*` to
it, so the frontend keeps calling `/api/...` unchanged.

### 1. Database (Neon)

Netlify can't host Postgres, so use [Neon](https://neon.tech) (serverless PG):

- In the Netlify site: **Integrations → Neon → Enable**, then create/link a
  database. The integration sets **`DATABASE_URL`** on the site automatically
  (pooled, `sslmode=require`).
- Create the table once, from your machine, against that same URL:

  ```bash
  DATABASE_URL='<neon pooled url>' npm run migrate
  ```

### 2. Site

**Option A — connect the Git repo (recommended)**

1. Push this repo to GitHub.
2. Netlify → **Add new site → Import from Git** → pick the repo.
3. Build settings are read from `netlify.toml` (build `npm run build`, publish
   `client/dist`, functions `netlify/functions`). Just deploy.

**Option B — CLI**

```bash
npm run deploy         # npx netlify-cli deploy --build --prod
```

### 3. Environment variables (Netlify → Site config → Environment variables)

| Key            | Value                                                    |
| -------------- | ------------------------------------------------------- |
| `DATABASE_URL` | set by the Neon integration (or paste your own PG URL) |
| `ADMIN_KEY`    | any secret — required for `GET /api/gift-orders`        |
| `CORS_ORIGIN`  | leave unset (site and API are same-origin on Netlify)  |

### Local parity

`npm run dev` (Vite + Express) is the quick loop. To exercise the redirects and
the function exactly as Netlify runs them:

```bash
npm run netlify:dev
```

## Design system

| Token       | Value     |
| ----------- | --------- |
| forest      | `#245C43` |
| forest-dark | `#163D2D` |
| sage        | `#6F927B` |
| sage-soft   | `#AFC3B4` |
| cream       | `#F7F8F4` |
| ink         | `#24342B` |

Headings **Cormorant Garamond**, body **Inter** (loaded from Google Fonts in
`client/index.html`).

The photographic panels are currently image-free CSS art (`.media-art--*` in
`client/src/index.css`). Drop real photography in by replacing those rules with
`background-image: url(...)`.

## Notes

Copy is intentionally wellness-oriented and avoids medical/therapeutic claims.
