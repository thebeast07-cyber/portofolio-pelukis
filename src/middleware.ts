// Semua halaman hidup di bawah /en atau /id. Path tanpa bahasa diarahkan ke /en (bahasa utama).

import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  // Lewati API, file internal Next, dan file statis (yang punya titik, mis. favicon.ico).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
