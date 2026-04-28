/**
 * One-shot script: apply schema and seed sample resources.
 * Run with: npx tsx db/setup.ts
 *
 * AU-only catalogue, no fake reviews. All resources start at rating=0,
 * review_count=0 — they only get populated when real users leave reviews.
 */

import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Run with `dotenv` or export it.");
  process.exit(1);
}

const sql = neon(url);

const SEED = [
  { id: 1,  title: "Year 3 Multiplication Worksheets",        subject: "Mathematics", type: "Worksheets",     yearGroup: "Year 3",     price: 4.50, state: "default", pageCount: 20, isNew: false },
  { id: 2,  title: "Phonics Flashcard Set — Phase 3",         subject: "English",     type: "Flashcards",     yearGroup: "Year 1",     price: 0,    state: "free",    pageCount: 36, isNew: true  },
  { id: 3,  title: "Living Things Unit — Full Pack",          subject: "Science",     type: "Activity Pack",  yearGroup: "Year 2",     price: 7.00, state: "default", pageCount: 28, isNew: false },
  { id: 4,  title: "Visual Arts Lesson Plans Years 4–6",      subject: "The Arts",    type: "Lesson Plans",   yearGroup: "Year 4–6",   price: 5.00, state: "default", pageCount: 18, isNew: false },
  { id: 5,  title: "Reading Comprehension — NAPLAN Style",    subject: "English",     type: "Assessments",    yearGroup: "Year 5–6",   price: 6.00, state: "default", pageCount: 16, isNew: true  },
  { id: 6,  title: "Australian Communities — HASS Unit",      subject: "HASS",        type: "Activity Pack",  yearGroup: "Year 3–4",   price: 5.50, state: "default", pageCount: 24, isNew: false },
  { id: 7,  title: "Fractions & Decimals — Digital Slides",   subject: "Mathematics", type: "Digital Slides", yearGroup: "Year 4",     price: 4.00, state: "default", pageCount: 32, isNew: false },
  { id: 8,  title: "Persuasive Writing Scaffold Pack",        subject: "English",     type: "Worksheets",     yearGroup: "Year 5–6",   price: 3.50, state: "default", pageCount: 12, isNew: false },
  { id: 9,  title: "Plants & Growth Science Journal",         subject: "Science",     type: "Worksheets",     yearGroup: "Year 1–2",   price: 0,    state: "free",    pageCount: 14, isNew: true  },
  { id: 10, title: "Wellbeing & Resilience Activities",       subject: "HPE",         type: "Activity Pack",  yearGroup: "Year 1–3",   price: 4.00, state: "default", pageCount: 20, isNew: false },
  { id: 11, title: "Addition & Subtraction Fact Fluency Cards", subject: "Mathematics", type: "Flashcards",   yearGroup: "Year 1–2",   price: 2.50, state: "default", pageCount: 48, isNew: false },
  { id: 12, title: "Design Thinking — Technologies Unit",     subject: "Technologies",type: "Lesson Plans",   yearGroup: "Year 3–4",   price: 5.00, state: "default", pageCount: 22, isNew: true  },
  { id: 13, title: "Foundation Literacy — Letter Formation Pack", subject: "English", type: "Worksheets",     yearGroup: "Foundation", price: 0,    state: "free",    pageCount: 30, isNew: false },
  { id: 14, title: "Geography of Australia — Year 5–6 HASS",  subject: "HASS",        type: "Activity Pack",  yearGroup: "Year 5–6",   price: 6.50, state: "default", pageCount: 26, isNew: false },
  { id: 15, title: "Movement & Body Awareness — Foundation HPE", subject: "HPE",      type: "Lesson Plans",   yearGroup: "Foundation", price: 3.00, state: "default", pageCount: 16, isNew: true  },
];

async function main() {
  console.log("Applying schema…");
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
  console.log(`  applied ${statements.length} statement(s)`);

  console.log("Seeding resources…");
  await sql`TRUNCATE resources RESTART IDENTITY CASCADE`;
  for (const r of SEED) {
    await sql`
      INSERT INTO resources (id, title, subject, type, year_group, price, rating, review_count, state, page_count, is_new, curriculum)
      VALUES (${r.id}, ${r.title}, ${r.subject}, ${r.type}, ${r.yearGroup}, ${r.price}, 0, 0, ${r.state}, ${r.pageCount}, ${r.isNew}, 'AU')
    `;
  }
  await sql.query(`SELECT setval('resources_id_seq', (SELECT MAX(id) FROM resources))`);
  console.log(`  seeded ${SEED.length} resources (rating=0, reviews=0 across the board)`);

  const [{ count }] = (await sql`SELECT COUNT(*)::int AS count FROM resources`) as { count: number }[];
  console.log(`Done. resources table now has ${count} rows.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
