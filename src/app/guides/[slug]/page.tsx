import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FaqSection from "@/components/site/faq-section";
import { siteConfig, BASE_URL } from "@/lib/site-config";
import { jsonLd, pageSchema } from "@/lib/schema";
import { guides, getGuide } from "@/content/guides";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

type GuidePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    openGraph: { type: "article", publishedTime: guide.datePublished },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const pageUrl = `${BASE_URL}/guides/${guide.slug}`;

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            pageSchema({
              type: "article",
              pageUrl,
              title: guide.title,
              description: guide.description,
              datePublished: guide.datePublished,
              crumbs: [
                { name: "Home", item: `${BASE_URL}/` },
                { name: "Guides", item: `${BASE_URL}/guides` },
                { name: guide.title, item: pageUrl },
              ],
              faqs: guide.faqs,
            }),
          ),
        }}
      />

      <header className="border-b bg-muted/40">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link href="/guides" className="hover:text-foreground">
              Guides
            </Link>{" "}
            / <span>{guide.topic}</span>
          </nav>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy">{guide.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Badge variant="secondary">{guide.topic}</Badge>
            <span>{guide.readMinutes} min read</span>
            <span>
              Updated{" "}
              {new Date(guide.datePublished).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-10">
        {guide.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-4 text-lg leading-relaxed text-foreground/90 first:mt-0">
            {paragraph}
          </p>
        ))}

        {guide.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-2xl font-bold tracking-tight text-navy">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-4 leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
            {section.bullets ? (
              <ul className="mt-4 space-y-2">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-muted-foreground">
                    <span className="font-bold text-primary" aria-hidden>
                      ✓
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        {/* Inline CTA */}
        <aside className="mt-12 rounded-xl border bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold text-navy">Ready to see your rates?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Compare personalized quotes from {siteConfig.carriers.length}+ carriers in about 60
            seconds — free, with no obligation.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="font-semibold">
              <Link href="/quote">See Instant Quotes</Link>
            </Button>
            <a
              href={`tel:${siteConfig.phone.tel}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy"
            >
              <Phone className="size-4 text-primary" aria-hidden /> {siteConfig.phone.display}
            </a>
          </div>
        </aside>
      </div>

      <div className="border-t bg-muted/40">
        <FaqSection
          heading={`${guide.topic} questions, answered`}
          faqs={guide.faqs}
        />
      </div>
    </article>
  );
}
