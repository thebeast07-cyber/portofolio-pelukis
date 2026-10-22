import Link from "next/link";
import ArtImage from "./ArtImage";
import { getArtist } from "@/lib/data";
import { href, loc, t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

/** Kartu kecil "tentang seniman" — supaya setiap halaman karya tetap terhubung ke orangnya. */
export default function ArtistBlock({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const artist = getArtist();

  return (
    <aside className="flex gap-4 border-t border-line pt-6">
      <div className="w-20 shrink-0 self-start bg-surface">
        <ArtImage image={artist.portrait} locale={locale} kind="portrait" />
      </div>
      <div className="text-sm">
        <p className="eyebrow">{dict.artwork.aboutArtist}</p>
        <p className="mt-2 leading-relaxed">{loc(artist.bioShort, locale)}</p>
        <Link href={href(locale, "/about")} className="mt-2 inline-block underline underline-offset-4 hover:text-accent">
          {dict.home.meetArtist}
        </Link>
      </div>
    </aside>
  );
}
