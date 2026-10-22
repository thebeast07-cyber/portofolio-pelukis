"use client";

// Galeri foto di halaman detail: geser (swipe) di mobile, thumbnail di bawah, zoom per foto.
// Slide tambahan (View in Room) masuk lewat `extraSlide`, jadi tetap bagian dari galeri, bukan modal (PRD).

import { useEffect, useRef, useState, type ReactNode } from "react";
import ArtImage from "./ArtImage";
import { t } from "@/lib/i18n";
import type { ArtImage as ArtImageType, Locale } from "@/lib/types";

type Props = {
  images: ArtImageType[];
  /** Rasio karya (lebar/tinggi), dipakai untuk foto primary. */
  ratio: number;
  locale: Locale;
  watermark: string;
  extraSlide?: { label: string; thumb: ReactNode; content: ReactNode };
};

export default function ArtworkMedia({ images, ratio, locale, watermark, extraSlide }: Props) {
  const dict = t(locale);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState<ArtImageType | null>(null);
  const total = images.length + (extraSlide ? 1 : 0);

  const ratioOf = (img: ArtImageType) => (img.role === "primary" ? ratio : undefined);

  const goTo = (i: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: el.clientWidth * i, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = track.current;
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoomed(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoomed]);

  return (
    <div>
      <div
        ref={track}
        onScroll={onScroll}
        role="region"
        aria-roledescription="carousel"
        aria-label={dict.artwork.gallery}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]"
      >
        {images.map((img, i) => {
          const r = ratioOf(img) ?? 1;
          return (
            <div
              key={`${img.role}-${img.seed}`}
              role="group"
              aria-roledescription="slide"
              aria-label={dict.artwork.imageOf(i + 1, total)}
              className="relative flex aspect-square w-full shrink-0 snap-center items-center justify-center bg-surface p-4 sm:p-8"
            >
              <div style={{ width: r >= 1 ? "100%" : `${r * 100}%` }}>
                <ArtImage image={img} locale={locale} ratio={ratioOf(img)} watermark={watermark} priority={i === 0} />
              </div>
              <button
                type="button"
                onClick={() => setZoomed(img)}
                className="absolute bottom-3 right-3 bg-bg/90 px-3 py-2 text-xs tracking-wide hover:bg-ink hover:text-bg"
              >
                {dict.artwork.zoom}
              </button>
            </div>
          );
        })}
        {extraSlide ? (
          <div
            role="group"
            aria-roledescription="slide"
            aria-label={extraSlide.label}
            className="flex w-full shrink-0 snap-center items-center bg-surface"
          >
            {extraSlide.content}
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto">
        {images.map((img, i) => (
          <button
            key={`${img.role}-${img.seed}`}
            type="button"
            onClick={() => goTo(i)}
            aria-label={dict.artwork.imageOf(i + 1, total)}
            aria-current={active === i}
            className={`w-14 shrink-0 border bg-surface p-1 ${active === i ? "border-ink" : "border-transparent"}`}
          >
            <ArtImage image={img} locale={locale} ratio={1} />
          </button>
        ))}
        {extraSlide ? (
          <button
            type="button"
            onClick={() => goTo(images.length)}
            aria-current={active === images.length}
            className={`shrink-0 border px-3 text-xs ${active === images.length ? "border-ink" : "border-line"}`}
          >
            {extraSlide.thumb}
          </button>
        ) : null}
      </div>

      {zoomed ? (
        <div role="dialog" aria-modal="true" aria-label={dict.artwork.zoom} className="fixed inset-0 z-50 bg-bg">
          <button
            type="button"
            onClick={() => setZoomed(null)}
            className="btn-solid absolute right-3 top-3 z-10"
            autoFocus
          >
            {dict.artwork.closeZoom}
          </button>
          {/* Zoom sederhana: gambar 2× lebar layar, digeser dengan scroll/jari.
              Nanti diganti zoom berbasis tile saat gambar CMS masuk (DISCOVERY K4). */}
          <div className="h-full w-full overflow-auto">
            <div className="w-[200vw] max-w-[2000px]">
              <ArtImage image={zoomed} locale={locale} ratio={ratioOf(zoomed)} watermark={watermark} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
