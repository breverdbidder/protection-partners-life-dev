import Link from "next/link";
import { siteConfig, CANOPY_URL, ASSET_PREFIX } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t bg-navy text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3">
        <div>
          <img src={`${ASSET_PREFIX}/logo.png`} alt={siteConfig.name} className="h-14 w-auto rounded bg-white p-1" />
          <p className="mt-3 text-sm text-slate-300">{siteConfig.tagline}</p>
          <p className="mt-2 text-sm"><a href={`tel:${siteConfig.phone.tel}`} className="font-semibold text-white">Call {siteConfig.phone.display}</a></p>
          <p className="mt-1 text-sm"><a href={`sms:${siteConfig.text.sms}`} className="font-semibold text-white">Text {siteConfig.text.display}</a></p>
        </div>
        <nav aria-label="Coverage">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Coverage</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {siteConfig.products.map((p) => (
              <li key={p.slug}><Link href={`/quote?product=${p.slug}`} className="text-slate-300 hover:text-white">{p.name}</Link></li>
            ))}
            <li><a href={CANOPY_URL} className="text-slate-300 hover:text-white" target="_blank" rel="noopener noreferrer">Connect your policies</a></li>
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Preview notice</h2>
          <p className="mt-3 text-xs leading-relaxed text-slate-300">
            This is a development preview built from an open-source template. License details, contact
            information and carrier relationships are not yet published. Nothing on this page is an
            offer of coverage.
          </p>
        </div>
      </div>
    </footer>
  );
}
