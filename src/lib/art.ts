// Turunan dari `dimensions` dan `images`. Dihitung, bukan diisi seniman.

import type { ArtImage, ImageRole, PublicArtwork } from "./types";

type Dimensions = PublicArtwork["dimensions"];

export type Orientation = "landscape" | "portrait" | "square";
export type SizeCategory = "small" | "medium" | "large";

export function getOrientation({ width, height }: Dimensions): Orientation {
  if (width > height * 1.05) return "landscape";
  if (height > width * 1.05) return "portrait";
  return "square";
}

/** Sisi terpanjang < 60 cm = small, ≤ 120 cm = medium, sisanya large. */
export function getSizeCategory({ width, height }: Dimensions): SizeCategory {
  const longest = Math.max(width, height);
  if (longest < 60) return "small";
  if (longest <= 120) return "medium";
  return "large";
}

const toInch = (cm: number) => Math.round((cm / 2.54) * 10) / 10;

/** "150 × 120 × 4 cm" */
export function formatCm({ width, height, depth }: Dimensions): string {
  return `${width} × ${height}${depth ? ` × ${depth}` : ""} cm`;
}

/** "59.1 × 47.2 × 1.6 in" */
export function formatInch({ width, height, depth }: Dimensions): string {
  return `${toInch(width)} × ${toInch(height)}${depth ? ` × ${toInch(depth)}` : ""} in`;
}

export function getImage(artwork: PublicArtwork, role: ImageRole): ArtImage | undefined {
  return artwork.images.find((img) => img.role === role);
}

/** Foto utama. Schema mewajibkan satu; fallback ke gambar pertama kalau data rusak. */
export function getPrimaryImage(artwork: PublicArtwork): ArtImage {
  return getImage(artwork, "primary") ?? artwork.images[0];
}

const roleOrder: ImageRole[] = ["primary", "macro", "edge", "signature", "context"];

/** Urutan tampil di halaman detail: urut peran, lalu urutan asli di array. */
export function getOrderedImages(artwork: PublicArtwork): ArtImage[] {
  return [...artwork.images].sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));
}
