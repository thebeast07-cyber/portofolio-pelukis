// Semua teks UI. Komponen tidak boleh menulis teks sendiri.
// Konten (judul karya, cerita, bio) ada di data.ts sebagai `Localized`.

import type { ArtworkStatus, Locale, Localized, ShippingNote } from "./types";
import type { SizeCategory } from "./art";

export const locales: Locale[] = ["en", "id"];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

/** Ambil teks sesuai bahasa. Field Indonesia kosong jatuh ke Inggris. */
export function loc(text: Localized, locale: Locale): string {
  return (locale === "id" && text.id?.trim()) || text.en;
}

/** Pecah teks ber-paragraf (`\n\n`) jadi array paragraf. */
export function paragraphs(text: string): string[] {
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

/** Path dengan prefix bahasa: href("id", "/gallery") → "/id/gallery". */
export function href(locale: Locale, path = "/"): string {
  return `/${locale}${path === "/" ? "" : path}`;
}

const en = {
  langName: "English",
  switchTo: "Bahasa Indonesia",
  switchToShort: "ID",
  skipToContent: "Skip to content",
  nav: { work: "Work", about: "About", contact: "Contact", menu: "Main navigation" },
  footer: {
    rights: (name: string, year: number) => `© ${year} ${name}. All artworks and images are the property of the artist.`,
    inquire: "Ask about a work or a commission",
  },
  home: {
    heroCaption: "Featured work",
    viewWork: "View this work",
    meetArtist: "Meet the artist",
    readMore: "Read the full story",
    fromStudio: "From the studio",
    series: "Series",
    allWork: "See all work",
    ctaTitle: "Interested in a work?",
    ctaBody: "Every painting can be asked about directly. I reply personally within 24 hours.",
    ctaButton: "Get in touch",
  },
  gallery: {
    title: "Work",
    intro: "Paintings grouped by series. Each series is one body of work made over one to two years.",
    filters: "Filter works",
    year: "Year",
    medium: "Medium",
    size: "Size",
    all: "All",
    clear: "Clear filters",
    noResults: "No works match these filters.",
    standalone: "Other works",
    works: (n: number) => (n === 1 ? "1 work" : `${n} works`),
  },
  size: { small: "Small", medium: "Medium", large: "Large" } satisfies Record<SizeCategory, string>,
  sizeHint: { small: "under 60 cm", medium: "60–120 cm", large: "over 120 cm" } satisfies Record<SizeCategory, string>,
  status: {
    available: "Available",
    privateCollection: "Private collection",
    exhibited: "Exhibited",
  } satisfies Record<ArtworkStatus, string>,
  artwork: {
    back: "All work",
    series: "Series",
    medium: "Medium",
    dimensions: "Dimensions",
    year: "Year",
    status: "Status",
    story: "About this work",
    exhibitions: "Exhibited at",
    inquire: "Inquire about this work",
    requestSimilar: "Request something similar",
    privateNote: "This work is in a private collection. I can paint something in the same spirit for you.",
    receive: "What you receive",
    coa: "A signed Certificate of Authenticity with title, year, dimensions, medium and serial number.",
    shipping: "Shipping",
    duties: "Import duties and taxes in the destination country are the buyer's responsibility.",
    colour: "Colours may look slightly different on your screen. Extra photos or a short video are available on request.",
    zoom: "Zoom in",
    closeZoom: "Close zoom",
    gallery: "Images of this work",
    imageOf: (i: number, n: number) => `Image ${i} of ${n}`,
    aboutArtist: "About the artist",
  },
  shipping: {
    rolled: "Shipped rolled in a tube, without stretcher bars. Safer and much cheaper for international delivery; it is re-stretched locally on arrival.",
    stretched: "Shipped stretched and ready to hang.",
    framed: "Shipped framed.",
  } satisfies Record<ShippingNote, string>,
  room: {
    title: "View in room",
    open: "View in room",
    presets: "Choose a room",
    living: "Living room",
    bedroom: "Bedroom",
    office: "Office",
    plain: "Plain wall",
    silhouette: "170 cm person",
    disclaimer: "A simulation for scale only. It does not represent colour accurately.",
  },
  about: {
    title: "About",
    statement: "Artist statement",
    biography: "Biography",
    process: "In the studio",
    exhibitions: "Exhibitions",
    solo: "Solo",
    group: "Group",
    education: "Education",
    awards: "Awards",
    commissions: "Commissions",
    accepting: "Currently accepting commissions.",
    notAccepting: "Not accepting commissions at the moment.",
    sizeRange: "Sizes",
    leadTime: "Lead time",
    deposit: "Deposit",
    howItWorks: "How it works",
    requestCommission: "Request a commission",
    signature: "Signature",
  },
  contact: {
    title: "Contact",
    intro: "Ask about a painting, a commission or an exhibition. I read every message myself.",
    promise: "I reply within 24 hours.",
    general: "General inquiry",
    commission: "Commission request",
    commissionIntro: "Tell me a little about the space and the size you have in mind. Details can come later in our conversation.",
    direct: "Or write directly",
    email: "Email",
    whatsapp: "WhatsApp",
  },
  form: {
    artwork: "Artwork",
    name: "Name",
    email: "Email",
    country: "Country",
    countryHint: "Used to estimate shipping.",
    message: "Message",
    optional: "optional",
    submit: "Send inquiry",
    submitCommission: "Send request",
    sending: "Sending…",
    successTitle: "Thank you, your message has arrived.",
    successBody: "I will reply to your email within 24 hours.",
    error: "Something went wrong. Please try again, or email me directly.",
    errors: {
      required: "This field is required.",
      email: "Please enter a valid email address.",
      tooLong: "This is a little too long.",
    },
  },
  meta: {
    siteDescription: (name: string) => `${name}, painter. Original paintings, artist statement and inquiries.`,
  },
};

export type Dictionary = typeof en;

const id: Dictionary = {
  langName: "Bahasa Indonesia",
  switchTo: "English",
  switchToShort: "EN",
  skipToContent: "Langsung ke konten",
  nav: { work: "Karya", about: "Tentang", contact: "Kontak", menu: "Navigasi utama" },
  footer: {
    rights: (name, year) => `© ${year} ${name}. Seluruh karya dan gambar adalah milik seniman.`,
    inquire: "Tanya soal karya atau pesanan lukisan",
  },
  home: {
    heroCaption: "Karya pilihan",
    viewWork: "Lihat karya ini",
    meetArtist: "Kenali senimannya",
    readMore: "Baca kisah lengkapnya",
    fromStudio: "Dari studio",
    series: "Seri",
    allWork: "Lihat semua karya",
    ctaTitle: "Tertarik dengan sebuah karya?",
    ctaBody: "Setiap lukisan bisa ditanyakan langsung. Saya membalas sendiri dalam 24 jam.",
    ctaButton: "Hubungi saya",
  },
  gallery: {
    title: "Karya",
    intro: "Lukisan dikelompokkan per seri. Setiap seri adalah satu rangkaian karya yang dibuat selama satu sampai dua tahun.",
    filters: "Saring karya",
    year: "Tahun",
    medium: "Medium",
    size: "Ukuran",
    all: "Semua",
    clear: "Hapus filter",
    noResults: "Tidak ada karya yang cocok dengan filter ini.",
    standalone: "Karya lainnya",
    works: (n) => `${n} karya`,
  },
  size: { small: "Kecil", medium: "Sedang", large: "Besar" },
  sizeHint: { small: "di bawah 60 cm", medium: "60–120 cm", large: "di atas 120 cm" },
  status: {
    available: "Tersedia",
    privateCollection: "Koleksi pribadi",
    exhibited: "Pernah dipamerkan",
  },
  artwork: {
    back: "Semua karya",
    series: "Seri",
    medium: "Medium",
    dimensions: "Ukuran",
    year: "Tahun",
    status: "Status",
    story: "Tentang karya ini",
    exhibitions: "Dipamerkan di",
    inquire: "Tanyakan karya ini",
    requestSimilar: "Minta karya serupa",
    privateNote: "Karya ini sudah menjadi koleksi pribadi. Saya bisa melukis karya dengan semangat yang sama untuk Anda.",
    receive: "Yang Anda terima",
    coa: "Sertifikat keaslian bertanda tangan berisi judul, tahun, ukuran, medium, dan nomor seri.",
    shipping: "Pengiriman",
    duties: "Bea masuk dan pajak di negara tujuan menjadi tanggung jawab pembeli.",
    colour: "Warna di layar Anda bisa sedikit berbeda. Foto tambahan atau video singkat tersedia atas permintaan.",
    zoom: "Perbesar",
    closeZoom: "Tutup",
    gallery: "Foto karya ini",
    imageOf: (i, n) => `Gambar ${i} dari ${n}`,
    aboutArtist: "Tentang seniman",
  },
  shipping: {
    rolled: "Dikirim digulung dalam tabung, tanpa spanram. Lebih aman dan jauh lebih murah untuk pengiriman ke luar negeri; dipasang kembali di tempat tujuan.",
    stretched: "Dikirim terpasang di spanram, siap digantung.",
    framed: "Dikirim dengan bingkai.",
  },
  room: {
    title: "Lihat di ruangan",
    open: "Lihat di ruangan",
    presets: "Pilih ruangan",
    living: "Ruang tamu",
    bedroom: "Kamar tidur",
    office: "Ruang kerja",
    plain: "Dinding polos",
    silhouette: "Orang 170 cm",
    disclaimer: "Simulasi untuk referensi ukuran, bukan patokan warna.",
  },
  about: {
    title: "Tentang",
    statement: "Pernyataan seniman",
    biography: "Biografi",
    process: "Di studio",
    exhibitions: "Pameran",
    solo: "Tunggal",
    group: "Bersama",
    education: "Pendidikan",
    awards: "Penghargaan",
    commissions: "Pesanan lukisan",
    accepting: "Saat ini menerima pesanan lukisan.",
    notAccepting: "Saat ini belum menerima pesanan lukisan.",
    sizeRange: "Ukuran",
    leadTime: "Lama pengerjaan",
    deposit: "Uang muka",
    howItWorks: "Prosesnya",
    requestCommission: "Ajukan pesanan lukisan",
    signature: "Tanda tangan",
  },
  contact: {
    title: "Kontak",
    intro: "Tanyakan soal lukisan, pesanan, atau pameran. Saya membaca sendiri setiap pesan.",
    promise: "Saya membalas dalam 24 jam.",
    general: "Pertanyaan umum",
    commission: "Pesanan lukisan",
    commissionIntro: "Ceritakan sedikit soal ruangannya dan ukuran yang Anda bayangkan. Detailnya bisa menyusul di percakapan kita.",
    direct: "Atau tulis langsung",
    email: "Email",
    whatsapp: "WhatsApp",
  },
  form: {
    artwork: "Karya",
    name: "Nama",
    email: "Email",
    country: "Negara",
    countryHint: "Dipakai untuk memperkirakan ongkos kirim.",
    message: "Pesan",
    optional: "opsional",
    submit: "Kirim pertanyaan",
    submitCommission: "Kirim permintaan",
    sending: "Mengirim…",
    successTitle: "Terima kasih, pesan Anda sudah masuk.",
    successBody: "Saya akan membalas ke email Anda dalam 24 jam.",
    error: "Ada yang salah. Coba lagi, atau kirim email langsung ke saya.",
    errors: {
      required: "Kolom ini wajib diisi.",
      email: "Masukkan alamat email yang valid.",
      tooLong: "Isinya sedikit terlalu panjang.",
    },
  },
  meta: {
    siteDescription: (name) => `${name}, pelukis. Lukisan asli, pernyataan seniman, dan pertanyaan karya.`,
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, id };

export function t(locale: Locale): Dictionary {
  return dictionaries[locale];
}
