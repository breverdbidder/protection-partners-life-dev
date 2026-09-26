import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Header from "@/components/site/header";
import Footer from "@/components/site/footer";
import { siteConfig, BASE_URL } from "@/lib/site-config";
import { jsonLd, pageSchema } from "@/lib/schema";

const figtree = Figtree({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${siteConfig.name} | Compare Life Insurance Quotes`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: BASE_URL,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${figtree.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(pageSchema({ type: "layout" })) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
