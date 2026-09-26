import { siteConfig } from "@/lib/site-config";

// Review stats come from site-config and are PLACEHOLDERS in the scaffold —
// swap in real, verifiable numbers before launch. They are deliberately not
// emitted as JSON-LD (see src/lib/schema.ts).
export default function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}>
      {siteConfig.reviewStats.map((stat) => (
        <li key={stat.source} className="flex items-center gap-2">
          <span className="text-amber-400" aria-hidden>
            ★
          </span>
          <span className="text-sm">
            <strong className="font-semibold">{stat.source}</strong>{" "}
            <span className="font-medium">{stat.rating}</span>{" "}
            <span className="text-muted-foreground">· {stat.detail}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
