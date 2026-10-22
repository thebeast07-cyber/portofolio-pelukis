# Discovery PRD — Website Portofolio Pelukis

Hasil bedah `docs/PRD.md` (+ diagram di `PRD-asli.pdf`), dicocokkan dengan `CLAUDE.md` dan `src/lib/types.ts`.
Tujuannya: mengunci keputusan yang masih kabur **sebelum** coding langkah 1–6.

Status: draft, 22 Okt 2026. Bagian 4 berisi pertanyaan yang butuh jawaban.

---

## 1. Inti produk dalam 5 kalimat

1. Portofolio satu pelukis, bukan toko: tanpa harga, keranjang, login, atau database.
2. Satu-satunya konversi yang dibangun di situs: **inquiry** (langkah 1–2 dari 6). Sisanya terjadi di email/WhatsApp.
3. Urutan kerja halaman: **karya membuka → About meyakinkan → inquiry menutup**.
4. Penilaian layout mulai dari HP 375px (mayoritas pengunjung datang dari Instagram).
5. Gerbang rilis = tahap 1–4: orang bisa paham siapa senimannya, menelusuri karya, dan kirim inquiry tanpa bantuan.

## 2. Peta halaman & isi wajib per halaman

| Rute | Tugas | Isi wajib (dari PRD, sering tercecer di beberapa bagian) |
|---|---|---|
| `/` Home | Karya membuka | 1 karya besar (featured) di atas, **baru** nama + statement di bawah. Potret tidak boleh paling atas. |
| `/gallery` | Body of work | Dikelompokkan **per seri** (bukan stok). Filter: tahun, medium, ukuran, seri (lihat konflik K2). Karya tanpa seri tetap tampil. |
| `/gallery/[slug]` | Detail karya | Galeri foto (primary, macro, edge, signature, context) + **zoom tekstur**, **View in Room**, judul, tahun, medium, dimensi **cm + inch**, status, cerita, riwayat pameran, cara kirim, baris bea masuk ditanggung pembeli, sebutan **COA**, baris "warna bisa beda antar layar, foto/video tambahan bisa diminta", tombol Inquire / "Request something similar". |
| `/about` | Pusat situs | Statement, bio panjang, potret, foto proses studio, riwayat pameran (terbaru di atas), pendidikan & penghargaan (opsional). Structured data `Person` + sosial. |
| `/contact` | Inquiry umum | Form inquiry umum + **form commission request terpisah** (lihat K1). |
| `/terms` | Hak gambar | Pernyataan hak penggunaan gambar (pendukung takedown). |
| `/studio` | CMS | Belum sekarang. Nanti: di luar nav, `noindex`. |

Elemen global: tombol/jalur inquiry harus **mudah ditemukan dari halaman mana pun**, toggle bahasa EN/ID.

## 3. Konflik & celah yang ditemukan

### Konflik di dalam PRD / antara PRD dan CLAUDE.md

| # | Temuan | Di mana | Usulan |
|---|---|---|---|
| **K1** | **Form commission request terpisah** masuk lingkup MVP (dan ada di diagram `/contact`), tapi field-nya tidak didefinisikan, dan CLAUDE.md tidak menyebutnya sama sekali. | PRD hal. 3, 4 vs CLAUDE.md | Buat form commission = form inquiry yang sama + penanda `type: "commission"`, tanpa field tambahan (sejalan dengan prinsip "field seminimal mungkin"). Detail ukuran/budget ditanyakan di balasan pertama. |
| **K2** | Filter galeri beda di 3 tempat: lingkup = tahun, medium, **ukuran**; diagram = **seri**, tahun, medium; CLAUDE.md = tahun, medium. | PRD hal. 3, 4; CLAUDE.md | Seri jadi pengelompokan (bukan filter), filter = tahun + medium + ukuran (Small/Medium/Large, ambang dihitung dari dimensi). |
| **K3** | `shippingNote`: di Model Konten "**tidak ditampilkan** di halaman", di bagian Pengiriman "halaman detail **menampilkan ini secara eksplisit**". Bertentangan langsung. | PRD hal. 5 vs hal. 12 | Tampilkan (bagian Pengiriman lebih spesifik dan alasannya kuat: cegah pembatalan). Konfirmasi dulu. |
| **K4** | **Zoom tekstur berbasis tile** masuk tahap 2 PRD, tapi tidak ada di urutan kerja CLAUDE.md. | PRD hal. 10, 14 | Versi dummy: zoom biasa (pinch/klik) pada gambar macro, dengan komponen yang bisa ditukar ke tile nanti saat gambar asli dari CMS ada. |
| **K5** | Janji waktu balas: halaman menyatakan **24 jam**, bagian operasional menyebut **2×24 jam** sebagai batas hilang. | PRD hal. 8 vs hal. 20 | Teks situs pakai 24 jam (PRD eksplisit). 2×24 dianggap batas internal. Cukup dicatat. |
| **K6** | Notifikasi langkah 3 = "Email **+ WhatsApp** ke seniman". Notifikasi otomatis ke WhatsApp butuh WhatsApp Business API (berbayar, verifikasi bisnis); PRD hanya menyebut Resend/Formspree. | Diagram alur inquiry | MVP: email saja. WhatsApp ditampilkan sebagai link `wa.me` di Contact (kalau seniman mau nomornya publik). |
| **K7** | Panjang cerita: Model Konten "2–3 paragraf", Data Karya "80–150 kata". | PRD hal. 5 vs hal. 18 | Pakai 80–150 kata (lebih spesifik), 1–2 paragraf. Cuma panduan konten, tidak berdampak ke kode. |
| **K8** | "Arahan untuk mockup UI ada di tab terpisah: **Design Brief**" — dokumen ini **tidak ada** di paket. | PRD hal. 23 | Minta Design Brief-nya. Sampai ada, tampilan tetap polos lewat design tokens. |

