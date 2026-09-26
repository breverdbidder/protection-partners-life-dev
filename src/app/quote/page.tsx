import type { Metadata } from "next";
import { Suspense } from "react";
import { Lock } from "lucide-react";
import QuoteForm from "@/components/quote/quote-form";
import TrustBadges from "@/components/site/trust-badges";
import FaqSection from "@/components/site/faq-section";
import { siteConfig, BASE_URL } from "@/lib/site-config";
import { jsonLd, pageSchema, type SchemaFaq } from "@/lib/schema";

const quoteFaqs: SchemaFaq[] = [
  {
    q: "What happens after I submit this form?",
    a: "A licensed agent reviews your answers, runs your profile against our carrier partners, and contacts you — usually the same business day — with the strongest quotes for your age, state, and health. You'll get real numbers from real carriers, not a teaser rate that changes when you apply.",
  },
  {
    q: "Will I get calls from lots of different companies?",
    a: "No. Your information goes to our agency only — it is never sold to lead brokers or shared with third parties. You'll hear from one agent at one agency, and if you tell us the timing isn't right, we stop calling. That's the whole point of working with an independent agency instead of a quote-comparison lead site.",
  },
  {
    q: "Do I need my medical records or a doctor's visit to get quotes?",
    a: "No. Quotes are based on the basics you enter here — age, state, coverage amount, gender, and tobacco use. If you decide to apply, most of our policies use simplified underwriting: a short list of health questions answered by phone, with no exam, no bloodwork, and no clinic visit.",
  },
  {
    q: "How accurate are the quotes I'll receive?",
    a: "Because a licensed agent matches your health profile to each carrier's actual underwriting rules before quoting, the price you're quoted is normally the price you pay. The only time a final rate differs is when an application answer changes the underwriting class — and your agent will flag that possibility up front.",
  },
  {
    q: "Is there any cost or obligation?",
    a: "None. Quotes are free, our advice is free, and no payment information is collected. Our agents are salaried rather than commission-chasing, so there's no incentive to push you into a bigger policy than you need. If the right answer is 'keep the coverage you already have,' that's what we'll tell you.",
  },
  {
    q: "What if I'm not sure which type of policy I need?",
    a: "Pick your best guess on the first step — it isn't binding. Your agent will confirm whether final expense, term, or whole life actually fits your goal and budget before quoting, and it's common for that conversation to change the recommendation. You can also read our plain-English guides first if you prefer to research before talking to anyone.",
  },
  {
    q: "Can I request quotes for someone else, like a parent?",
    a: "Yes — enter their age, state, and health details rather than your own, and mention on the call that you're shopping for a family member. The insured person will need to consent and sign the application, but you can own the policy, pay the premium, and be the beneficiary. This is one of the most common ways final expense coverage is bought.",
  },
];

const TITLE = "Get Instant Life Insurance Quotes";
const DESCRIPTION =
  "Answer a few quick questions and compare personalized life insurance quotes from multiple top-rated carriers. Free, fast, and no obligation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};

export default function QuotePage() {
  return (
    <div className="bg-muted/40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            pageSchema({
              type: "page",
              pageUrl: `${BASE_URL}/quote`,
              title: TITLE,
              description: DESCRIPTION,
              crumbs: [
                { name: "Home", item: `${BASE_URL}/` },
                { name: "Get Quotes", item: `${BASE_URL}/quote` },
              ],
              faqs: quoteFaqs,
            }),
          ),
        }}
      />
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Compare your life insurance rates
          </h1>
          <p className="mt-3 text-muted-foreground">
            Free personalized quotes from {siteConfig.carriers.length}+ carriers, matched to
            your age, state, and health by a licensed agent. It takes about a minute, no
            payment information is requested, and there&apos;s no obligation to buy anything.
          </p>
          <TrustBadges className="mt-5 justify-center" />
        </div>

        <div className="mt-8">
          <Suspense>
            <QuoteForm />
          </Suspense>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <Lock className="size-3.5" aria-hidden />
          Your information is encrypted and never sold to third parties.
        </p>
        <p className="mx-auto mt-3 max-w-lg text-center text-xs leading-relaxed text-muted-foreground">
          Quotes are provided by licensed agents of {siteConfig.legalName} and are estimates
          until an application is approved by the issuing carrier. Answering these questions
          does not submit an application to any insurance company, affect your credit, or
          obligate you to buy anything.
        </p>

        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight text-navy">
            What happens after you request quotes
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The short version: one licensed agent, real carrier prices, and nothing submitted
            anywhere until you say so. Here&apos;s the full picture.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Within one business day — usually much sooner — a licensed {siteConfig.name} agent
            calls or emails you with quotes matched to your age, state, and health profile.
            This is a real comparison, not a teaser: we check each carrier&apos;s actual
            underwriting rules against your situation before we quote, so the number you hear
            is the number you&apos;d pay.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            If you like one of the options, your agent completes the application with you by
            phone in about 15 minutes and submits it to the carrier. Simplified-issue policies
            (final expense and many whole life plans) are often approved within days.
            You&apos;re never asked for payment information until you&apos;ve chosen a policy
            and decided to apply — and every policy comes with a state-mandated free-look
            period, so you can cancel for a full refund if you change your mind.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Not ready to talk? That&apos;s fine. Tell your agent you&apos;re researching and
            we&apos;ll send the quotes in writing and leave the ball in your court. There are
            no follow-up call campaigns and your information is never resold.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            One tip before you start: have a rough coverage goal in mind rather than a rigid
            number. Quotes often reveal that a slightly higher or lower amount sits at a much
            better price point — carriers band their rates, and $15,000 of coverage sometimes
            costs barely more than $12,000. Your agent will show you the bands so you can pick
            the best value, not just the number you first typed.
          </p>
        </section>
      </div>

      <div className="border-t bg-background">
        <FaqSection
          heading="Quote questions, answered"
          intro="The questions people ask most often before requesting quotes — and the honest answers, before you share a single detail."
          faqs={quoteFaqs}
        />
      </div>
    </div>
  );
}
