---
name: wp-next-bagels-style
description: Builds and edits Next.js Pages Router UI and WordPress-backed data in the wp-next-bagels (Mamalagels) codebase. Matches Layout/Header/Container shells, lib/api GraphQL patterns, Stripe config, and hooks conventions. Use when the user mentions wp-next-bagels, Mamalagels, this repository’s style, or asks to add pages/components/API routes consistent with existing patterns.
disable-model-invocation: true
---

# wp-next-bagels style

Project rules in `.cursor/rules/` carry day-to-day constraints. This skill adds **workflows** for common edits.

## Add a new static page (marketing / simple screen)

1. Create `pages/<route>/index.tsx` or `.js` to match sibling routes.
2. Copy structure from [`pages/checkout/index.tsx`](pages/checkout/index.tsx) or [`pages/menu/index.tsx`](pages/menu/index.tsx): import `CMS_NAME`, `getNavItems`, `Layout`, `Header`, `Container`.
3. Implement `getStaticProps` with `{ preview = false }` and `await getNavItems(preview)` if the page uses `Header`.
4. Set `Layout` `title` / `desc` using `` `${CMS_NAME} …` `` for consistency.

## Add or change WordPress / GraphQL-backed data

1. Add or adjust query strings in [`lib/queries.js`](lib/queries.js) when the query is shared.
2. Add a typed or untyped fetcher in [`lib/api.js`](lib/api.js) using the existing `fetchAPI` pattern (POST to `WORDPRESS_API_URL`).
3. Expose data through `getStaticProps` or existing client fetch (e.g. SWR + [`lib/graphqlFetch.js`](lib/graphqlFetch.js)) **only where the codebase already does for that screen**.

## Stripe amounts and checkout behavior

1. Money bounds live in [`config/index.ts`](config/index.ts) (`MIN_AMOUNT`, `MAX_AMOUNT`, `AMOUNT_STEP`, `CURRENCY`).
2. Checkout UI flows through Stripe Elements ([`pages/checkout/index.tsx`](pages/checkout/index.tsx), [`components/ElementsForm.tsx`](components/ElementsForm.tsx)); align validation and display with existing components before introducing new patterns.

## New component

1. Place files under `components/` with PascalCase names; default export the main component.
2. Use Tailwind classes like nearby components; add `*.module.css` only when matching siblings that already use CSS modules.

## New API route under `pages/api`

1. Follow method guards and JSON responses like [`pages/api/wp/index.ts`](pages/api/wp/index.ts).
2. Use default import from [`lib/fetch.ts`](lib/fetch.ts) for server-side outbound requests.

## Hooks

- Single hook file → default export (`hooks/useWindowDimensions.js`).
- Multiple hooks in one module → named exports (`hooks/useVisibility.js`).
