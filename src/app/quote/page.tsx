import type { Metadata } from "next";
import { Suspense } from "react";
import QuoteForm from "@/components/quote/quote-form";
import TrustBadges from "@/components/site/trust-badges";

export const metadata: Metadata = {
  title: "Start the coverage review walkthrough",
  description: "A four-step preview walkthrough. Sample data only, nothing is sent.",
};

export default function QuotePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Review your coverage</h1>
        <p className="mt-3 text-muted-foreground">
          Four quick steps. This preview uses sample data only and does not send anything anywhere.
        </p>
        <TrustBadges className="mt-5 justify-center" />
      </div>
      <div className="mt-8">
        <Suspense>
          <QuoteForm />
        </Suspense>
      </div>
    </div>
  );
}
