"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ChevronLeft, Loader2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { siteConfig } from "@/lib/site-config";
import {
  COVERAGE_OPTIONS,
  PRODUCT_SLUGS,
  US_STATES,
  quoteSchema,
  type ProductSlug,
  type QuoteInput,
} from "@/lib/quote-schema";

const STEPS: { title: string; fields: FieldPath<QuoteInput>[] }[] = [
  { title: "What coverage are you looking for?", fields: ["product"] },
  { title: "Coverage amount and state", fields: ["coverage", "state"] },
  { title: "A little about you", fields: ["age", "gender", "tobacco"] },
  { title: "Where should we send your quotes?", fields: ["firstName", "lastName", "phone", "email", "consent"] },
];

function isProductSlug(v: string | null): v is ProductSlug {
  return PRODUCT_SLUGS.includes(v as ProductSlug);
}

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");
  const initialProduct = isProductSlug(productParam) ? productParam : undefined;

  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"editing" | "submitting" | "done" | "error">("editing");

  const form = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    mode: "onTouched",
    defaultValues: {
      product: initialProduct,
      coverage: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      consent: false,
    },
  });

  const product = form.watch("product");
  const coverageOptions = product ? COVERAGE_OPTIONS[product as ProductSlug] : [];

  async function next() {
    const valid = await form.trigger(STEPS[step].fields);
    if (!valid) return;
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.getValues()),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <CheckCircle2 className="size-14 text-primary" aria-hidden />
          <h2 className="text-2xl font-bold text-navy">Your quote request is in!</h2>
          <p className="max-w-md text-muted-foreground">
            A licensed agent will review your information and contact you shortly with
            personalized quotes from multiple carriers. Prefer to talk now?
          </p>
          <Button asChild variant="outline" className="font-semibold">
            <a href={`tel:${siteConfig.phone.tel}`}>
              <Phone className="size-4" aria-hidden /> Call {siteConfig.phone.display}
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const err = form.formState.errors;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Step {step + 1} of {STEPS.length}
            </span>
            <span>Takes about 60 seconds</span>
          </div>
          <Progress value={((step + 1) / STEPS.length) * 100} aria-label="Form progress" />
        </div>

        <h2 className="mb-5 text-xl font-bold text-navy">{STEPS[step].title}</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void next();
          }}
          noValidate
        >
          {step === 0 ? (
            <RadioGroup
              value={product ?? ""}
              onValueChange={(v) => {
                form.setValue("product", v as ProductSlug, { shouldValidate: true });
                form.setValue("coverage", "");
              }}
              className="gap-3"
            >
              {siteConfig.products.map((p) => (
                <Label
                  key={p.slug}
                  htmlFor={`product-${p.slug}`}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
                >
                  <RadioGroupItem value={p.slug} id={`product-${p.slug}`} className="mt-1" />
                  <span>
                    <span className="block font-semibold">{p.name}</span>
                    <span className="mt-1 block text-sm font-normal text-muted-foreground">
                      {p.description}
                    </span>
                  </span>
                </Label>
              ))}
            </RadioGroup>
          ) : null}
          {step === 0 && err.product ? <FieldError msg="Select a coverage type" /> : null}

          {step === 1 ? (
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="coverage">Coverage amount</Label>
                <Select
                  value={form.watch("coverage") || undefined}
                  onValueChange={(v) => form.setValue("coverage", v, { shouldValidate: true })}
                >
                  <SelectTrigger id="coverage" className="w-full">
                    <SelectValue placeholder="Select an amount" />
                  </SelectTrigger>
                  <SelectContent>
                    {coverageOptions.map((amount) => (
                      <SelectItem key={amount} value={amount}>
                        {amount}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {err.coverage ? <FieldError msg={err.coverage.message} /> : null}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State of residence</Label>
                <Select
                  value={form.watch("state") || undefined}
                  onValueChange={(v) =>
                    form.setValue("state", v as QuoteInput["state"], { shouldValidate: true })
                  }
                >
                  <SelectTrigger id="state" className="w-full">
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((st) => (
                      <SelectItem key={st} value={st}>
                        {st}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {err.state ? <FieldError msg={err.state.message} /> : null}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="age">Your age</Label>
                <Input
                  id="age"
                  type="number"
                  inputMode="numeric"
                  placeholder="e.g. 62"
                  {...form.register("age")}
                />
                {err.age ? <FieldError msg={err.age.message} /> : null}
              </div>
              <fieldset className="grid gap-2">
                <legend className="text-sm font-medium">Gender</legend>
                <RadioGroup
                  value={form.watch("gender") ?? ""}
                  onValueChange={(v) =>
                    form.setValue("gender", v as QuoteInput["gender"], { shouldValidate: true })
                  }
                  className="flex gap-4"
                >
                  <Label htmlFor="gender-female" className="flex items-center gap-2 rounded-lg border px-4 py-3 has-[[data-state=checked]]:border-primary">
                    <RadioGroupItem value="female" id="gender-female" /> Female
                  </Label>
                  <Label htmlFor="gender-male" className="flex items-center gap-2 rounded-lg border px-4 py-3 has-[[data-state=checked]]:border-primary">
                    <RadioGroupItem value="male" id="gender-male" /> Male
                  </Label>
                </RadioGroup>
                {err.gender ? <FieldError msg={err.gender.message} /> : null}
              </fieldset>
              <fieldset className="grid gap-2">
                <legend className="text-sm font-medium">Used tobacco in the last 12 months?</legend>
                <RadioGroup
                  value={form.watch("tobacco") ?? ""}
                  onValueChange={(v) =>
                    form.setValue("tobacco", v as QuoteInput["tobacco"], { shouldValidate: true })
                  }
                  className="flex gap-4"
                >
                  <Label htmlFor="tobacco-no" className="flex items-center gap-2 rounded-lg border px-4 py-3 has-[[data-state=checked]]:border-primary">
                    <RadioGroupItem value="no" id="tobacco-no" /> No
                  </Label>
                  <Label htmlFor="tobacco-yes" className="flex items-center gap-2 rounded-lg border px-4 py-3 has-[[data-state=checked]]:border-primary">
                    <RadioGroupItem value="yes" id="tobacco-yes" /> Yes
                  </Label>
                </RadioGroup>
                {err.tobacco ? <FieldError msg={err.tobacco.message} /> : null}
              </fieldset>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" autoComplete="given-name" {...form.register("firstName")} />
                  {err.firstName ? <FieldError msg={err.firstName.message} /> : null}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" autoComplete="family-name" {...form.register("lastName")} />
                  {err.lastName ? <FieldError msg={err.lastName.message} /> : null}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(555) 555-5555"
                  {...form.register("phone")}
                />
                {err.phone ? <FieldError msg={err.phone.message} /> : null}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
                {err.email ? <FieldError msg={err.email.message} /> : null}
              </div>
              <Label htmlFor="consent" className="flex items-start gap-3 text-xs font-normal leading-relaxed text-muted-foreground">
                <Checkbox
                  id="consent"
                  checked={form.watch("consent") === true}
                  onCheckedChange={(v) =>
                    form.setValue("consent", v === true, { shouldValidate: true })
                  }
                  className="mt-0.5"
                />
                <span>
                  By checking this box, I agree to be contacted by {siteConfig.name} at the
                  phone number and email provided, including by autodialed calls and text
                  messages, about insurance quotes. Consent is not a condition of purchase.
                  Message and data rates may apply.
                </span>
              </Label>
              {err.consent ? <FieldError msg={err.consent.message} /> : null}
            </div>
          ) : null}

          {status === "error" ? (
            <p className="mt-4 text-sm text-destructive">
              Something went wrong sending your request. Please try again, or call us at{" "}
              <a className="font-semibold underline" href={`tel:${siteConfig.phone.tel}`}>
                {siteConfig.phone.display}
              </a>
              .
            </p>
          ) : null}

          <div className="mt-7 flex items-center justify-between gap-3">
            {step > 0 ? (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setStatus("editing");
                  setStep(step - 1);
                }}
              >
                <ChevronLeft className="size-4" aria-hidden /> Back
              </Button>
            ) : (
              <span />
            )}
            <Button type="submit" size="lg" className="font-semibold" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
                </>
              ) : step === STEPS.length - 1 ? (
                "Get My Quotes"
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function FieldError({ msg }: { msg?: string }) {
  return <p className="mt-2 text-sm text-destructive">{msg ?? "This field is required"}</p>;
}
