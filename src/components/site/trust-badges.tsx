import { CheckCircle2 } from "lucide-react";

export default function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground ${className}`}>
      {["Preview only", "Sample data only", "Nothing is stored or sent"].map((t) => (
        <li key={t} className="flex items-center gap-1.5"><CheckCircle2 className="size-4 text-primary" aria-hidden />{t}</li>
      ))}
    </ul>
  );
}
