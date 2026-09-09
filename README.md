# ЧАНДМАНЬ УНДАРГА — Энергийн төв

Premium wellness & energy-center presentation site.

- **client/** — React 19 + Vite + Tailwind v4 marketing site
- **server/** — Express + PostgreSQL API that records gift-card purchase requests

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
