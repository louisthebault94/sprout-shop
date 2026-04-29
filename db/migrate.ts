/**
 * Non-destructive schema apply. Runs every CREATE / CREATE INDEX in
 * schema.sql (all marked IF NOT EXISTS) so it's safe to re-run.
 *
 * Run with: npx tsx db/migrate.ts
 */

import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}
const sql = neon(url);

async function main() {
  const schema = readFileSync(join(__dirname, "schema.sql"), "utf-8");
  const stripped = schema
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n");
  const statements = stripped
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  for (const stmt of statements) {
    await sql.query(stmt);
  }
  console.log(`Applied ${statements.length} statement(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
