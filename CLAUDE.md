# CLAUDE.md — Website Portofolio Pelukis

Baca `docs/PRD.md` sebelum mengerjakan apa pun. PRD itu sumber kebenaran; kalau kode dan PRD beda, tanya dulu, jangan putuskan sendiri. `docs/PRD-asli.pdf` punya diagram yang tidak ikut terekstrak rapi.

## Apa ini
Portofolio satu pelukis, **bukan toko**. Tidak ada harga di halaman, tidak ada keranjang, tidak ada checkout, tidak ada login, tidak ada database. Pengunjung bertanya lewat form inquiry, lalu percakapan lanjut di email/WhatsApp.

## Stack
Next.js 14 (App Router) + TypeScript + Tailwind 3. CMS target: Sanity (belum dipasang; sekarang pakai data dummy lokal). Hosting target: Vercel. Form email: Resend atau Formspree.

## Aturan yang tidak boleh dilanggar
1. **Harga tidak pernah dirender.** `internalPrice` hanya ada di data/CMS. Jangan tampilkan di UI, meta tag, structured data, atau sitemap.
2. **Mobile-first.** Nilai setiap layout di lebar 375px dulu. Mayoritas pengunjung datang dari link Instagram.
3. **Status karya pakai bahasa dunia seni**: `available` → Available, `privateCollection` → Private collection, `exhibited` → Exhibited. Jangan pernah tulis "Sold". Karya `privateCollection` tetap tampil, tetap punya halaman, tetap diindeks; tombolnya jadi "Request something similar".
4. **Bahasa**: Inggris utama, Indonesia lewat toggle (`/en/...` dan `/id/...`). Field Indonesia yang kosong jatuh ke teks Inggris, jangan tampil kosong.
5. **Gambar**: maksimal 2000px sisi terpanjang. Watermark hanya di foto `macro`; foto `primary` bersih. Jangan blokir klik kanan atau screenshot (PRD menjelaskan kenapa).
6. **Setiap gambar wajib punya `alt`.**
7. **Structured data** karya pakai `VisualArtwork`, bukan `Product`. Halaman About pakai `Person`.
8. **Form inquiry minimal**: karya (terisi otomatis), nama, email, negara, pesan (opsional). Jangan tambah field.
9. **Skala View in Room dihitung otomatis dari `dimensions`** (cm). Seniman tidak boleh perlu mengatur skala per karya.

## Konvensi kode
- **Tampilan terpusat.** Warna, font, dan lebar halaman hanya diubah di `src/app/globals.css` (CSS variable) dan `tailwind.config.ts`. Tim desain masih menyusun desain, jadi komponen harus mudah di-reskin: jangan hardcode warna/font di komponen.
- **Pisahkan data dari tampilan.** Semua data lewat `src/lib/data.ts` dengan tipe dari `src/lib/types.ts`. Schema ini harus tetap sama persis saat pindah ke Sanity.
- **Satu pintu untuk gambar**: `src/components/ArtImage.tsx`. Hanya komponen ini yang boleh tahu bedanya gambar dummy dan gambar CMS.
- Teks UI ada di `src/lib/i18n.ts`, bukan di dalam komponen.
- Tulis file lengkap, bukan potongan. Sebut path filenya saat menjelaskan perubahan.

## Sudah ada
- Setup Next.js + Tailwind, design tokens (`globals.css`, `tailwind.config.ts`).
- `src/lib/types.ts` (schema), `data.ts` (dummy, buang `internalPrice`), `i18n.ts` (teks UI EN/ID), `art.ts` (turunan dimensi), `inquiry.ts` (validasi), `rooms.ts` (kalibrasi View in Room).
- `src/components/ArtImage.tsx` (placeholder SVG dari seed).
- Routing `src/app/[locale]/` + `src/middleware.ts` (redirect ke `/en`).
- Halaman Home, Gallery, Detail karya, About, Contact.
- Form inquiry/commission + `src/app/api/inquiry/route.ts` (validasi saja, belum kirim email).
- View in Room (4 preset SVG, slide terakhir galeri foto).
- Keputusan di luar PRD tercatat di `docs/DISCOVERY.md` bagian 6. Baca sebelum mengubah perilaku.

## Belum ada (urutan kerja)
1. Kirim email inquiry (Resend/Formspree) ke alamat seniman.
2. SEO: structured data `VisualArtwork` + `Person`, OG image per karya, sitemap, `hreflang`.
3. Halaman Terms, analytics tanpa cookie (event: `artwork_view`, `zoom_open`, `view_in_room_open`, `inquiry_submit`).
4. Pasang Sanity + `/studio` (noindex), ganti `data.ts` dengan query bentuk sama.
5. Zoom berbasis tile untuk gambar asli.

**Gerbang rilis**: situs siap rilis kalau orang bisa paham siapa senimannya, menelusuri karya, dan kirim inquiry tanpa bantuan (tahap 1-4 PRD).

## Jangan dikerjakan sekarang
Galeri 3D, payment/checkout, akun pengguna, multi-seniman, print/merch, blog/newsletter.
