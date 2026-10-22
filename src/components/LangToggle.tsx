"use client";

// Pindah bahasa di halaman yang sama: /en/gallery/x ↔ /id/gallery/x.

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/types";

export default function LangToggle({ locale, label, short }: { locale: Locale; label: string; short: string }) {
  const pathname = usePathname() ?? `/${locale}`;
  const target: Locale = locale === "en" ? "id" : "en";
  const rest = pathname.replace(/^\/(en|id)(?=\/|$)/, "");

  return (
    <Link
      href={`/${target}${rest}`}
      hrefLang={target}
      lang={target}
      aria-label={label}
      title={label}
      className="border border-line px-2 py-1 text-xs tracking-wide hover:border-ink"
    >
      {short}
    </Link>
  );
}
