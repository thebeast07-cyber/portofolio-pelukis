// Halaman detail karya. Isi wajib dari PRD: spesifikasi cm + inch, status bahasa seni,
// cerita, pameran, cara kirim, bea masuk, COA, catatan warna, dan tombol inquiry.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArtistBlock from "@/components/ArtistBlock";
import ArtworkMedia from "@/components/ArtworkMedia";
import InquiryForm from "@/components/InquiryForm";
import ViewInRoom from "@/components/ViewInRoom";
import { formatCm, formatInch, getOrderedImages, getPrimaryImage } from "@/lib/art";
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
            extraSlide={{
              label: dict.room.title,
              thumb: dict.room.open,
              content: (
                <ViewInRoom
                  image={getPrimaryImage(artwork)}
                  widthCm={artwork.dimensions.width}
                  heightCm={artwork.dimensions.height}
                  locale={locale}
                />
              ),
            }}
          />
        </div>

        <div>
          {series ? (
            <Link href={`${href(locale, "/gallery")}#${series.slug}`} className="eyebrow hover:text-accent">
              {loc(series.title, locale)}
            </Link>
          ) : null}
          <div className="mt-2 flex items-start justify-between gap-3">
            <h1 className="h-display text-[28px] font-semibold leading-tight sm:text-4xl">{title}</h1>
            <span className="badge mt-1">{dict.status[artwork.status]}</span>
          </div>
          <p className="mt-1.5 text-sm text-muted">
            {artist.name} · {artwork.year}
          </p>

          {/* Spesifikasi: baris bergaris seperti desain mobile. Tidak ada baris harga (aturan #1). */}
          <dl className="mt-5 border-t border-line text-sm">
            <div className="flex justify-between gap-6 border-b border-line py-3">
              <dt className="text-muted">{dict.artwork.medium}</dt>
              <dd className="text-right font-medium">{artwork.medium}</dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-line py-3">
              <dt className="text-muted">{dict.artwork.dimensions}</dt>
              <dd className="text-right font-medium">
                {formatCm(artwork.dimensions)}
                <br />
                <span className="font-normal text-muted">{formatInch(artwork.dimensions)}</span>
              </dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-line py-3">
              <dt className="text-muted">{dict.artwork.year}</dt>
              <dd className="text-right font-medium">{artwork.year}</dd>
            </div>
          </dl>

          {isPrivate ? <p className="mt-6 text-sm">{dict.artwork.privateNote}</p> : null}
          <a href="#inquire" className="btn-solid mt-5 h-[52px] w-full text-[15px] sm:w-auto">
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
