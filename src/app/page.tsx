import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Lock, SearchCheck, ExternalLink, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import TrustBadges from "@/components/site/trust-badges";
import { siteConfig, CANOPY_URL, ASSET_PREFIX } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Home, Auto and Business Coverage Review`,
  description: siteConfig.description,
};

const pillars = [
  { icon: SearchCheck, title: "A clear review", body: "See what your current home, auto or business policy covers, and where it may fall short." },
  { icon: Lock, title: "Connect securely", body: "Share your policy details through Canopy Connect instead of digging up paperwork." },
  { icon: ClipboardCheck, title: "Plain-English next steps", body: "Get a simple summary of what to look at before your next renewal." },
];

const steps = [
  { step: "1", title: "Pick what to review", body: "Choose home, auto or business coverage." },
  { step: "2", title: "Connect your policies", body: "Use the secure Canopy link to share your current policy information." },
  { step: "3", title: "See your options", body: "Review what was found and decide what to do next. You stay in control." },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b bg-gradient-to-b from-secondary/60 to-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <img src={`${ASSET_PREFIX}/logo.png`} alt={siteConfig.name} className="mx-auto mb-6 h-24 w-auto" />
            <Badge variant="secondary" className="mb-4">Home · Auto · Business</Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              Smarter protection for your home, car and business
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Review the coverage you have today, find the gaps, and know your next step before
              your policy renews.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full font-semibold sm:w-auto">
                <Link href="/quote">Start the walkthrough <ArrowRight className="size-4" aria-hidden /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full font-semibold sm:w-auto">
                <a href={CANOPY_URL} target="_blank" rel="noopener noreferrer">Connect your policies <ExternalLink className="size-4" aria-hidden /></a>
              </Button>
            </div>
            <TrustBadges className="mt-8 justify-center" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-3xl font-bold tracking-tight text-navy">Why review with {siteConfig.name}</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary">
                <p.icon className="size-6 text-primary" aria-hidden />
              </div>
              <h3 className="mt-4 font-semibold text-navy">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="scroll-mt-20 border-t bg-muted">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-center text-3xl font-bold tracking-tight text-navy">Coverage we can review</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {siteConfig.products.map((p) => (
              <Card key={p.slug}>
                <CardContent className="flex h-full flex-col gap-3 pt-6">
                  <h3 className="text-xl font-bold text-navy">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                  <ul className="list-disc space-y-1 pl-5 text-sm">{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  <Button asChild className="mt-auto font-semibold"><Link href={`/quote?product=${p.slug}`}>Review {p.shortName.toLowerCase()} coverage</Link></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="mx-auto max-w-4xl scroll-mt-20 px-4 py-14">
        <h2 className="text-center text-3xl font-bold tracking-tight text-navy">How it works</h2>
        <ol className="mt-8 space-y-6">
          {steps.map((s) => (
            <li key={s.step} className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">{s.step}</span>
              <div><h3 className="font-semibold text-navy">{s.title}</h3><p className="mt-1 text-muted-foreground">{s.body}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t bg-secondary/50">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-14 text-center">
          <Gift className="size-10 text-primary" aria-hidden />
          <h2 className="text-2xl font-bold text-navy">Our $1 million coverage-review goal</h2>
          <p className="max-w-2xl text-muted-foreground">
            We are working toward helping customers find $1 million in savings and better coverage. That is a
            goal, not a result and not a guarantee for any one customer.
          </p>
          <p className="max-w-2xl rounded-md bg-background p-3 text-sm text-muted-foreground">
            Thank-you e-card: demo only. No gift card provider, amount, eligibility or funding is set, and nothing is issued from this preview.
          </p>
        </div>
      </section>
    </>
  );
}
