import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { pool } from "./db.js";

const schemaPath = fileURLToPath(new URL("./schema.sql", import.meta.url));

async function migrate() {
  const sql = await readFile(schemaPath, "utf8");
  await pool.query(sql);
  console.log("[migrate] schema applied");
  await pool.end();
}

migrate().catch((err) => {
  console.error("[migrate] failed:", err.message);
  process.exit(1);
});
