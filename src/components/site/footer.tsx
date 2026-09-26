import Link from "next/link";
import { Phone, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { guides } from "@/content/guides";

const productLinks = siteConfig.products.map((p) => ({
  label: p.shortName,
  href: `/quote?product=${p.slug}`,
}));

export default function Footer() {
  return (
    <footer className="border-t bg-navy text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-6 text-primary-bright" aria-hidden />
            <span className="text-lg font-bold text-white">{siteConfig.name}</span>
          </div>
          <p className="mt-3 text-sm text-slate-400">{siteConfig.tagline}</p>
          <a
            href={`tel:${siteConfig.phone.tel}`}
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-white"
          >
            <Phone className="size-4 text-primary-bright" aria-hidden />
            {siteConfig.phone.display}
          </a>
          <p className="mt-1 text-sm text-slate-400">{siteConfig.hours}</p>
        </div>

        <nav aria-label="Coverage">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Coverage</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {productLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-slate-300 hover:text-white">
                  {link.label} Insurance
                </Link>
              </li>
            ))}
            <li>
              <Link href="/quote" className="text-slate-300 hover:text-white">
                Get Instant Quotes
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Guides">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Guides</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link href={`/guides/${guide.slug}`} className="text-slate-300 hover:text-white">
                  {guide.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/guides" className="text-slate-300 hover:text-white">
                All Guides
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Compliance</h2>
          <p className="mt-3 text-sm text-slate-400">
            {siteConfig.legalName} · NPN {siteConfig.npn} ·{" "}
            {siteConfig.address.locality}, {siteConfig.address.region}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            {siteConfig.name} is an independent insurance agency. Quotes are estimates only;
            final rates are determined by the issuing carrier after underwriting. This website
            is for U.S. persons only and does not constitute an offer of coverage in states
            where we are not licensed.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="space-x-4">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
            <span>Licenses</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
