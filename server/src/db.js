import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL ?? "";

if (!connectionString) {
  console.warn(
    "[db] DATABASE_URL is not set — API calls that touch the database will fail. " +
      "Set it in .env locally, or in the Netlify site environment.",
  );
}

// Managed Postgres (Neon, Supabase, RDS, …) requires TLS; local Postgres usually
// does not. Enable SSL when the URL asks for it, points at a known managed host,
// or PGSSL=require is set.
const needsSsl =
  /\bsslmode=require\b/.test(connectionString) ||
  /\.(neon\.tech|supabase\.co|render\.com|railway\.app)\b/.test(connectionString) ||
  process.env.PGSSL === "require";

// Serverless (AWS Lambda under Netlify) keeps many short-lived instances, so hold
// at most one connection each; a long-running server can pool more.
const isServerless = Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);
const maxConnections = Number.parseInt(
  process.env.PG_POOL_MAX ?? (isServerless ? "1" : "10"),
  10,
);

export const pool = new Pool({
  connectionString,
  ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
  max: maxConnections,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

pool.on("error", (err) => {
  console.error("[db] unexpected pool error", err);
});

export function query(text, params) {
  return pool.query(text, params);
}
