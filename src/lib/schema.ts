// JSON-LD schema engine, adapted from the seo-site-builder skill for a
// (non-local) insurance agency. Pages call pageSchema() rather than assembling
// nodes by hand, and each page injects exactly one <script> with a single @graph:
//
//   <script type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: jsonLd(pageSchema({...})) }} />
//
// No aggregateRating node is emitted anywhere: the scaffold's review stats are
// placeholders, and fabricated ratings must never appear in structured data.
// When real review data exists, add it to businessEntity deliberately.

import { siteConfig, BASE_URL } from "@/lib/site-config";

export const BUSINESS_ID = `${BASE_URL}/#business`;
export const WEBSITE_ID = `${BASE_URL}/#website`;

// Escapes "<" so a value containing "</script>" can't break out of the JSON-LD tag.
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const businessEntity = {
  "@type": "InsuranceAgency",
  "@id": BUSINESS_ID,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: BASE_URL,
  description: siteConfig.description,
  areaServed: { "@type": "Country", name: "United States" },
};

export const websiteEntity = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: BASE_URL,
  name: siteConfig.name,
  publisher: { "@id": BUSINESS_ID },
};

export const businessRef = { "@id": BUSINESS_ID };

export type Crumb = { name: string; item: string };
export type SchemaFaq = { q: string; a: string };

export function breadcrumbList(pageUrl: string, crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}

export function faqPage(faqs: SchemaFaq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

function webPageNode(o: {
  pageUrl: string;
  name: string;
  description: string;
  mainEntityId?: string;
}) {
  return {
    "@type": "WebPage",
    "@id": `${o.pageUrl}#webpage`,
    url: o.pageUrl,
    name: o.name,
    description: o.description,
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": `${o.pageUrl}#breadcrumb` },
    ...(o.mainEntityId ? { mainEntity: { "@id": o.mainEntityId } } : {}),
  };
}

function articleNode(o: {
  pageUrl: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@type": "Article",
    "@id": `${o.pageUrl}#article`,
    headline: o.headline,
    description: o.description,
    url: o.pageUrl,
    datePublished: o.datePublished,
    dateModified: o.dateModified ?? o.datePublished,
    author: businessRef,
    publisher: businessRef,
    isPartOf: { "@id": WEBSITE_ID },
  };
}

function itemListNode(pageUrl: string, items: { name: string; url: string }[]) {
  return {
    "@type": "ItemList",
    "@id": `${pageUrl}#list`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

function schemaGraph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export type PageSchemaCtx =
  /** Site-wide knowledge graph, injected once in app/layout.tsx. */
  | { type: "layout" }
  /** Standard page (homepage, quote page). */
  | {
      type: "page";
      pageUrl: string;
      title: string;
      description: string;
      crumbs: Crumb[];
      faqs?: SchemaFaq[];
    }
  /** Listing page (guides index). */
  | {
      type: "collection";
      pageUrl: string;
      title: string;
      description: string;
      crumbs: Crumb[];
      items: { name: string; url: string }[];
    }
  /** Guide / article page. */
  | {
      type: "article";
      pageUrl: string;
      title: string;
      description: string;
      crumbs: Crumb[];
      datePublished: string;
      dateModified?: string;
      faqs?: SchemaFaq[];
    };

export function pageSchema(ctx: PageSchemaCtx) {
  switch (ctx.type) {
    case "layout":
      return schemaGraph(businessEntity, websiteEntity);

    case "page": {
      const nodes: object[] = [
        breadcrumbList(ctx.pageUrl, ctx.crumbs),
        webPageNode({ pageUrl: ctx.pageUrl, name: ctx.title, description: ctx.description }),
      ];
      if (ctx.faqs?.length) nodes.push(faqPage(ctx.faqs));
      return schemaGraph(...nodes);
    }

    case "collection":
      return schemaGraph(
        breadcrumbList(ctx.pageUrl, ctx.crumbs),
        {
          "@type": "CollectionPage",
          "@id": `${ctx.pageUrl}#webpage`,
          url: ctx.pageUrl,
          name: ctx.title,
          description: ctx.description,
          isPartOf: { "@id": WEBSITE_ID },
          breadcrumb: { "@id": `${ctx.pageUrl}#breadcrumb` },
          mainEntity: { "@id": `${ctx.pageUrl}#list` },
        },
        itemListNode(ctx.pageUrl, ctx.items),
      );

    case "article": {
      const nodes: object[] = [
        breadcrumbList(ctx.pageUrl, ctx.crumbs),
        articleNode({
          pageUrl: ctx.pageUrl,
          headline: ctx.title,
          description: ctx.description,
          datePublished: ctx.datePublished,
          dateModified: ctx.dateModified,
        }),
        webPageNode({
          pageUrl: ctx.pageUrl,
          name: ctx.title,
          description: ctx.description,
          mainEntityId: `${ctx.pageUrl}#article`,
        }),
      ];
      if (ctx.faqs?.length) nodes.push(faqPage(ctx.faqs));
      return schemaGraph(...nodes);
    }
  }
}
