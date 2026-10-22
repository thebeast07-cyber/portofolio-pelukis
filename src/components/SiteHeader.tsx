import Link from "next/link";
import LangToggle from "./LangToggle";
import { getArtist } from "@/lib/data";
import { href, t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export default function SiteHeader({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const { name } = getArtist();
  const links = [
    { path: "/gallery", label: dict.nav.work },
    { path: "/about", label: dict.nav.about },
    { path: "/contact", label: dict.nav.contact },
  ];

  return (
    <header className="border-b border-line">
      <div className="page flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4">
        <Link href={href(locale)} className="h-display text-lg">
          {name}
        </Link>
        <nav aria-label={dict.nav.menu} className="flex items-center gap-5 text-sm">
          {links.map((l) => (
            <Link key={l.path} href={href(locale, l.path)} className="hover:text-accent">
              {l.label}
            </Link>
          ))}
          <LangToggle locale={locale} label={dict.switchTo} short={dict.switchToShort} />
        </nav>
      </div>
    </header>
  );
}
