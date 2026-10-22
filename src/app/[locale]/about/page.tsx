// About: pusat situs (PRD). Dibangun seluruhnya dari dokumen artist.
// Urutan: potret + nama → statement → biografi → studio → pameran → pendidikan/penghargaan → commission.

import type { Metadata } from "next";
import Link from "next/link";
import ArtImage from "@/components/ArtImage";
import { getArtist } from "@/lib/data";
import { href, loc, paragraphs, t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const artist = getArtist();
  return { title: t(params.locale).about.title, description: loc(artist.bioShort, params.locale) };
}

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = t(locale);
  const artist = getArtist();
  const { commission } = artist;

  return (
    <div className="page pt-10">
      <div className="grid gap-8 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:items-end sm:gap-12">
        <div className="bg-surface">
          <ArtImage image={artist.portrait} locale={locale} kind="portrait" priority />
        </div>
        <div>
          <p className="eyebrow">{dict.about.title}</p>
          <h1 className="h-display mt-2 text-4xl sm:text-5xl">{artist.name}</h1>
          <p className="mt-4 leading-relaxed text-muted">{loc(artist.bioShort, locale)}</p>
        </div>
      </div>

      <div className="mt-16 max-w-2xl space-y-16">
        <section>
          <h2 className="eyebrow">{dict.about.statement}</h2>
          <div className="mt-4 space-y-4 font-display text-xl leading-relaxed">
            {paragraphs(loc(artist.statement, locale)).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section>
          <h2 className="eyebrow">{dict.about.biography}</h2>
          <div className="mt-4 space-y-4 leading-relaxed">
            {paragraphs(loc(artist.bioLong, locale)).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-16">
        <h2 className="eyebrow">{dict.about.process}</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {artist.processImages.map((img) => (
            <div key={img.seed} className="bg-surface">
              <ArtImage image={img} locale={locale} kind="process" />
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 max-w-2xl space-y-16">
        {artist.exhibitions.length ? (
          <section>
            <h2 className="eyebrow">{dict.about.exhibitions}</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line text-sm">
              {[...artist.exhibitions]
                .sort((a, b) => b.year - a.year)
                .map((e) => (
                  <li key={`${e.title}-${e.year}`} className="grid grid-cols-[3.5rem_1fr] gap-3 py-3">
                    <span className="text-muted">{e.year}</span>
                    <span>
                      <span className="italic">{e.title}</span>, {e.venue}, {e.city}
                      <span className="text-muted"> · {e.solo ? dict.about.solo : dict.about.group}</span>
                    </span>
                  </li>
                ))}
            </ul>
          </section>
        ) : null}

        {artist.education.length || artist.awards.length ? (
          <section className="grid gap-8 sm:grid-cols-2">
            {artist.education.length ? (
              <div>
                <h2 className="eyebrow">{dict.about.education}</h2>
                <ul className="mt-3 space-y-1 text-sm">
                  {artist.education.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {artist.awards.length ? (
              <div>
                <h2 className="eyebrow">{dict.about.awards}</h2>
                <ul className="mt-3 space-y-1 text-sm">
                  {artist.awards.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ) : null}

        <section id="commissions" className="scroll-mt-6 bg-surface px-6 py-8">
          <h2 className="h-display text-2xl">{dict.about.commissions}</h2>
          <p className="mt-2">{commission.accepting ? dict.about.accepting : dict.about.notAccepting}</p>
          {commission.accepting ? (
            <>
              <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                <dt className="text-muted">{dict.about.sizeRange}</dt>
                <dd>{loc(commission.sizeRange, locale)}</dd>
                <dt className="text-muted">{dict.about.leadTime}</dt>
                <dd>{loc(commission.leadTime, locale)}</dd>
                <dt className="text-muted">{dict.about.deposit}</dt>
                <dd>{loc(commission.deposit, locale)}</dd>
              </dl>
              <h3 className="eyebrow mt-6">{dict.about.howItWorks}</h3>
              <p className="mt-2 leading-relaxed">{loc(commission.process, locale)}</p>
              <Link href={`${href(locale, "/contact")}#commission`} className="btn-solid mt-6">
                {dict.about.requestCommission}
              </Link>
            </>
          ) : null}
        </section>

        <section>
          <h2 className="eyebrow">{dict.about.signature}</h2>
          <div className="mt-3 w-48 bg-surface">
            <ArtImage image={artist.signature} locale={locale} kind="signature" />
          </div>
        </section>
      </div>
    </div>
  );
}
