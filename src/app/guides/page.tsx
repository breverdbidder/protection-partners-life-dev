import type { Metadata } from "next";
import Link from "next/link";
import { BASE_URL } from "@/lib/site-config";
import { jsonLd, pageSchema } from "@/lib/schema";
import { guides } from "@/content/guides";

const TITLE = "Life Insurance Guides";
const DESCRIPTION =
  "Plain-English guides to final expense, term, and whole life insurance — how each works, what it costs, and how to choose the right coverage for your family.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            pageSchema({
              type: "collection",
              pageUrl: `${BASE_URL}/guides`,
              title: TITLE,
              description: DESCRIPTION,
              crumbs: [
                { name: "Home", item: `${BASE_URL}/` },
                { name: "Guides", item: `${BASE_URL}/guides` },
              ],
              items: guides.map((g) => ({
                name: g.title,
                url: `${BASE_URL}/guides/${g.slug}`,
              })),
            }),
          ),
        }}
      />

      <div className="max-w-2xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-navy">
          Life insurance guides
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Everything here is written to help you make a confident decision — how each type of
          coverage works, what it really costs, and which questions to ask before you buy.
          There are no teaser rates and no fear-based sales copy: just the same explanations
          our agents give on the phone, written down so you can research at your own pace and
          share them with the family members who are part of the decision.
        </p>
      </div>

      <section className="mt-10 max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-navy">Where to start</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          If you&apos;re shopping for a parent or planning for your own final expenses, start
          with the final expense guide — it explains how simplified underwriting works, why
          there&apos;s no medical exam, and how to avoid the two-year waiting period that
          catches many buyers by surprise. If you&apos;re protecting a young family, a
          mortgage, or an income, the term vs. whole life comparison walks through the
          decision most people actually face: how long the coverage needs to last and what
          each structure costs.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Already know what you need and just want to sanity-check the price? The cost guide
          publishes honest rate ranges by age and gender, explains exactly which factors move
          your premium, and shows where shopping multiple carriers saves the most. Every guide
          is written by licensed agents, reviewed for accuracy, and kept free of the
          scare-tactic framing this industry is known for.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          A note on how to read anything in this space, including our own material: the two
          details that separate a good policy from a bad one are whether the full benefit
          applies from day one and whether the premium is guaranteed never to rise. Every guide
          here tells you how to verify both before you sign, because those two questions are
          where nearly all of the industry&apos;s fine print lives.
        </p>
      </section>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {guides.map((guide) => (
          <div key={guide.slug} className="flex flex-col rounded-xl border bg-card p-5">
            <span className="w-fit rounded-md bg-secondary px-2 py-0.5 text-xs font-medium">
              {guide.topic}
            </span>
            <h2 className="mt-3 text-xl font-bold text-navy">
              <Link href={`/guides/${guide.slug}`} className="hover:text-primary">
                {guide.title}
              </Link>
            </h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{guide.description}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{guide.readMinutes} min read</span>
              <Link
                href={`/guides/${guide.slug}`}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Read the guide →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-navy">
          Terms you&apos;ll see in every guide
        </h2>
        <dl className="mt-5 space-y-4">
          <div>
            <dt className="font-semibold text-navy">Premium</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
              The amount you pay for the policy, usually monthly. On whole life and final
              expense policies the premium is fixed for life at the age you buy.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-navy">Death benefit</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
              The tax-free cash amount paid to your beneficiary when you pass away. This is the
              &ldquo;coverage amount&rdquo; you choose when you buy.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-navy">Beneficiary</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
              The person (or people) you name to receive the death benefit. You can change
              beneficiaries at any time at no cost.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-navy">Simplified issue</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Underwriting based on health questions instead of a medical exam. Most final
              expense policies and a growing share of term policies are issued this way.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-navy">Waiting period (graded benefit)</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
              A window — typically two years — during which some policies pay a reduced benefit
              for natural-cause death. Policies with health questions usually have no waiting
              period; guaranteed-acceptance policies usually do.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-navy">Rider</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
              An optional add-on that extends what a policy covers — accelerated death benefit
              riders (early payout for terminal illness) are common and often free; others,
              like child riders or accidental death riders, carry a small extra premium.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-navy">Free-look period</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
              A state-mandated window after your policy is delivered — usually 10 to 30 days —
              during which you can cancel for any reason and receive a full refund of premiums
              paid.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-navy">Underwriting class</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
              The risk category a carrier assigns your application — preferred, standard,
              graded, or guaranteed issue. The class, not the advertised rate, determines what
              you actually pay, and different carriers frequently assign the same person
              different classes.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-navy">Cash value</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
              A savings component inside whole life policies that grows tax-deferred and can be
              borrowed against while you&apos;re alive. Term policies have no cash value —
              that&apos;s part of why they cost less.
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-navy">
          Which guide answers your question?
        </h2>
        <ul className="mt-5 space-y-3 text-muted-foreground">
          <li>
            <strong className="text-navy">&ldquo;Will they even take me with my health?&rdquo;</strong>{" "}
            — The final expense guide covers simplified underwriting and which conditions still
            qualify for first-day coverage.
          </li>
          <li>
            <strong className="text-navy">&ldquo;Why is one quote double the other?&rdquo;</strong>{" "}
            — The cost guide explains underwriting classes, the five factors that set your
            premium, and why identical coverage prices so differently between carriers.
          </li>
          <li>
            <strong className="text-navy">&ldquo;Is term a waste if I outlive it?&rdquo;</strong>{" "}
            — The term vs. whole life guide reframes that question around what the coverage is
            for, and covers the conversion option that keeps your choices open.
          </li>
          <li>
            <strong className="text-navy">&ldquo;How much coverage does a funeral need?&rdquo;</strong>{" "}
            — Both the final expense and cost guides publish current funeral and cremation cost
            ranges so you can size a policy against real numbers instead of a round guess.
          </li>
          <li>
            <strong className="text-navy">&ldquo;What&apos;s the catch with TV/mail offers?&rdquo;</strong>{" "}
            — The final expense guide&apos;s buying-mistakes section explains
            guaranteed-acceptance waiting periods and decreasing-benefit policies in plain
            terms, including why the friendly celebrity pitch usually costs more per dollar of
            coverage than a two-minute comparison would.
          </li>
        </ul>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-navy">How we write these guides</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Every guide is drafted and fact-checked by licensed agents who quote these policies
          daily, not by a content farm. Price ranges come from the carrier rate tables we
          actually use, we name the trade-offs of each product rather than steering every
          reader to the most profitable one, and we update each guide when carrier
          underwriting or pricing changes materially. Where an answer genuinely depends on
          your health or state, we say so instead of pretending one number fits everyone.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          If a question isn&apos;t covered here, call the number at the top of the page or
          start a quote and ask your agent directly — the conversation is free either way, and
          the questions readers ask are where the next guide comes from. Coming soon: guides on
          life insurance with diabetes, coverage for parents and grandparents, and how to read
          a policy illustration without an actuary on speed dial.
        </p>
      </section>
    </div>
  );
}
