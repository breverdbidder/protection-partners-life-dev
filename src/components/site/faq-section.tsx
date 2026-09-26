"use client";

import type { ReactNode } from "react";
import type { SchemaFaq } from "@/lib/schema";

// Adapted from the seo-site-builder skill — the construction is load-bearing SEO:
//
// 1. Native <details name="faq"> gives one-open-at-a-time accordion behavior
//    with NO state, keeping every answer in the crawlable server HTML.
// 2. It stays "use client" ON PURPOSE: a client component costs one module
//    reference in the RSC flight payload, while a server component would
//    serialize the subtree into the payload a second time.
// 3. The page's FAQPage JSON-LD must be built from the SAME faqs array passed
//    here (pass it to pageSchema()'s faqs field) so schema and visible content
//    never drift.
export default function FaqSection({
  tag = "Common Questions",
  heading,
  intro,
  faqs,
}: {
  tag?: string;
  heading: ReactNode;
  intro?: string;
  faqs: SchemaFaq[];
}) {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-14">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">{tag}</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy">{heading}</h2>
        {intro ? <p className="mt-3 text-muted-foreground">{intro}</p> : null}
      </div>

      <div className="mt-8 divide-y rounded-xl border bg-card">
        {faqs.map((faq) => (
          <details key={faq.q} name="faq" className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-navy [&::-webkit-details-marker]:hidden">
              <span>{faq.q}</span>
              <span
                className="text-xl text-primary transition-transform group-open:rotate-45"
                aria-hidden
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
