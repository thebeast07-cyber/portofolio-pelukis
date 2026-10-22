// Halaman detail karya. Isi wajib dari PRD: spesifikasi cm + inch, status bahasa seni,
// cerita, pameran, cara kirim, bea masuk, COA, catatan warna, dan tombol inquiry.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArtistBlock from "@/components/ArtistBlock";
import ArtworkMedia from "@/components/ArtworkMedia";
import InquiryForm from "@/components/InquiryForm";
import { formatCm, formatInch, getOrderedImages } from "@/lib/art";
import { getArtist, getArtwork, getArtworks, getSeriesBySlug } from "@/lib/data";
import { href, loc, paragraphs, t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

type Params = { locale: Locale; slug: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return getArtworks().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const artwork = getArtwork(params.slug);
  if (!artwork) return {};
  const title = loc(artwork.title, params.locale);
  const { name } = getArtist();
  return {
    title: `${title}, ${artwork.year}`,
    description: `${title} (${artwork.year}) by ${name}. ${artwork.medium}, ${formatCm(artwork.dimensions)} / ${formatInch(artwork.dimensions)}.`,
  };
}

export default function ArtworkPage({ params }: { params: Params }) {
  const { locale } = params;
  const artwork = getArtwork(params.slug);
  if (!artwork) notFound();

  const dict = t(locale);
  const artist = getArtist();
  const series = artwork.seriesSlug ? getSeriesBySlug(artwork.seriesSlug) : undefined;
  const title = loc(artwork.title, locale);
  const isPrivate = artwork.status === "privateCollection";

  return (
    <div className="page pt-6">
      <Link href={href(locale, "/gallery")} className="text-sm text-muted hover:text-accent">
        ← {dict.artwork.back}
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
        <div className="lg:sticky lg:top-6 lg:self-start">
          <ArtworkMedia
            images={getOrderedImages(artwork)}
            ratio={artwork.dimensions.width / artwork.dimensions.height}
            locale={locale}
            watermark={artist.name}
          />
        </div>

        <div>
          {series ? (
            <Link href={`${href(locale, "/gallery")}#${series.slug}`} className="eyebrow hover:text-accent">
              {loc(series.title, locale)}
            </Link>
          ) : null}
          <h1 className="h-display mt-2 text-3xl sm:text-4xl">{title}</h1>

          <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
            <dt className="text-muted">{dict.artwork.year}</dt>
            <dd>{artwork.year}</dd>
            <dt className="text-muted">{dict.artwork.medium}</dt>
            <dd>{artwork.medium}</dd>
            <dt className="text-muted">{dict.artwork.dimensions}</dt>
            <dd>
              {formatCm(artwork.dimensions)}
              <br />
              <span className="text-muted">{formatInch(artwork.dimensions)}</span>
            </dd>
            <dt className="text-muted">{dict.artwork.status}</dt>
            <dd>{dict.status[artwork.status]}</dd>
          </dl>

          {isPrivate ? <p className="mt-6 text-sm">{dict.artwork.privateNote}</p> : null}
          <a href="#inquire" className="btn-solid mt-6 w-full sm:w-auto">
            {isPrivate ? dict.artwork.requestSimilar : dict.artwork.inquire}
          </a>

          <section className="mt-10">
            <h2 className="eyebrow">{dict.artwork.story}</h2>
            <div className="mt-3 space-y-4 leading-relaxed">
              {paragraphs(loc(artwork.story, locale)).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {artwork.exhibitions?.length ? (
            <section className="mt-8">
              <h2 className="eyebrow">{dict.artwork.exhibitions}</h2>
              <ul className="mt-3 space-y-1 text-sm">
                {artwork.exhibitions.map((e) => (
                  <li key={`${e.title}-${e.year}`}>
                    <span className="italic">{e.title}</span>, {e.venue}, {e.city}, {e.year}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="mt-8 space-y-3 text-sm">
            {artwork.shippingNote ? (
              <div>
                <h2 className="eyebrow">{dict.artwork.shipping}</h2>
                <p className="mt-2">{dict.shipping[artwork.shippingNote]}</p>
              </div>
            ) : null}
            <p>{dict.artwork.duties}</p>
            <div>
              <h2 className="eyebrow mt-6">{dict.artwork.receive}</h2>
              <p className="mt-2">{dict.artwork.coa}</p>
            </div>
            <p className="text-muted">{dict.artwork.colour}</p>
          </section>

          <section id="inquire" className="mt-10 scroll-mt-6 border-t border-line pt-6">
            <h2 className="h-display text-2xl">{isPrivate ? dict.artwork.requestSimilar : dict.artwork.inquire}</h2>
            <InquiryForm
              locale={locale}
              type={isPrivate ? "commission" : "inquiry"}
              artwork={{ slug: artwork.slug, title: `${title}, ${artwork.year}` }}
            />
          </section>

          <div className="mt-10">
            <ArtistBlock locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}
