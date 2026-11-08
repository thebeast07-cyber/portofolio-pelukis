import Link from "next/link";
import LangToggle from "./LangToggle";
import { getArtist } from "@/lib/data";
import { href, t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

// Mobile: logo + toggle bahasa (menu utama ada di BottomNav).
// md ke atas: logo + nav teks.
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
      <div className="page flex items-center justify-between gap-x-6 py-4">
        <Link href={href(locale)} className="h-display text-[26px] font-semibold leading-none tracking-tight">
          {name}
          <span className="text-accent" aria-hidden="true">
            .
          </span>
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <nav aria-label={dict.nav.menu} className="hidden items-center gap-5 md:flex">
            {links.map((l) => (
              <Link key={l.path} href={href(locale, l.path)} className="hover:text-accent">
                {l.label}
              </Link>
            ))}
          </nav>
          <LangToggle locale={locale} label={dict.switchTo} short={dict.switchToShort} />
        </div>
      </div>
    </header>
  );
}
