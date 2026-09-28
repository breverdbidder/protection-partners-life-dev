# Life Insurance Agency Site Template

A production-ready Next.js template for a life insurance agency, modeled on
conversion- and content-heavy sites like Choice Mutual. Ships with a placeholder
brand ("Evergreen Life") that you can swap out by editing a single file.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · zod + react-hook-form

## What's included

- **Homepage** — hero with trust badges, sample-rates table, carrier strip,
  feature pillars, product cards, how-it-works, testimonials, comparison table,
  plain-English explainers, buyer's checklist, guides preview, FAQ, and CTA band
- **Multi-step quote funnel** (`/quote`) — product → coverage/state →
  age/gender/tobacco → contact + TCPA-style consent, validated with zod +
  react-hook-form, with `?product=` pre-selection
- **Lead capture API** (`/api/quote`) — validates the payload and forwards it to
  a webhook/CRM via `LEAD_WEBHOOK_URL`, or logs to the console in development
- **Guides section** (`/guides`) — three full-length articles plus a glossary,
  stored as typed content objects (easy to migrate to MDX or a CMS later)
- **SEO layer** — config-driven JSON-LD (`pageSchema()`, one `@graph` per page),
  crawlable `<details>` FAQ sections whose FAQPage schema derives from the same
  array the UI renders, sitemap, robots, per-page metadata
- **Build guards** — `check:titles` (titles ≤ 70 chars) and `check:ratio`
  (text-to-HTML ratio ≥ 11% on every prerendered page) run against build output

## Quick start

```bash
npm install
npm run dev
```

## Make it yours

The fastest path is the guided onboarding prompt: run `/onboard` in
[Claude Code](https://claude.com/claude-code), or paste [ONBOARDING.md](ONBOARDING.md)
into any AI coding assistant. It interviews you for your agency's details,
rewrites the brand config, creates your `.env.local`, and runs the build checks.

To do it by hand instead:

1. **Brand** — edit `src/lib/site-config.ts`: name, phone, email, hours, NPN,
   address, products, carriers. Colors live as CSS tokens at the bottom of
   `src/app/globals.css`.
2. **Environment** — create `.env.local` with `NEXT_PUBLIC_SITE_URL` (your
   production domain) and `LEAD_WEBHOOK_URL` (your CRM or webhook endpoint; the
   quote form posts JSON there via `src/app/api/quote/route.ts`, or logs to the
   console in development when unset).
3. **Content** — guides live in `src/content/guides.ts`; homepage sections in
   `src/app/page.tsx`.

### ⚠️ Before you launch

The review scores, testimonials, carrier names, and sample rates in this
template are **illustrative placeholders**. Replace them with real, verifiable
data — and never publish ratings you can't substantiate. For the same reason,
the template deliberately emits **no** `aggregateRating` in its structured data;
add one only when you have real review data behind it.

## Verification

```bash
npm run lint && npm run typecheck && npm run build && npm run check:titles && npm run check:ratio
```

## License

MIT — see [LICENSE](LICENSE).
