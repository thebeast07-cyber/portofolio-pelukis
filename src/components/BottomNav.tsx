"use client";

// Nav bawah khusus mobile (desain "Mobile Portfolio UI"): Karya / Tentang / Kontak.
// Di layar md ke atas disembunyikan; nav teks di SiteHeader yang dipakai.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { href, t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export default function BottomNav({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const pathname = usePathname() ?? "";
  const items = [
    { path: "/gallery", label: dict.nav.work },
    { path: "/about", label: dict.nav.about },
    { path: "/contact", label: dict.nav.contact },
  ];

  return (
    <nav
      aria-label={dict.nav.menu}
      className="fixed inset-x-0 bottom-0 z-40 flex h-[var(--nav-bottom-h)] items-center justify-around border-t border-line bg-bg md:hidden"
    >
      {items.map((i) => {
        const target = href(locale, i.path);
        const active = pathname === target || pathname.startsWith(`${target}/`);
        return (
          <Link
            key={i.path}
            href={target}
            aria-current={active ? "page" : undefined}
            className={`flex h-12 items-center px-[18px] text-[13px] ${
              active ? "font-semibold text-accent" : "font-medium text-muted"
            }`}
          >
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}
