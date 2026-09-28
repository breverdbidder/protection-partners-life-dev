# Onboarding prompt

This file is a prompt for your AI coding assistant. In Claude Code, run
`/onboard`; in any other assistant, paste this whole file and say "follow
these instructions." You can also follow the steps by hand.

---

You are onboarding a new owner of this life insurance agency site template.
Everything brand-specific lives in `src/lib/site-config.ts` and CSS tokens at
the bottom of `src/app/globals.css`; secrets and deploy config live in
`.env.local` (gitignored, created in step 2). Work through the steps below in
order, asking the user for one group of answers at a time — don't dump every
question at once.

## 1. Collect the agency's details

Ask for, then apply to `src/lib/site-config.ts`:

- Agency name, legal entity name, and tagline
- Phone number (update both `display` and `tel` formats)
- Contact email and business hours
- National Producer Number (NPN)
- Address (city, state, country)
- Which products they sell — keep, edit, or remove the three placeholder
  products (final expense, term life, whole life)
- Carrier names they actually work with (replace the fictional placeholder list)

Also update `description` and `tagline` to match their positioning, and offer
to adjust the brand colors (CSS tokens at the bottom of `src/app/globals.css`).

## 2. Create `.env.local`

Create a `.env.local` file at the repo root (it is gitignored — never commit
it) with:

```bash
# Public base URL of the deployed site (used for metadata + JSON-LD).
NEXT_PUBLIC_SITE_URL=https://www.example.com

# Where quote-form leads are POSTed as JSON (CRM endpoint or webhook).
# Leave unset in development to log leads to the server console instead.
LEAD_WEBHOOK_URL=
```

Ask the user for their production domain and set `NEXT_PUBLIC_SITE_URL`. Ask
whether they have a CRM or webhook endpoint for leads; if yes, set
`LEAD_WEBHOOK_URL`, otherwise leave it empty (leads log to the console in
development). The lead payload shape is defined in `src/lib/quote-schema.ts`
and posted by `src/app/api/quote/route.ts`.

## 3. Compliance check — do not skip

Warn the user explicitly:

- The review scores, testimonials, and sample rates in this template are
  **illustrative placeholders**. They must be replaced with real, verifiable
  data before launch — publishing unsubstantiated ratings or testimonials can
  violate insurance advertising regulations.
- The template intentionally emits no `aggregateRating` in structured data
  (see `src/lib/schema.ts`); only add one backed by real review data.
- The quote form includes TCPA-style consent language — they should have their
  compliance counsel review it for their state(s).

Replace the placeholder testimonials and review stats now if the user has real
ones; otherwise leave the placeholders and record a launch-blocker TODO the
user acknowledges.

## 4. Verify

Run and make sure everything passes:

```bash
npm run lint && npm run typecheck && npm run build && npm run check:titles && npm run check:ratio
```

`check:titles` enforces page titles ≤ 70 chars and `check:ratio` enforces a
text-to-HTML ratio ≥ 11% on every prerendered page — if a brand edit broke
one, fix the page rather than the check.

Finish by summarizing what was changed and what (if anything) remains as a
launch blocker.