### Celah antara schema (`types.ts`) dan PRD

| # | Temuan | Usulan |
|---|---|---|
| S1 | `images`: PRD bilang "urutan menentukan peran", tapi `types.ts` juga punya field `role`. Kalau dua-duanya dipakai, mana yang benar? Urutan juga tidak cocok dengan "macro minimal 1, idealnya 2" + context opsional. | Jadikan `role` sumber kebenaran, urutan hanya untuk urutan tampil. Validasi: wajib 1 `primary` + min 1 `macro`. |
| S2 | `orientation` (otomatis dari dimensi) belum ada. | Bukan field, cukup helper `getOrientation(dimensions)` di `src/lib/`. Sama untuk konversi inch dan kategori ukuran (K2). |
| S3 | `story` di PRD = rich text, di types = `Localized` string. Kalau nanti Sanity pakai Portable Text, schema berubah, padahal aturannya "sama persis". | Putuskan sekarang: string polos dengan paragraf dipisah `\n\n` (cukup untuk 80–150 kata), atau langsung Portable Text. Usulan: string polos. |
| S4 | `medium` dan `education` berupa `string`, bukan `Localized`. Di mode ID, "Oil on canvas" tetap Inggris. | Medium biasanya memang ditulis Inggris di dunia seni. Usulan: biarkan, kecuali klien mau versi ID. |
| S5 | `Artist` belum punya: **tanda tangan** (dipakai COA + detail), **penghargaan**, dan **info commission** (menerima/tidak, rentang ukuran, lead time, deposit, contoh commission). Padahal persona "Peminat commission" pergi kalau info ini tidak ada. | Tambah `awards`, `signatureSeed`, dan blok `commission` (`accepting`, `leadTime`, `sizeRange`, `notes`, `Localized`). Butuh persetujuan karena mengubah schema. |
| S6 | `featured` boolean, tapi Home cuma butuh **satu** hero. Kalau ada 3 karya featured, mana yang tampil? | Ambil featured pertama (urut terbaru). Sisa featured bisa jadi strip "Selected works" di bawahnya. |
| S7 | Inquiry `status: exhibited` — tombolnya apa? PRD cuma mengatur `available` (Inquire) dan `privateCollection` (Request something similar). | Exhibited diperlakukan seperti available (tombol Inquire), karena karyanya masih di tangan seniman. |

### Hal yang tidak bisa dikerjakan oleh kode (catat saja)

- **Watermark macro & metadata IPTC**: PRD bilang "otomatis saat upload", tapi Sanity tidak melakukannya otomatis. Realistisnya dikerjakan di langkah ekspor foto (Lightroom/script), bukan di situs.
- **Profil warna sRGB lolos pipeline**: perlu dites sekali saat gambar asli masuk (Next/Sanity re-encode ke WebP/AVIF).
- **Foto ruangan View in Room**: lisensi belum diputuskan. CLAUDE.md sudah benar: SVG dulu dengan kalibrasi yang sama, foto menyusul.

## 4. Keputusan yang dibutuhkan sebelum coding

Yang **memblokir** langkah 1–6:

1. **K1 Commission form**: setuju pakai form yang sama + penanda commission, tanpa field tambahan?
2. **K2 Filter**: tahun + medium + ukuran, seri sebagai pengelompokan?
3. **K3 shippingNote**: tampil di halaman detail atau tidak?
4. **S1 Peran gambar**: `role` jadi sumber kebenaran?
5. **S5 Schema Artist**: boleh ditambah `awards`, `signature`, `commission`?

Yang **tidak memblokir** (bisa pakai usulan di atas dulu): K4, K5, K6, K7, S2, S3, S4, S6, S7.

Yang ditunggu dari pihak luar: **Design Brief** (K8), dan semua materi di bagian "Yang Perlu Disiapkan Pelukis" PRD (nama, domain, data karya, About, email/WA, kebijakan commission).

## 5. Event analytics yang perlu disiapkan sejak awal

Supaya metrik PRD bisa diukur tanpa bongkar ulang komponen:

| Event | Untuk metrik |
|---|---|
| `artwork_view` (slug) | Karya dilihat per sesi (>3), waktu di halaman (>60 dtk) |
| `zoom_open` (slug) | Rasio zoom (>40%) |
| `view_in_room_open` (slug, preset) | Rasio View in Room (>25%, gerbang tahap 6) |
| `inquiry_submit` (slug, type) | Inquiry per bulan (3–5) |
| page view `/about` | Kunjungan About (>35%) |

Tool: Plausible atau Vercel Analytics, tanpa cookie, tanpa banner.
