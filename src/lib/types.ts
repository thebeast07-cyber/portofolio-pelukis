// Schema ini mengikuti PRD (Model Konten). Dipakai sama persis untuk data dummy
// sekarang dan untuk Sanity nanti, jadi migrasi tidak mengubah tampilan.
// Keputusan tambahan di luar PRD tercatat di docs/DISCOVERY.md (bagian 6).

export type Locale = "en" | "id";

/** Teks dua bahasa. Kalau `id` kosong, tampil `en` (PRD: fallback, bukan kosong). */
export type Localized = { en: string; id?: string };

export type ArtworkStatus = "available" | "privateCollection" | "exhibited";
export type ShippingNote = "rolled" | "stretched" | "framed";

/**
 * `role` adalah sumber kebenaran peran gambar (DISCOVERY S1); urutan array
 * hanya menentukan urutan tampil. Wajib: 1 `primary` + minimal 1 `macro`.
 */
export type ImageRole = "primary" | "macro" | "edge" | "signature" | "context";

export type ArtImage = {
  role: ImageRole;
  alt: Localized;
  /**
   * Untuk dummy: seed warna. Nanti diganti `src` (URL Sanity) —
   * ArtImage.tsx adalah satu-satunya komponen yang perlu tahu bedanya.
   */
  seed: number;
  src?: string;
};

export type Exhibition = { title: string; venue: string; city: string; year: number; solo?: boolean };

export type Series = {
  slug: string;
  title: Localized;
  description: Localized;
  yearFrom: number;
  yearTo: number;
};

export type Artwork = {
  slug: string;
  title: Localized;
  year: number;
  seriesSlug?: string;
  images: ArtImage[]; // min 2: 1 primary + min 1 macro
  dimensions: { width: number; height: number; depth: number }; // cm
  medium: string;
  status: ArtworkStatus;
  /** 80–150 kata. Paragraf dipisah baris kosong (`\n\n`). */
  story: Localized;
  exhibitions?: Exhibition[];
  featured?: boolean;
  internalPrice?: number; // HANYA untuk CMS. Tidak pernah dirender ke situs.
  shippingNote?: ShippingNote;
};

/** Artwork tanpa `internalPrice`. Hanya bentuk ini yang boleh keluar dari src/lib/data.ts. */
export type PublicArtwork = Omit<Artwork, "internalPrice">;

/** Gambar milik dokumen artist (potret, proses studio, tanda tangan). */
export type PersonImage = { seed: number; alt: Localized; src?: string };

/** Kebijakan commission (DISCOVERY S5). Dipakai halaman About dan Contact. */
export type CommissionPolicy = {
  accepting: boolean;
  sizeRange: Localized;
  leadTime: Localized;
  deposit: Localized;
  process: Localized;
};

export type Artist = {
  name: string;
  portrait: PersonImage;
  statement: Localized;
  bioShort: Localized;
  bioLong: Localized;
  processImages: PersonImage[];
  signature: PersonImage;
  exhibitions: Exhibition[];
  education: string[];
  awards: string[];
  commission: CommissionPolicy;
  contact: { email: string; whatsapp: string };
  socials: { label: string; url: string }[];
};
