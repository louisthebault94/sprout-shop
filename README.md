# Sprout

Australian primary teaching resource shop. Worksheets, lesson plans, and activity packs aligned to the Australian Curriculum v9.0.

## Stack

- **Next.js 15** (App Router) on **Vercel**
- **Neon** Postgres for data
- **Vercel Blob** for PDFs
- **Clerk** for auth
- **Stripe** for payments

## Local

```bash
npm install
vercel env pull .env.local   # pulls Neon, Clerk, Stripe, Blob keys
npm run dev
```

## Database

```bash
npx tsx db/setup.ts          # applies schema and re-seeds the catalogue
```

`db/setup.ts` is destructive — it truncates `resources` (and `purchases` via cascade) before re-seeding. Use only in dev / before launch.

## Deploy

Pushes to `main` auto-deploy to production via Vercel.

- Production: https://sprout-shop-delta.vercel.app
- Project: https://vercel.com/louis-thebaults-projects/sprout-shop
