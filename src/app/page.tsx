import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Compass, FileCheck2, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import TrustBadges from "@/components/site/trust-badges";
import FaqSection from "@/components/site/faq-section";
import { siteConfig, BASE_URL } from "@/lib/site-config";
import { jsonLd, pageSchema, type SchemaFaq } from "@/lib/schema";
import { guides } from "@/content/guides";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Compare Life Insurance Quotes in 60 Seconds`,
  description:
    "Compare final expense, term, and whole life insurance quotes from top-rated carriers in under 60 seconds. Independent agents, honest advice, no pressure.",
};

// Placeholder sample rates — illustrative only, replace with real carrier quotes.
const sampleRates = [
  { product: "Final Expense", profile: "Female, 65, non-tobacco", coverage: "$10,000", rate: "$41/mo" },
  { product: "Final Expense", profile: "Male, 70, non-tobacco", coverage: "$15,000", rate: "$94/mo" },
  { product: "Term Life (20yr)", profile: "Female, 35, non-tobacco", coverage: "$500,000", rate: "$28/mo" },
  { product: "Term Life (20yr)", profile: "Male, 45, non-tobacco", coverage: "$250,000", rate: "$39/mo" },
  { product: "Whole Life", profile: "Female, 50, non-tobacco", coverage: "$50,000", rate: "$86/mo" },
  { product: "Whole Life", profile: "Male, 40, non-tobacco", coverage: "$100,000", rate: "$118/mo" },
];

const pillars = [
  {
    icon: Clock,
    title: "Instant Quotes",
    body: "Compare real prices from multiple carriers in under a minute — no phone call required to see numbers, and no games where the advertised rate vanishes once you apply.",
  },
  {
    icon: Sparkles,
    title: "Hassle-Free Service",
    body: "One short application, handled by us from submission through approval. No repeated paperwork, no being passed between departments, no chasing carriers for status updates.",
  },
  {
    icon: FileCheck2,
    title: "Policy Transparency",
    body: "We show you exactly what each policy covers, what it excludes, and any waiting periods — before you apply, in writing, so there are no surprises at claim time.",
  },
  {
    icon: Compass,
    title: "Expert Guidance",
    body: "Licensed, salary-based agents who recommend what fits your budget and health — not what pays the biggest commission. If keeping your current policy is right, we say so.",
  },
];

// Placeholder testimonials — replace with real, attributed customer reviews before launch.
const testimonials = [
  {
    name: "Margaret T.",
    source: "Trustpilot",
    text: "My agent compared six companies and found me $15,000 of coverage for less than I was quoted elsewhere for $10,000. The whole thing took one phone call.",
  },
  {
    name: "Robert D.",
    source: "Google",
    text: "I'd been declined twice because of my diabetes. They knew exactly which carrier would take my situation and got me covered with no waiting period.",
  },
  {
    name: "Linda S.",
    source: "Trustpilot",
    text: "No pressure at all. They explained the difference between the policies in plain English and let me decide. That's rare in this business.",
  },
  {
    name: "James W.",
    source: "Google",
    text: "Set up a term policy for me and a final expense policy for my mother in the same week. Clear pricing, fast approvals, kind people.",
  },
  {
    name: "Dorothy K.",
    source: "Facebook",
    text: "I was worried about being talked into something expensive. Instead they moved me to a cheaper policy with the same coverage. Honest company.",
  },
  {
    name: "Frank M.",
    source: "Trustpilot",
    text: "From quote to approved policy in three days. They handled the carrier paperwork and called me when it was done. Couldn't have been easier.",
  },
];

const comparisonRows: { label: string; agency: boolean; carrier: boolean; us: boolean }[] = [
  { label: "Compare policies from many carriers", agency: false, carrier: false, us: true },
  { label: "Instant online quotes", agency: false, carrier: true, us: true },
  { label: "Salary-based (non-commission) advisors", agency: false, carrier: false, us: true },
  { label: "Help with any carrier's claims paperwork", agency: true, carrier: false, us: true },
  { label: "No pressure to buy on the first call", agency: false, carrier: false, us: true },
];

const howItWorks = [
  {
    step: "1",
    title: "Tell us what you need",
    body: "Answer a few quick questions online or over the phone: the type of coverage you're interested in, how much protection you want, your age, and a little about your health. It takes about a minute, and nothing is submitted to any insurance company at this stage — you're just telling us what to shop for.",
  },
  {
    step: "2",
    title: "We compare the market for you",
    body: "Underwriting is where prices diverge: one carrier penalizes controlled diabetes while another barely notices it; one adds 60% for past tobacco use while another only asks about the last 12 months. We know each carrier's niches, so we match your profile to the companies that will price it most favorably and bring you the genuine best offers side by side.",
  },
  {
    step: "3",
    title: "Apply on your terms",
    body: "When you're ready — and only then — we handle the application with the carrier you choose, schedule any phone interview, and track the approval. Most simplified-issue policies are approved within days. If your situation changes later, we re-shop your coverage for free, because we work for you rather than any single insurer.",
  },
];

const benefits = [
  "Coverage amounts from $2,000 final expense policies to $2 million+ in term protection.",
  "Options for nearly every health situation, including diabetes, heart history, and COPD.",
  "First-day full coverage available for most applicants — no waiting period.",
  "Rates locked in at your current age; whole life and final expense premiums never rise.",
  "Death benefits are paid to your beneficiary tax-free, usually within 24–48 hours of a claim.",
  "No-exam application options with health questions only, completed by phone or online.",
  "Free annual policy reviews to make sure your coverage still matches your rates and needs.",
  "Licensed agents in your state who explain exclusions and waiting periods before you sign.",
  "No fees for our service — ever. You pay only the carrier's premium, never a markup.",
  "Cancel anytime; every policy includes a free-look period with a full refund by law.",
];

const homeFaqs: SchemaFaq[] = [
  {
    q: "How do I get a life insurance quote?",
    a: "Answer a few questions about the coverage you want, your age, and your health — it takes about 60 seconds. We compare rates across our carrier partners and a licensed agent delivers your personalized quotes by phone or email, whichever you prefer.",
  },
  {
    q: "Does getting a quote cost anything or commit me to buying?",
    a: "No. Quotes are free, there's no obligation, and no payment information is collected at any point in the quote process. You only pay a premium if you choose a policy, complete the application, and the carrier issues your coverage.",
  },
  {
    q: "Do I need a medical exam to get life insurance?",
    a: "Not always. Final expense policies and many term and whole life policies use simplified underwriting with health questions only — no needles, no clinic visit. Larger coverage amounts (typically $500,000 and up) may involve an exam, which usually earns you a meaningfully lower rate in exchange.",
  },
  {
    q: "Why use an independent agency instead of going directly to an insurer?",
    a: "A single insurer can only sell you its own products at its own prices, and its agents are paid to do exactly that. An independent agency compares many carriers for your exact age and health profile, which routinely saves 30% or more for identical coverage — especially if you have any health history at all.",
  },
  {
    q: "Can I get coverage if I've been declined before?",
    a: "Very often, yes. A decline from one carrier says more about that carrier's underwriting rules than about your insurability. Different companies treat the same condition very differently, and part of our job is knowing which carrier accepts which conditions — including graded-benefit and guaranteed-issue options when needed.",
  },
  {
    q: "How much life insurance do I actually need?",
    a: "For income protection, a common starting point is 10–12 times your annual income, adjusted for your mortgage and debts. For final expenses, $10,000–$20,000 covers a median funeral, burial or cremation, and remaining bills. An agent can walk you through the math for your situation in a few minutes.",
  },
  {
    q: "How fast can a policy be in force?",
    a: "Simplified-issue final expense and whole life policies are often approved the same week you apply, sometimes the same day. Fully underwritten term policies with an exam typically take three to six weeks; many carriers now offer accelerated underwriting that skips the exam for qualified applicants and approves in days.",
  },
  {
    q: "What happens to my quote information?",
    a: "It goes to our licensed agents — and nowhere else. We don't sell or share your information with lead brokers, and you won't get calls from a dozen companies. One agency, one point of contact, until you tell us you're done.",
  },
  {
    q: "Can I buy life insurance for a parent or spouse?",
    a: "Yes, with their consent and signature on the application — a very common arrangement for final expense coverage. You can be the policy owner who pays the premium and the beneficiary who receives the benefit, as long as the insured person participates in the application and any phone interview.",
  },
  {
    q: "What if I already have a policy — can you review it?",
    a: "Bring it. A quick review tells you whether today's market beats what you're paying, whether your coverage amount still fits, and whether any riders you're paying for are worth keeping. Sometimes the answer is 'keep exactly what you have' — and we'll tell you that, because replacing a good policy with a worse one helps no one.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            pageSchema({
              type: "page",
              pageUrl: `${BASE_URL}/`,
              title: `${siteConfig.name} | Compare Life Insurance Quotes in 60 Seconds`,
              description: siteConfig.description,
              crumbs: [{ name: "Home", item: `${BASE_URL}/` }],
              faqs: homeFaqs,
            }),
          ),
        }}
      />

      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              Independent agency · {siteConfig.carriers.length}+ carrier partners
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              Pinpoint the right life insurance policy for your family
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Compare final expense, term, and whole life quotes from top-rated carriers in
              under 60 seconds — with honest guidance from licensed agents who don&apos;t work
              on commission.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full font-semibold sm:w-auto">
                <Link href="/quote">
                  See Instant Quotes <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full font-semibold sm:w-auto">
                <a href={`tel:${siteConfig.phone.tel}`}>
                  <Phone className="size-4" aria-hidden /> {siteConfig.phone.display}
                </a>
              </Button>
            </div>
            <TrustBadges className="mt-8 justify-center" />
          </div>
        </div>
      </section>

      {/* Sample rates */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-3xl font-bold tracking-tight text-navy">
          Real coverage, real budgets
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
          Illustrative monthly rates for common situations, so you can see the ballpark before
          you share a single detail. Your quotes are personalized to your age, state, and
          health — and often come in below the figures here once the right carrier is matched
          to your profile.
        </p>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] border-separate border-spacing-0 overflow-hidden rounded-xl border text-sm">
            <thead>
              <tr className="bg-navy text-left text-white">
                <th className="px-4 py-3 font-semibold">Policy type</th>
                <th className="px-4 py-3 font-semibold">Applicant</th>
                <th className="px-4 py-3 font-semibold">Coverage</th>
                <th className="px-4 py-3 text-right font-semibold">Monthly rate</th>
              </tr>
            </thead>
            <tbody>
              {sampleRates.map((sample, i) => (
                <tr key={`${sample.product}-${sample.profile}`} className={i % 2 ? "bg-muted/50" : "bg-card"}>
                  <td className="border-t px-4 py-3 font-medium text-navy">{sample.product}</td>
                  <td className="border-t px-4 py-3 text-muted-foreground">{sample.profile}</td>
                  <td className="border-t px-4 py-3 text-muted-foreground">{sample.coverage}</td>
                  <td className="border-t px-4 py-3 text-right text-lg font-bold text-navy">{sample.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Sample rates are illustrative, based on non-tobacco applicants in good health, and
          vary by carrier, state, and underwriting class. Your quote reflects your exact
          situation.
        </p>
      </section>

      {/* Carrier strip */}
      <section className="border-y bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            We compare policies from carriers including
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground">
            Each carrier prices age, health, and tobacco use differently, which is exactly why
            comparing them matters: the cheapest company for a 50-year-old runner is rarely the
            cheapest for a 72-year-old managing diabetes.
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {siteConfig.carriers.map((carrier) => (
              <li key={carrier} className="text-lg font-semibold tracking-tight text-navy/60">
                {carrier}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Four pillars */}
      <section id="why-us" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14">
        <h2 className="text-center text-3xl font-bold tracking-tight text-navy">
          Why families choose {siteConfig.name}
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
                <pillar.icon className="size-6 text-primary" aria-hidden />
              </div>
              <h3 className="mt-4 font-semibold text-navy">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="scroll-mt-20 border-t bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-center text-3xl font-bold tracking-tight text-navy">
            Coverage options
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
            Three ways to protect the people you love — we&apos;ll help you pick the right one,
            and if your situation calls for a mix of two, we&apos;ll price the combination so
            you can see the total before deciding anything.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {siteConfig.products.map((product) => (
              <Card key={product.slug} className="flex flex-col">
                <CardContent className="flex flex-1 flex-col pt-5">
                  <h3 className="text-xl font-bold text-navy">{product.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
                  <ul className="mt-4 space-y-2">
                    {product.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm">
                        <span className="font-bold text-primary" aria-hidden>
                          ✓
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-6 w-full font-semibold">
                    <Link href={`/quote?product=${product.slug}`}>
                      Get {product.shortName} Quotes
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-3xl font-bold tracking-tight text-navy">
          How {siteConfig.name} works
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
          From first question to in-force policy, here&apos;s exactly what happens — and what
          never does (pressure, spam calls, surprise fees).
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {howItWorks.map((item) => (
            <div key={item.step}>
              <div className="flex size-10 items-center justify-center rounded-full bg-navy text-lg font-bold text-white">
                {item.step}
              </div>
              <h3 className="mt-4 text-lg font-bold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials (placeholder reviews — replace before launch) */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-3xl font-bold tracking-tight text-navy">
          What our clients say
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
          The pattern in our reviews isn&apos;t an accident: people expect pressure and get a
          comparison instead. Here&apos;s what that sounds like from the folks who lived it.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-xl border bg-card p-5">
              <p className="tracking-wide text-amber-400" aria-label="5 out of 5 stars">
                ★★★★★
              </p>
              <blockquote className="mt-3 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-navy">
                {t.name} <span className="font-normal text-muted-foreground">· via {t.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="border-y bg-muted/40">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-center text-3xl font-bold tracking-tight text-navy">
            Why customers prefer an independent agency
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
            A captive agent answers to one carrier. A direct-to-consumer website sells you one
            company&apos;s products with no advice at all. Here&apos;s how the three ways to
            buy actually compare.
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[540px] border-separate border-spacing-0 overflow-hidden rounded-xl border text-sm">
              <thead>
                <tr className="bg-navy text-left text-white">
                  <th className="px-4 py-3 font-semibold">&nbsp;</th>
                  <th className="px-4 py-3 text-center font-semibold">Captive agents</th>
                  <th className="px-4 py-3 text-center font-semibold">Buying direct</th>
                  <th className="px-4 py-3 text-center font-semibold">{siteConfig.name}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 ? "bg-muted/50" : "bg-card"}>
                    <td className="border-t px-4 py-3 font-medium text-navy">{row.label}</td>
                    <CompareCell yes={row.agency} />
                    <CompareCell yes={row.carrier} />
                    <CompareCell yes={row.us} highlight />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Explainer */}
      <section className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="text-3xl font-bold tracking-tight text-navy">
          Life insurance, explained simply
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Life insurance is a contract: you pay a monthly premium, and when you pass away the
          insurer pays your beneficiary a tax-free cash benefit. What varies is how long the
          coverage lasts and what it costs. <strong className="text-navy">Term life</strong>{" "}
          covers a set window of years at the lowest price — ideal while you have a mortgage or
          children at home. <strong className="text-navy">Whole life</strong> never expires and
          builds cash value. <strong className="text-navy">Final expense</strong> is a small
          whole life policy, built for ages 45–85, that covers funeral costs without a medical
          exam.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          The right choice depends on your age, health, budget, and who depends on you. Our
          guides walk through each option in plain English — or skip ahead and let a licensed
          agent compare your real options.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Two numbers drive every quote: your age and your health. Both only move in one
          direction, which is why the same policy costs less today than it will next year.
          Locking a rate now — even a modest one — is almost always cheaper than waiting for a
          &ldquo;better time.&rdquo; And because premiums are fixed at issue, the policy you buy
          at 55 is still priced like a 55-year-old&apos;s when you&apos;re 80.
        </p>
        <Button asChild variant="outline" className="mt-6 font-semibold">
          <Link href="/guides">
            Read the Guides <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Button>
      </section>

      {/* Benefits */}
      <section className="border-t bg-muted/40">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="text-center text-3xl font-bold tracking-tight text-navy">
            What you can expect from a policy through us
          </h2>
          <ul className="mt-8 grid gap-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-muted-foreground">
                <span className="font-bold text-primary" aria-hidden>
                  ✓
                </span>
                {benefit}
              </li>
            ))}
          </ul>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Every item above is standard in the policies we place, not an upsell. When a policy
            can&apos;t deliver one of them for your situation — for example, when health history
            makes a waiting period unavoidable — your agent tells you before you apply, shows
            you the alternative, and lets you decide with the trade-offs on the table.
          </p>
        </div>
      </section>

      {/* Coverage by life stage */}
      <section className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="text-3xl font-bold tracking-tight text-navy">
          The right coverage at every age
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          There is no single &ldquo;best&rdquo; life insurance policy — there&apos;s a best
          policy for the decade you&apos;re in, the people who depend on you, and the
          obligations still on the books. Here&apos;s how the picture typically changes over a
          lifetime, and what our agents most often recommend at each stage.
        </p>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-navy">In your 30s and 40s</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              This is when term life is at its cheapest and does its most important work:
              replacing your income while children are young and the mortgage balance is high.
              A 20- or 30-year term sized at 10–12 times your income locks in decades of
              protection while you&apos;re at your healthiest — and most policies can be
              converted to permanent coverage later without new underwriting.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-navy">In your 50s</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Obligations start to shrink, but they rarely disappear. Many people in their 50s
              pair a smaller term policy — covering the last years of a mortgage or a late
              start on college costs — with the beginning of permanent coverage for final
              expenses. Buying the permanent piece now, while underwriting is still friendly,
              costs far less than waiting until 70.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-navy">In your 60s, 70s, and beyond</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              The goal usually shifts from income replacement to making sure no one inherits a
              funeral bill. Final expense policies are built for exactly this: modest coverage,
              no medical exam, fixed premiums, and acceptance for most health histories.
              Coverage is available for new applicants up to age 85 with most of our carriers.
            </p>
          </div>
        </div>
      </section>

      {/* Independent agency explainer */}
      <section className="border-t bg-muted/40">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            What &ldquo;independent agency&rdquo; actually means for you
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            A captive agent represents one insurance company and can only sell that company&apos;s
            policies at that company&apos;s prices — whatever your situation. An independent
            agency like {siteConfig.name} holds appointments with many carriers at once, so the
            question changes from &ldquo;will this company approve you?&rdquo; to &ldquo;which
            of these companies treats your age and health best?&rdquo; The difference shows up
            directly in your premium.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            It also changes the incentives. Because we can place you with any of our partners,
            there&apos;s no reason to push the policy that pays best — only the one that fits.
            Our agents are salaried, our quotes show the carriers by name, and if keeping the
            coverage you already own is the right move, that&apos;s our recommendation. You
            keep one point of contact for the life of the policy, including at claim time,
            when our team helps your family with the carrier&apos;s paperwork.
          </p>
        </div>
      </section>

      {/* Buyer's checklist */}
      <section className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="text-3xl font-bold tracking-tight text-navy">
          Eight questions to ask before you buy any policy
        </h2>
        <ol className="mt-6 list-decimal space-y-3 pl-5 text-muted-foreground">
          <li>
            Is there a waiting period, and does the full death benefit apply from day one — or
            only after two years?
          </li>
          <li>
            Is the premium guaranteed level for life, or can the carrier raise it at renewal or
            at certain ages?
          </li>
          <li>
            Does the coverage amount ever decrease as I age, as it does in some &ldquo;decreasing
            benefit&rdquo; policies sold by mail?
          </li>
          <li>
            How does this carrier treat my specific health conditions — and did the agent
            compare anyone else&apos;s underwriting before quoting?
          </li>
          <li>
            If it&apos;s a term policy, can it be converted to permanent coverage later without
            new health questions, and until what age?
          </li>
          <li>
            What riders are included free — like an accelerated benefit for terminal illness —
            and which ones cost extra?
          </li>
          <li>
            What is the carrier&apos;s financial strength rating, so the promise behind the
            policy is as solid as the price?
          </li>
          <li>
            Who helps my family file the claim — a call center, or the agent who sold the
            policy?
          </li>
        </ol>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          Any agent worth working with can answer all eight without hesitation. If you hear
          vagueness on the waiting period or the premium guarantee, keep shopping — those two
          answers are where bad policies hide.
        </p>
      </section>

      {/* Guides preview */}
      <section className="border-t bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-navy">Latest guides</h2>
            <Link href="/guides" className="text-sm font-semibold text-primary hover:underline">
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {guides.map((guide) => (
              <div key={guide.slug} className="flex flex-col rounded-xl border bg-card p-5">
                <span className="w-fit rounded-md bg-secondary px-2 py-0.5 text-xs font-medium">
                  {guide.topic}
                </span>
                <h3 className="mt-3 text-lg font-bold text-navy">
                  <Link href={`/guides/${guide.slug}`} className="hover:text-primary">
                    {guide.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{guide.description}</p>
                <p className="mt-4 text-xs text-muted-foreground">{guide.readMinutes} min read</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        heading="Frequently asked questions"
        intro="Straight answers about quotes, coverage, and how we work."
        faqs={homeFaqs}
      />

      {/* Final CTA */}
      <section className="bg-navy">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            See your rates in the next 60 seconds
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Free quotes from {siteConfig.carriers.length}+ carriers, delivered by a licensed
            agent who compares the market for your exact age and health. No payment info, no
            obligation, no pressure — and if the honest answer is that you don&apos;t need new
            coverage, that&apos;s the answer you&apos;ll get.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full font-semibold sm:w-auto">
              <Link href="/quote">See Instant Quotes</Link>
            </Button>
            <a
              href={`tel:${siteConfig.phone.tel}`}
              className="inline-flex items-center gap-2 font-semibold text-white"
            >
              <Phone className="size-4" aria-hidden /> Or call {siteConfig.phone.display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function CompareCell({ yes, highlight = false }: { yes: boolean; highlight?: boolean }) {
  return (
    <td className={`border-t px-4 py-3 text-center ${highlight ? "bg-primary/5" : ""}`}>
      {yes ? (
        <span className="font-bold text-primary" aria-label="Yes">
          ✓
        </span>
      ) : (
        <span className="text-muted-foreground/50" aria-label="No">
          ✕
        </span>
      )}
    </td>
  );
}
