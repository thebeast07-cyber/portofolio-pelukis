// Schema ini mengikuti PRD (Model Konten). Dipakai sama persis untuk data dummy
// sekarang dan untuk Sanity nanti, jadi migrasi tidak mengubah tampilan.

export type Locale = "en" | "id";

/** Teks dua bahasa. Kalau `id` kosong, tampil `en` (PRD: fallback, bukan kosong). */
export type Localized = { en: string; id?: string };

export type ArtworkStatus = "available" | "privateCollection" | "exhibited";
export type ShippingNote = "rolled" | "stretched" | "framed";

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
  images: ArtImage[]; // min 2, urutan menentukan peran
  dimensions: { width: number; height: number; depth: number }; // cm
  medium: string;
  status: ArtworkStatus;
  story: Localized;
  exhibitions?: Exhibition[];
  featured?: boolean;
  internalPrice?: number; // HANYA untuk CMS. Tidak pernah dirender ke situs.
  shippingNote?: ShippingNote;
};

export type Artist = {
  name: string;
  portraitSeed: number;
  statement: Localized;
  bioShort: Localized;
  bioLong: Localized;
  processImages: { seed: number; alt: Localized }[];
  exhibitions: Exhibition[];
  education: string[];
  contact: { email: string; whatsapp: string };
  socials: { label: string; url: string }[];
};
