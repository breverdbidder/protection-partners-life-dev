"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/#products", label: "Coverage Options" },
  { href: "/#why-us", label: "Why Us" },
  { href: "/guides", label: "Guides" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <ShieldCheck className="size-7 text-primary" aria-hidden />
          <span className="text-lg font-bold tracking-tight text-navy">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${siteConfig.phone.tel}`}
            className="hidden items-center gap-2 text-sm font-semibold text-navy lg:flex"
          >
            <Phone className="size-4 text-primary" aria-hidden />
            {siteConfig.phone.display}
          </a>
          <Button asChild size="sm" className="hidden font-semibold sm:inline-flex">
            <Link href="/quote">See Instant Quotes</Link>
          </Button>
          <a
            href={`tel:${siteConfig.phone.tel}`}
            className="inline-flex size-9 items-center justify-center rounded-md border text-primary sm:hidden"
            aria-label={`Call ${siteConfig.phone.display}`}
          >
            <Phone className="size-4" aria-hidden />
          </a>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md border md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t px-4 py-3 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-2 py-2 text-sm font-medium hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/quote"
                className="block rounded-md bg-primary px-2 py-2 text-sm font-semibold text-primary-foreground"
                onClick={() => setOpen(false)}
              >
                See Instant Quotes
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
