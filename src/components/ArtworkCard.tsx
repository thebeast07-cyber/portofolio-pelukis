import Link from "next/link";
import ArtImage from "./ArtImage";
import { getPrimaryImage } from "@/lib/art";
import { href, loc, t } from "@/lib/i18n";
import type { Locale, PublicArtwork } from "@/lib/types";

/** Kartu karya di grid. Tidak pernah menampilkan harga. */
export default function ArtworkCard({ artwork, locale }: { artwork: PublicArtwork; locale: Locale }) {
  const dict = t(locale);
  const { width, height } = artwork.dimensions;

  return (
    <Link href={href(locale, `/gallery/${artwork.slug}`)} className="group block">
      <div className="bg-surface">
        <ArtImage image={getPrimaryImage(artwork)} locale={locale} ratio={width / height} />
      </div>
      <div className="mt-3 text-sm">
        <p className="font-display text-base group-hover:text-accent">{loc(artwork.title, locale)}</p>
        <p className="text-muted">
          {artwork.year} · {dict.status[artwork.status]}
        </p>
      </div>
    </Link>
  );
}
