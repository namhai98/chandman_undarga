import express from "express";
import cors from "cors";
import helmet from "helmet";
import { giftOrders } from "./routes/giftOrders.js";
import { pool } from "./db.js";

/**
 * Builds the Express app. Kept free of `listen()` so it can be reused both by
 * the local server (`index.js`) and the Netlify serverless function.
 */
export function createApp() {
  const app = express();

  const allowedOrigins = (process.env.CORS_ORIGIN ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  app.use(helmet());
  app.use(
    cors({
      origin(origin, cb) {
        // Allow same-origin / curl (no Origin header). When CORS_ORIGIN is unset
        // (e.g. the site and API share a domain on Netlify) allow everything;
        // otherwise restrict to the configured list.
        if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
          return cb(null, true);
        }
        return cb(new Error(`Origin ${origin} not allowed by CORS`));
      },
    }),
  );
  app.use(express.json({ limit: "16kb" }));

  app.get("/api/health", async (_req, res) => {
    try {
      await pool.query("SELECT 1");
      res.json({ ok: true, db: "up" });
    } catch {
      res.status(503).json({ ok: false, db: "down" });
    }
  });

  app.use("/api/gift-orders", giftOrders);

  app.use((_req, res) => res.status(404).json({ error: "not_found" }));

  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    console.error("[api] error:", err.message);
    res.status(500).json({ error: "server_error" });
  });

  return app;
}
