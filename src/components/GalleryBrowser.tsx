"use client";

// Body of work: dikelompokkan per seri, disaring menurut tahun, medium, dan ukuran (DISCOVERY K2).
// Data yang masuk sudah PublicArtwork, jadi tidak ada harga di payload halaman.

import { useMemo, useState } from "react";
import ArtworkCard from "./ArtworkCard";
import { getSizeCategory, type SizeCategory } from "@/lib/art";
import { t } from "@/lib/i18n";
import type { Locale, PublicArtwork } from "@/lib/types";

type SeriesSummary = { slug: string; title: string; description: string; years: string };
type Props = { artworks: PublicArtwork[]; series: SeriesSummary[]; locale: Locale };

const ALL = "all";
const sizeOrder: SizeCategory[] = ["small", "medium", "large"];

export default function GalleryBrowser({ artworks, series, locale }: Props) {
  const dict = t(locale);
  const [year, setYear] = useState(ALL);
  const [medium, setMedium] = useState(ALL);
  const [size, setSize] = useState(ALL);

  const years = useMemo(() => Array.from(new Set(artworks.map((a) => a.year))).sort((a, b) => b - a), [artworks]);
  const mediums = useMemo(() => Array.from(new Set(artworks.map((a) => a.medium))).sort(), [artworks]);
  const sizes = useMemo(
    () => sizeOrder.filter((s) => artworks.some((a) => getSizeCategory(a.dimensions) === s)),
    [artworks],
  );

  const filtered = artworks.filter(
    (a) =>
      (year === ALL || String(a.year) === year) &&
      (medium === ALL || a.medium === medium) &&
      (size === ALL || getSizeCategory(a.dimensions) === size),
  );
  const isFiltered = year !== ALL || medium !== ALL || size !== ALL;

  const groups = [
    ...series.map((s) => ({ ...s, works: filtered.filter((a) => a.seriesSlug === s.slug) })),
    {
      slug: "other-works",
      title: dict.gallery.standalone,
      description: "",
      years: "",
      works: filtered.filter((a) => !a.seriesSlug || !series.some((s) => s.slug === a.seriesSlug)),
    },
  ].filter((g) => g.works.length > 0);

  const select = "field py-2 text-sm";

  return (
    <>
      <fieldset className="mt-8 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-end sm:gap-4">
        <legend className="sr-only">{dict.gallery.filters}</legend>
        <label className="text-xs text-muted">
          {dict.gallery.year}
          <select className={select} value={year} onChange={(e) => setYear(e.target.value)}>
            <option value={ALL}>{dict.gallery.all}</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs text-muted">
          {dict.gallery.medium}
          <select className={select} value={medium} onChange={(e) => setMedium(e.target.value)}>
            <option value={ALL}>{dict.gallery.all}</option>
            {mediums.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs text-muted">
          {dict.gallery.size}
          <select className={select} value={size} onChange={(e) => setSize(e.target.value)}>
            <option value={ALL}>{dict.gallery.all}</option>
            {sizes.map((s) => (
              <option key={s} value={s}>
                {dict.size[s]} ({dict.sizeHint[s]})
              </option>
            ))}
          </select>
        </label>
        {isFiltered ? (
          <button
            type="button"
            className="col-span-3 justify-self-start text-sm underline underline-offset-4 hover:text-accent sm:pb-3"
            onClick={() => {
              setYear(ALL);
              setMedium(ALL);
              setSize(ALL);
            }}
          >
            {dict.gallery.clear}
          </button>
        ) : null}
      </fieldset>

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {filtered.length === 0 ? dict.gallery.noResults : dict.gallery.works(filtered.length)}
      </p>

      {groups.map((g) => (
        <section key={g.slug} id={g.slug} className="mt-12 scroll-mt-6">
          <div className="border-t border-line pt-6">
            <h2 className="h-display text-2xl">{g.title}</h2>
            {g.years ? <p className="mt-1 text-sm text-muted">{g.years}</p> : null}
            {g.description ? <p className="mt-3 max-w-2xl">{g.description}</p> : null}
          </div>
          <div className="mt-6 columns-2 gap-4 md:columns-3 md:gap-6">
            {g.works.map((a) => (
              <div key={a.slug} className="mb-8 break-inside-avoid">
                <ArtworkCard artwork={a} locale={locale} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
