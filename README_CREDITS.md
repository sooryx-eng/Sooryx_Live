Starter notes: Auth + Credits + Stripe

Steps to complete the starter locally:

1. Install dependencies

```bash
npm install prisma @prisma/client next-auth @next-auth/prisma-adapter bcryptjs stripe
```

2. Add environment variables (example `.env`):

```
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
NEXTAUTH_SECRET=your_secret_here
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

3. Run Prisma migration / generate client:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

4. Start the dev server:

```bash
npm run dev
```

Notes:
- The `app/api/auth/[...nextauth]/route.ts` uses a Credentials provider and the Prisma adapter.
- The `app/api/credits/route.ts` contains basic atomic operations for balance updates and transaction creation.
- The Stripe webhook route expects a `checkout.session.completed` event and credits the corresponding user by email.

Next steps you might want me to do:
- Add frontend pages: `/auth/signin`, credit dashboard and top-up UI (Stripe Checkout integration).
- Add idempotency handling, tests, and admin audit UI.
