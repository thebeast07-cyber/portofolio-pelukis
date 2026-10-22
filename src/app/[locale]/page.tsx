// Home: karya membuka, baru senimannya (PRD Arsitektur Informasi).
// Urutan: hero karya → nama + statement → kenalan dengan seniman → dari studio → seri → ajakan bertanya.

import Link from "next/link";
import ArtImage from "@/components/ArtImage";
import { getPrimaryImage } from "@/lib/art";
import { getArtist, getArtworksBySeries, getHeroArtwork, getSeries } from "@/lib/data";
import { href, loc, paragraphs, t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = t(locale);
  const artist = getArtist();
  const hero = getHeroArtwork();
  const series = getSeries();
  const statementOpening = paragraphs(loc(artist.statement, locale))[0];

  return (
    <>
      {/* 1. Satu karya besar */}
      <section className="page pt-6 sm:pt-10">
        <Link href={href(locale, `/gallery/${hero.slug}`)} className="group block">
          <div className="bg-surface">
            <ArtImage
              image={getPrimaryImage(hero)}
              locale={locale}
              ratio={hero.dimensions.width / hero.dimensions.height}
              priority
            />
          </div>
          <p className="mt-3 text-sm text-muted">
            <span className="text-ink group-hover:text-accent">{loc(hero.title, locale)}</span>, {hero.year} ·{" "}
            {hero.medium}
          </p>
        </Link>
      </section>

      {/* 2. Nama dan statement */}
      <section className="page mt-16 max-w-3xl">
        <h1 className="h-display text-4xl sm:text-5xl">{artist.name}</h1>
        <p className="mt-6 text-lg leading-relaxed">{statementOpening}</p>
      </section>

      {/* 3. Kenalan dengan senimannya */}
      <section className="page mt-16">
        <div className="grid items-center gap-6 border-t border-line pt-10 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-10">
          <div className="max-w-xs bg-surface sm:max-w-none">
            <ArtImage image={artist.portrait} locale={locale} kind="portrait" />
          </div>
          <div>
            <p className="eyebrow">{dict.home.meetArtist}</p>
            <p className="mt-4 leading-relaxed">{loc(artist.bioShort, locale)}</p>
            <Link href={href(locale, "/about")} className="btn-ghost mt-6">
              {dict.home.readMore}
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Dari studio — bukti karyanya dikerjakan tangan */}
      <section className="mt-16">
        <h2 className="page eyebrow">{dict.home.fromStudio}</h2>
        <div className="page mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
          {artist.processImages.map((img) => (
            <div key={img.seed} className="w-[70%] shrink-0 snap-start bg-surface sm:w-[30%]">
              <ArtImage image={img} locale={locale} kind="process" />
            </div>
          ))}
        </div>
      </section>

      {/* 5. Seri — body of work */}
      <section className="page mt-16">
        <h2 className="eyebrow">{dict.home.series}</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {series.map((s) => {
            const works = getArtworksBySeries(s.slug);
            const cover = works[0];
            return (
              <li key={s.slug}>
                <Link
                  href={`${href(locale, "/gallery")}#${s.slug}`}
                  className="group flex items-center gap-4 py-4"
                >
                  {cover ? (
                    <div className="w-20 shrink-0 bg-surface">
                      <ArtImage image={getPrimaryImage(cover)} locale={locale} ratio={1} />
                    </div>
                  ) : null}
                  <div>
                    <p className="font-display text-lg group-hover:text-accent">{loc(s.title, locale)}</p>
                    <p className="text-sm text-muted">
                      {s.yearFrom === s.yearTo ? s.yearFrom : `${s.yearFrom}–${s.yearTo}`} ·{" "}
                      {t(locale).gallery.works(works.length)}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link href={href(locale, "/gallery")} className="mt-6 inline-block underline underline-offset-4 hover:text-accent">
          {dict.home.allWork}
        </Link>
      </section>

      {/* 6. Ajakan bertanya */}
      <section className="page mt-16">
        <div className="bg-surface px-6 py-10 sm:px-10">
          <h2 className="h-display text-2xl">{dict.home.ctaTitle}</h2>
          <p className="mt-3 max-w-xl">{dict.home.ctaBody}</p>
          <Link href={href(locale, "/contact")} className="btn-solid mt-6">
            {dict.home.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
