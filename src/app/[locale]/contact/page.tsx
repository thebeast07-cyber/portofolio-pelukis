// Contact: pertanyaan umum + pesanan lukisan (commission), plus jalur langsung email/WhatsApp.

import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";
import { getArtist } from "@/lib/data";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: t(params.locale).contact.title };
}

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = t(locale);
  const artist = getArtist();
  const waNumber = artist.contact.whatsapp.replace(/[^\d]/g, "");

  return (
    <div className="page max-w-2xl pt-10">
      <h1 className="h-display text-4xl">{dict.contact.title}</h1>
      <p className="mt-4 leading-relaxed">{dict.contact.intro}</p>
      <p className="mt-2 font-display text-lg">{dict.contact.promise}</p>

      <section id="inquiry" className="mt-12 scroll-mt-6 border-t border-line pt-6">
        <h2 className="h-display text-2xl">{dict.contact.general}</h2>
        <InquiryForm locale={locale} type="inquiry" />
      </section>

      {artist.commission.accepting ? (
        <section id="commission" className="mt-12 scroll-mt-6 border-t border-line pt-6">
          <h2 className="h-display text-2xl">{dict.contact.commission}</h2>
          <p className="mt-2 text-sm text-muted">{dict.contact.commissionIntro}</p>
          <InquiryForm locale={locale} type="commission" />
        </section>
      ) : null}

      <section className="mt-12 border-t border-line pt-6 text-sm">
        <h2 className="eyebrow">{dict.contact.direct}</h2>
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
          <dt className="text-muted">{dict.contact.email}</dt>
          <dd>
            <a href={`mailto:${artist.contact.email}`} className="underline underline-offset-4 hover:text-accent">
              {artist.contact.email}
            </a>
          </dd>
          <dt className="text-muted">{dict.contact.whatsapp}</dt>
          <dd>
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-accent"
            >
              {artist.contact.whatsapp}
            </a>
          </dd>
        </dl>
      </section>
    </div>
  );
}
