// Terima inquiry. Sekarang: validasi lalu catat. Nanti: kirim email lewat Resend/Formspree
// ke alamat seniman (PRD Alur Inquiry langkah 3).

import { NextResponse } from "next/server";
import { getArtwork } from "@/lib/data";
import { validateInquiry } from "@/lib/inquiry";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const result = validateInquiry(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }
  const inquiry = result.data;

  // Bot mengisi honeypot. Balas sukses supaya bot tidak mencoba cara lain, tapi jangan diproses.
  if (inquiry.website) return NextResponse.json({ ok: true });

  // Judul karya diambil dari data, bukan dari browser (PRD: tidak bisa diubah pengunjung).
  const artwork = inquiry.artworkSlug ? getArtwork(inquiry.artworkSlug) : undefined;
  if (inquiry.artworkSlug && !artwork) {
    return NextResponse.json({ ok: false, error: "unknown_artwork" }, { status: 400 });
  }
  // Karya koleksi pribadi selalu jadi permintaan commission (PRD: penanda commission).
  const type = artwork?.status === "privateCollection" ? "commission" : inquiry.type;

  // TODO(langkah email): kirim ke getArtist().contact.email dengan reply-to = inquiry.email.
  // Sengaja tidak mencatat nama/email/pesan ke log server.
  console.info("[inquiry]", { type, artwork: artwork?.slug ?? null, country: inquiry.country });

  return NextResponse.json({ ok: true });
}
