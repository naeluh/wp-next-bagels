# Changelog

## Unreleased: dependency upgrade, App Router, TypeScript

### Upgraded (all packages to latest)
- next 13.1 → 16.4 (Turbopack is the default for dev and build), react / react-dom 18.2 → 19.3
- tailwindcss 2.2 → 4.3, using `@tailwindcss/postcss` and CSS-first config. `tailwind.config.js` was migrated into `styles/index.css` with the official `@tailwindcss/upgrade` tool.
- react-hook-form 6 → 7, little-state-machine 4 → 5, swr 0.5 → 2, react-select 4 → 5, react-social-icons 5 → 6
- stripe 8 → 23, @stripe/stripe-js 1 → 10, @stripe/react-stripe-js 1 → 7
- typescript 4.9 → 7.0, moment 2.29 → 2.31, @types/* to latest
- react-spring 9 → `@react-spring/web` 10 (the umbrella package also pulled in konva/native/three/zdog)
- Package manager: yarn → **bun** (`bun.lock`; `yarn.lock` removed)

### Added
- Empty states: `/location-times` shows "No locations and times at this time." when WordPress returns no locations (or can't be reached), and the pickup-location picker on `/bagels` shows "No pickup locations at this time." when there are no pickup locations.

### Changed
- "Dozen" is now "Baker's Dozen" on the add button ("Add Baker's Dozen - 20.00"), the bagel picker heading, each set in the cart, checkout and success screen, and the receipt email. The name comes from the `dozen_name` ACF field on Prices (WPGraphQL `dozenName`) and falls back to "Baker's Dozen" (`DOZEN_NAME` in `lib/constants.ts`) when the field is empty. It is saved to the cart when a bagel set is added, because checkout has no pricing data. Each dozen set in those listings and in the email also reads "+ 1 from the baker" (e.g. "12 Plain bagels + 1 from the baker"). The extra line shows only while the name contains "Baker", so setting `dozen_name` to "Dozen" switches every listing back to a plain dozen.
- **Pages Router → App Router.**
  - `pages/` is replaced by `app/`. Each route is a server component that fetches WordPress data; this replaces `getStaticProps`.
  - `[slug]` uses `generateStaticParams` with `revalidate = 10`.
  - `_app` and `_document` became `app/layout.tsx`, and `404` became `not-found.tsx`.
  - API routes are now `app/api/*/route.ts` route handlers.
- **TypeScript only.** Every `.js`/`.jsx` file was converted to `.ts`/`.tsx` under `strict`. WordPress data shapes are in `lib/types.ts`, and the cart state type is in `lib/store.ts`.
- **Page titles and descriptions now render** through the App Router `metadata` API. Before, `Meta.js` returned an empty fragment, so the site had no `<title>`.
- **Fonts now load.**
  - Before, the Google Fonts `@import` came after Tailwind's base CSS, so browsers ignored it and the site fell back to Georgia and system-ui.
  - Inter and Vollkorn are now served by `next/font/google`. Vollkorn 400 upright was added so regular-weight serif text stays regular.
- Sitemap and robots.txt come from native `app/sitemap.ts` and `app/robots.ts`; `next-sitemap` and the `postbuild` step are gone.
- Stripe:
  - Removed the pinned `apiVersion: '2020-08-27'`, so the SDK's own version is used.
  - PaymentIntent creation uses `allowed_payment_method_types: ['card']`, which replaces the removed `payment_method_types`.
  - The Stripe client is created per request, so builds no longer need `STRIPE_SECRET_KEY`.
- The Stripe webhook reads the raw body with `req.text()`, replacing `micro`'s `buffer()`. The meaningless CORS wrapper is gone.
- Cart store (`createStore`) moved from `_app` to `lib/store.ts`; `<StateMachineProvider>` no longer exists in v5.
- react-hook-form v7 migration:
  - Stepper fields push their value with `setValue`, because v7 no longer reads read-only DOM inputs.
  - Constants were moved out of `defaultValues`; v7's `getValues()` would otherwise add them to bagel totals and saved selections.
  - The location and date radios keep their custom `{ label, value }` registration.
- Scroll fade-in: `react-visibility-sensor` used `findDOMNode`, which React 19 removed. `FadeInDirection` now uses its own `IntersectionObserver` (fires once, at 25% visible).
- The `modal-open` body class is now removed by Modal's effect cleanup, instead of by an effect on every page.
- The hamburger menu Tailwind plugin is now plain CSS in `styles/index.css`. Only `tham-w-8` is used.
- Tailwind 4 compatibility fixes:
  - Site-wide rules moved into `@layer utilities` so utilities still win.
  - Restored v2 behaviours: gray-200 default border colour, pointer cursor on buttons, form controls not inheriting `font-weight`.
  - The `--tw-bg-opacity` hacks became `bg-m-yellow/NN`.
  - The `.mainButton` yellow border is kept, as is the `outline-black` focus style (2px dotted).
  - `md:leading-*` was pinned where v4's `leading-*` would otherwise beat `md:text-*`.
- `next.config.js` is now `next.config.ts`:
  - `images.domains` became `remotePatterns`.
  - `images.qualities: [50, 75, 100]` was added; Next 16 only allows 75 by default.
  - The `env` block now inlines only `WORDPRESS_API_URL`. Before, it also listed secrets such as `STRIPE_SECRET_KEY`.
- `tsconfig.json`: target ES2017, `moduleResolution: bundler`. `importHelpers` and the css-modules editor plugin were removed.

### Fixed
- `/brunch-bag` crashed on load with `navItems is not defined`; the page component read the wrong prop name.
- `getNavItems` always returned `[]`, so WordPress posts flagged "Add to navigation" never reached the header.
- Brunch bag: Edit Date followed by Ok without changing the date erased the saved delivery date. The form now restores the matching select option, so the select also shows the saved date.
- Brunch bag: "Change Bagel Choices" in the limit alert threw `setTotalBagels is not a function`. The alert received a comma expression instead of its props.
- Limit alert: "Change Bagel Choices" couldn't be clicked; the gray backdrop sat on top of it. In Tailwind 2 the dialog's `transform` class created a stacking context that lifted it above the backdrop; in Tailwind 4 that class sets no transform, so the dialog is now `relative` instead.
- Hydration and DOM-nesting errors: the limit alert was wrapped in a `<p>`; it is now a `<div>`.
- `/checkout` hydration mismatch with items in the cart: the server rendered an empty cart because it can't read sessionStorage. The checkout form now renders after hydration.
- Checkout success screen: "Here is what you ordered" listed nothing. It read the live cart, which is cleared right after payment; it now shows a copy of the order saved just before the reset.
- `forwardRef render functions accept exactly two parameters` warning: `Input` was wrapped in `forwardRef` but never used the ref. It is now a plain component.
- Duplicate React key warnings: bagel lists used `String(object)` as the key; they now use the bagel name.
- `/location-times` no longer crashes on a date WordPress sends as text (e.g. "Every Saturday"): `Location` passed a string where a `Date` was expected. A location with no dates at all no longer crashes the page either; it shows with an empty date list. Unparseable and past dates are now skipped, and text dates and date-times are joined with commas in one list.
- `/bagels`: removed the pickup-date list `AddGroupsForm` built and passed to `AddDateLocation`. It was always empty and never read; the picker builds each location's dates itself.
- Removed the invalid `fixed` prop that `next/image` warned about.
- Mobile menu stayed open after tapping a link to another page, and the page couldn't scroll. The header now lives in the shared layout and keeps its state across pages, so it closes the menu on every route change.
- `/brunch-bag` showed "Brunch Bags Not Available" while `/api/bags` loaded, and kept showing it if the call failed (e.g. the receipts TLS certificate expired). The order form now always renders, as before; without bag data the date picker just has no dates. Removed two debug `console.log`s.
- `/api/bags`, `/api/brunch`, `/api/email` and `/api/wp` retry again. Without `@zeit/fetch`, one 502 from the receipts service or WordPress silently dropped the brunch booking, the receipt email or the chip-stock update for a paid order. `lib/receipts.ts` now uses the old policy: up to 5 retries on network errors, 5xx and 429 (10 ms to 13 s apart).
- `/[slug]`: a WordPress error during the 10-second refresh cached the post as a 404 until the next good refresh. A failed fetch now throws, so the last good page keeps being served; a slug WordPress doesn't know is still a 404.
- `/bagels` and `/brunch-bag` loading and error screens cover the header and footer again; they now render inside the shared layout.
- Header nav: removed `flex-3`, which did nothing in Tailwind 2 but squeezed the nav list in Tailwind 4. `/api/payment_intents` answers a malformed JSON body with 400 "Invalid JSON", as before, instead of Next's 500 page.
- Success screen: the "Please arrive on … at … to pick up your order" line never showed for orders with bagel sets (an operator-precedence bug, also on master).
- Checkout: a card error such as "Your card's expiration year is in the past." stayed on screen after the card was fixed (also on master). Errors now record which part of the form they belong to. Editing the card clears a card error, editing the name, email, phone or address clears an error from `/api/payment_intents`, and an edit elsewhere leaves the error showing.
- Footer "Buy Bagels" didn't change to "Edit Bagels" after a set was added: the cart array is updated in place, so the effect now watches its length (also on master).

### Removed
- Dead code: unused components (Alert, Avatar, CoverImage, HeroPost, PostPreview, select/*, BagelWebGl, and others), orphaned CSS modules, unused WPGraphQL queries, and `VsensorAnimate`.
- Google Analytics helper: the gtag script was never loaded, so every navigation threw `window.gtag is not a function`.
- WordPress Preview Mode (`/api/preview`, `/api/exit-preview`): it redirected to a non-existent `/posts/*` route.
- Dependencies:
  - Replaced by native features: `three`, `@react-three/*`, `@zeit/fetch` (its retry policy now lives in `lib/receipts.ts`), `unfetch`, `node-fetch`, `btoa`, `micro`, `micro-cors`, `dotenv`, `dotenv-webpack`, `focus-trap` (it was never activated), `react-visibility-sensor`, `next-sitemap`, `autoprefixer`.
  - Never imported: `react-scripts`, `skypack`, `path`, `react-datepicker`, `react-helmet`, `react-number-format`, `use-shopping-cart`, `next-absolute-url`, `date-fns`, `classnames`, `common-tags`, `typescript-plugin-css-modules`, `postcss-preset-env`, `postcss-flexbugs-fixes`.
