# Mămălagel's Bagels — mamalagels.com

Ordering site for Mămălagel's Bagels (Youngstown, OH). Customers pick a pickup
location/date, build dozen / half-dozen bagel sets and bagel-chip orders, or
order delivered brunch bags, then pay with Stripe. Content (bagels, locations,
prices, home page copy) lives in a headless WordPress (WPGraphQL). The dozen
name (add button, picker heading, cart, checkout, receipt email) comes from the
`dozen_name` ACF field on Prices; it defaults to "Baker's Dozen" when the field is empty. While
the name contains "Baker", each dozen set also lists "+ 1 from the baker"; set it to "Dozen" to drop that.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript 7** (strict, no JS files)
- **Tailwind CSS 4** (CSS-first config in `styles/index.css`, `@tailwindcss/postcss`)
- **react-hook-form 7** for order forms, **little-state-machine 5** for the cart (persisted to `sessionStorage`, which the server cannot read: render cart-dependent markup after mount, as `Header`, `FooterLinks` and `ElementsForm` do, or hydration fails)
- **SWR 2** for client-side WordPress fetches on `/bagels` and `/brunch-bag`
- **Stripe** (`stripe` 23 server SDK, `@stripe/react-stripe-js` 7 Card Element)
- **@react-spring/web 10** for the fade-in cards, **react-select 5**, **react-social-icons 6**, **moment**
- Fonts: Inter + Vollkorn via `next/font/google` (self-hosted at build)
- Package manager: **bun**

## Getting started

```bash
bun install
# create .env.local with the variables below
bun run dev                        # http://localhost:3000
bun run build && bun run start     # production build (includes the TypeScript check)
```

### Environment variables (`.env.local` / Vercel)

| Name | Used by | Notes |
| --- | --- | --- |
| `WORDPRESS_API_URL` | `lib/api.ts` (server), `lib/graphqlFetch.ts` (browser) | WPGraphQL endpoint. Inlined into the client bundle via `next.config.ts`. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `utils/get-stripejs.ts` | Stripe publishable key. |
| `STRIPE_SECRET_KEY` | `app/api/payment_intents`, `app/api/webhooks` | Read per request, so builds don't need it. |
| `STRIPE_WEBHOOK_SECRET` | `app/api/webhooks` | Signing secret for the Stripe webhook. |
| `USER`, `PASS` | `app/api/wp`, `app/api/brunch` | WordPress basic-auth credentials for updating bagel-chip stock. `USER` is also your shell's login name, so set it explicitly in the deploy environment. |

## Project layout

```
app/
  layout.tsx            html shell, fonts, Header (WP nav items) + Footer, default metadata
  page.tsx              home (featured bagel + definition from WP)
  bagels/, brunch-bag/  order flows (client components fetch live stock with SWR)
  menu/, location-times/, special-request/, checkout/
  [slug]/page.tsx       WordPress posts (ISR, revalidate 10s)
  not-found.tsx
  sitemap.ts, robots.ts native sitemap/robots (replaces next-sitemap)
  api/*/route.ts        bags, brunch, email, wp (proxies to receipts.mamalagels.com / WP
                        through lib/receipts.ts, which retries network errors, 5xx and 429),
                        payment_intents + webhooks (Stripe)
components/             UI; files with hooks/handlers are 'use client'
lib/
  api.ts                server-side WPGraphQL queries
  graphqlFetch.ts       client-side WPGraphQL fetch (SWR)
  store.ts              little-state-machine store + GlobalState type
  updateAction.ts       the single store action (imports store.ts)
  types.ts              WordPress data shapes
  processDates.ts, processBrunchBags.ts   brunch-bag delivery-date logic
styles/index.css        Tailwind 4 entry: @theme tokens, compat base rules, hamburger menu CSS,
                        site-wide custom rules (in @layer utilities)
```

## Notes

- **Tailwind 4 cascade.** Site-wide custom rules in `styles/index.css` sit inside `@layer utilities`
  so that utilities like `font-black` still beat element rules like `p { font-weight: 500 }`, as in
  Tailwind 2. CSS modules that use `@apply` start with `@reference "../styles/index.css";`.
- **Image qualities.** Next 16 only allows `quality` values that are listed in `images.qualities`
  in `next.config.ts` (currently 50, 75, 100).
- **Cart state.** `useStateMachine({ actions: { updateAction } })`. The store is created when
  `lib/updateAction.ts` is first imported.
- **Empty states.** `/location-times` and the `/bagels` pickup-location picker show a "no locations…" message instead of an empty grid/list when WordPress has none.
- `receipts.mamalagels.com` (bags/brunch/email endpoints) is an external service. If its TLS
  certificate is expired, `/api/bags` returns 400/500 and the brunch-bag date picker has no dates.
