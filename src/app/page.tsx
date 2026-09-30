import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Coffee, Lock, SearchCheck, ExternalLink, Gift } from "lucide-react";
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
  { icon: Lock, title: "Connect with Canopy", body: "Share your policy details through Canopy Connect instead of digging up paperwork." },
  { icon: ClipboardCheck, title: "Plain-English next steps", body: "Get a simple summary of what to look at before your next renewal." },
];

const steps = [
  { step: "1", title: "Pick what to review", body: "Choose home, auto or business coverage." },
  { step: "2", title: "Connect your policies", body: "Use the Canopy link to share your current policy information." },
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
            <p className="mx-auto mb-4 w-fit rounded-full bg-navy px-5 py-2 text-sm font-bold text-white sm:text-base">
              Our goal: $1,000,000 in combined premium savings
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              Smarter protection for your home, car and business
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Review the coverage you have today while you enjoy a coffee or a bite. Our aim is to
              have your quote ready before your break ends.
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
        <div className="mx-auto grid max-w-5xl gap-6 px-4 py-14 md:grid-cols-2">
          <Card className="border-2 border-navy">
            <CardContent className="flex flex-col gap-3 pt-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Our mission</p>
              <p className="text-5xl font-extrabold text-navy">$1,000,000</p>
              <h2 className="text-xl font-bold text-navy">in combined premium savings</h2>
              <p className="text-sm text-muted-foreground">
                This is our goal for the customers we help, not a result we have reached and not a
                promise about your own premium. Savings depend on your coverage and what is available to you.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 border-primary-bright">
            <CardContent className="flex flex-col gap-3 pt-6 text-center">
              <Coffee className="mx-auto size-10 text-primary" aria-hidden />
              <h2 className="text-xl font-bold text-navy">A coffee or food e-card while we work on your quote</h2>
              <p className="text-sm text-muted-foreground">
                The idea: take a coffee or food break while we review your coverage, with the aim of
                having your quote back before the break ends.
              </p>
              <p className="rounded-md bg-background p-3 text-xs text-muted-foreground">
                Concept preview only. The e-card is a demo: no provider, amount, eligibility or funding is set,
                nothing is issued, and there is no guaranteed turnaround time.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
