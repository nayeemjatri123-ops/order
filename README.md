# Fashion Factory Premium Bootcut Landing Page

Next.js landing page for Fashion Factory's premium bootcut pant campaign.

## Stack
- Next.js + React + TypeScript
- Supabase for order persistence
- Vercel for deployment

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` before testing order submission.

## Product assets

Place the real product photos under `public/images/` and replace the placeholder image blocks in `app/page.tsx` with the provided assets.

## Order flow

The order form calculates the selected deal automatically and posts to `/api/orders`. The API writes to `public.orders` using the Supabase service role key server-side.
