// Root layout per bahasa. <html lang> ikut bahasa halaman.
// Font self-hosted lewat @fontsource (tanpa request ke Google saat build/runtime).

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/inter";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "../globals.css";
import BottomNav from "@/components/BottomNav";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getArtist } from "@/lib/data";
import { isLocale, locales, t } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const { name } = getArtist();
  return {
    title: { default: name, template: `%s — ${name}` },
    description: t(params.locale).meta.siteDescription(name),
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = t(locale);

  return (
    <html lang={locale}>
      {/* pb: ruang untuk nav bawah (hanya di mobile) */}
      <body className="pb-[var(--nav-bottom-h)] md:pb-0">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:bg-bg focus:p-2">
          {dict.skipToContent}
        </a>
        <SiteHeader locale={locale} />
        <main id="main">{children}</main>
        <SiteFooter locale={locale} />
        <BottomNav locale={locale} />
      </body>
    </html>
  );
}
