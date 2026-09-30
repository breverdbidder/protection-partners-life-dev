"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ChevronLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { siteConfig, CANOPY_URL } from "@/lib/site-config";
import { FOCUS_OPTIONS, PRODUCT_SLUGS, US_STATES, quoteSchema, type ProductSlug, type QuoteInput } from "@/lib/quote-schema";

const STEPS: { title: string; fields: FieldPath<QuoteInput>[] }[] = [
  { title: "What would you like to review?", fields: ["product"] },
  { title: "A few details", fields: ["focus", "state"] },
  { title: "When does your policy renew?", fields: ["renewal"] },
  { title: "Finish the walkthrough", fields: ["firstName", "email", "consent"] },
];

function isProductSlug(v: string | null): v is ProductSlug {
  return PRODUCT_SLUGS.includes(v as ProductSlug);
}

function FieldError({ msg }: { msg?: string }) {
  return msg ? <p className="mt-1 text-sm text-destructive">{msg}</p> : null;
}

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const p = searchParams.get("product");
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const form = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    mode: "onTouched",
    defaultValues: { product: isProductSlug(p) ? p : undefined, focus: "", firstName: "", email: "", consent: false },
  });
  const product = form.watch("product");
  const options = product ? FOCUS_OPTIONS[product as ProductSlug] : [];
  const err = form.formState.errors;

  async function next() {
    const valid = await form.trigger(STEPS[step].fields);
    if (!valid) return;
    if (step < STEPS.length - 1) setStep(step + 1);
    else setDone(true);
  }

  if (done) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <CheckCircle2 className="size-14 text-primary" aria-hidden />
          <h2 className="text-2xl font-bold text-navy">Demo completed. Nothing was sent.</h2>
          <p className="max-w-md text-muted-foreground">
            This is a development preview. No data left your browser. The coffee or food e-card is a demo concept and nothing is issued. To review your real policies,
            connect them securely through Canopy Connect.
          </p>
          <Button asChild className="font-semibold">
            <a href={CANOPY_URL} target="_blank" rel="noopener noreferrer">
              Connect your policies <ExternalLink className="size-4" aria-hidden />
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="space-y-6 py-8">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Step {step + 1} of {STEPS.length}</p>
          <Progress value={((step + 1) / STEPS.length) * 100} className="mt-2" />
          <h2 className="mt-4 text-xl font-bold text-navy">{STEPS[step].title}</h2>
        </div>

        {step === 0 && (
          <div>
            <RadioGroup
              value={product ?? ""}
              onValueChange={(v) => { form.setValue("product", v as ProductSlug, { shouldValidate: true }); form.setValue("focus", ""); }}
              className="gap-3"
            >
              {siteConfig.products.map((pr) => (
                <Label key={pr.slug} htmlFor={`p-${pr.slug}`} className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem value={pr.slug} id={`p-${pr.slug}`} className="mt-1" />
                  <span><span className="block font-semibold text-navy">{pr.name}</span><span className="block text-sm font-normal text-muted-foreground">{pr.description}</span></span>
                </Label>
              ))}
            </RadioGroup>
            {err.product ? <FieldError msg="Select a coverage type" /> : null}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="focus">Coverage type</Label>
              <Select value={form.watch("focus") || undefined} onValueChange={(v) => form.setValue("focus", v, { shouldValidate: true })}>
                <SelectTrigger id="focus" className="w-full"><SelectValue placeholder="Select one" /></SelectTrigger>
                <SelectContent>{options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FieldError msg={err.focus?.message} />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Select value={form.watch("state") || undefined} onValueChange={(v) => form.setValue("state", v as QuoteInput["state"], { shouldValidate: true })}>
                <SelectTrigger id="state" className="w-full"><SelectValue placeholder="Select your state" /></SelectTrigger>
                <SelectContent>{US_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
              <FieldError msg={err.state?.message} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <RadioGroup value={form.watch("renewal") ?? ""} onValueChange={(v) => form.setValue("renewal", v as QuoteInput["renewal"], { shouldValidate: true })} className="gap-3">
              {[["soon", "Within 60 days"], ["later", "More than 60 days away"], ["unsure", "I am not sure"]].map(([v, l]) => (
                <Label key={v} htmlFor={`r-${v}`} className="flex items-center gap-2 rounded-lg border px-4 py-3 has-[[data-state=checked]]:border-primary">
                  <RadioGroupItem value={v} id={`r-${v}`} /> {l}
                </Label>
              ))}
            </RadioGroup>
            <FieldError msg={err.renewal?.message} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="rounded-md bg-muted p-3 text-sm text-muted-foreground">Sample data only. Do not enter real personal details. Nothing is stored or sent.</p>
            <div>
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" autoComplete="off" {...form.register("firstName")} />
              <FieldError msg={err.firstName?.message} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="off" {...form.register("email")} />
              <FieldError msg={err.email?.message} />
            </div>
            <div className="flex items-start gap-3">
              <Checkbox id="consent" checked={form.watch("consent") === true} onCheckedChange={(c) => form.setValue("consent", c === true, { shouldValidate: true })} />
              <Label htmlFor="consent" className="text-sm font-normal leading-snug">I understand this is a preview walkthrough and nothing is submitted.</Label>
            </div>
            <FieldError msg={err.consent?.message} />
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={() => setStep(step - 1)}><ChevronLeft className="size-4" aria-hidden /> Back</Button>
          ) : <span />}
          <Button type="button" onClick={next} className="font-semibold">{step === STEPS.length - 1 ? "Finish demo" : "Continue"}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
