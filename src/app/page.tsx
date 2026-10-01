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
            <div className="mx-auto mb-4 flex w-fit max-w-full flex-col items-center gap-1 rounded-[26px] bg-gradient-to-br from-navy to-[#163557] px-7 pb-5 pt-4 shadow-xl text-center text-sm font-bold text-white sm:text-base">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#cbebe9]">Our goal</p>
              <p className="text-5xl font-extrabold leading-none tracking-tight sm:text-7xl">$1,000,000</p>
              <p className="text-base font-bold sm:text-xl">in combined premium savings</p>
              <div role="img" aria-label="Illustration of a $10 Protection Partners e-gift card" className="flex aspect-[1.6] w-full mt-2 max-w-[140px] flex-col justify-between rounded-lg border border-white/35 bg-gradient-to-br from-navy via-[#6689a8] to-primary-bright px-2 py-1.5 text-left font-normal text-white shadow-lg">
                <div className="flex items-center justify-between gap-1 text-[7px] font-bold"><span className="whitespace-nowrap">Protection Partners</span><span className="whitespace-nowrap rounded-full bg-[#cbebe9] px-1 text-[5.5px] tracking-wider text-navy">E-GIFT CARD</span></div>
                <div className="text-xl font-extrabold leading-none">$10</div>
                <div className="flex justify-between text-[6px]"><span>Coffee or food</span><span>Sent to your phone</span></div>
              </div>
            </div>
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
            <p className="mt-3 text-xs text-muted-foreground">"Connect your policies" opens our Canopy Connect page in a new tab. Information you enter there is submitted to Canopy for real.</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Call <a className="font-semibold text-navy underline" href={`tel:${siteConfig.phone.tel}`}>{siteConfig.phone.display}</a>
              {" "}or text <a className="font-semibold text-navy underline" href={`sms:${siteConfig.text.sms}`}>{siteConfig.text.display}</a>
            </p>
            <TrustBadges className="mt-4 justify-center" />
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
              <div role="img" aria-label="Illustration of a $10 Protection Partners e-gift card" className="mx-auto flex aspect-[1.6] w-full max-w-[300px] flex-col justify-between rounded-2xl bg-gradient-to-br from-navy via-[#6689a8] to-primary-bright p-4 text-left text-white shadow-lg">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Protection Partners</span>
                  <span className="rounded-full bg-[#cbebe9] px-2 py-0.5 text-[10px] tracking-wider text-navy">E-GIFT CARD</span>
                </div>
                <div className="text-5xl font-extrabold leading-none">$10</div>
                <div className="flex justify-between text-[11px]"><span>Coffee or food</span><span>Sent to your phone</span></div>
              </div>
              <h2 className="text-xl font-bold text-navy">A $10 coffee or food e-gift card, on us</h2>
              <p className="text-sm text-muted-foreground">
                Part of our $1,000,000 savings campaign: while we review your coverage, Protection Partners plans
                to text a $10 e-gift card to your phone for a coffee or a bite. Planned eligibility: your policies are verified through Canopy Connect first. Our aim is to have your quote back before your break ends.
              </p>
              <p className="rounded-md bg-background p-3 text-xs text-muted-foreground">
                Concept preview only. The $10 amount is a planned idea. The gift card provider, final eligibility rules, who approves issuance, funding and
                legal approval are not set, so nothing is issued or sent and there is no guaranteed turnaround time.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
