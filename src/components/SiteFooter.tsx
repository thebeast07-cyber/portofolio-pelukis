import Link from "next/link";
import { getArtist } from "@/lib/data";
import { href, t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export default function SiteFooter({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const artist = getArtist();

  return (
    <footer className="mt-20 border-t border-line">
      <div className="page flex flex-col gap-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
        <Link href={href(locale, "/contact")} className="underline underline-offset-4 hover:text-accent">
          {dict.footer.inquire}
        </Link>
        <div className="flex gap-4">
          {artist.socials.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer me" className="hover:text-accent">
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="page pb-10 text-xs text-muted">{dict.footer.rights(artist.name, new Date().getFullYear())}</div>
    </footer>
  );
}
