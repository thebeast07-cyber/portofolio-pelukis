import type { Metadata } from "next";
import GalleryBrowser from "@/components/GalleryBrowser";
import { getArtworks, getSeries } from "@/lib/data";
import { loc, t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: t(params.locale).gallery.title };
}

export default function GalleryPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = t(locale);
  // Teks seri sudah diterjemahkan di server supaya komponen client cukup menerima string.
  const series = getSeries().map((s) => ({
    slug: s.slug,
    title: loc(s.title, locale),
    description: loc(s.description, locale),
    years: s.yearFrom === s.yearTo ? `${s.yearFrom}` : `${s.yearFrom}–${s.yearTo}`,
  }));

  return (
    <div className="page pt-10">
      <h1 className="h-display text-4xl">{dict.gallery.title}</h1>
      <p className="mt-4 max-w-2xl text-muted">{dict.gallery.intro}</p>
      <GalleryBrowser artworks={getArtworks()} series={series} locale={locale} />
    </div>
  );
}
