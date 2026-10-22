// Preset ruangan View in Room + kalibrasinya (PRD).
// Tiap preset menyimpan dua angka kalibrasi: lebar dinding terlihat (cm) dan area dinding (px).
// Dari situ skala lukisan dihitung otomatis dari `dimensions`; seniman tidak menyetel apa pun per karya.
// Sekarang ruangan digambar sebagai SVG; nanti `photo` bisa diisi foto berlisensi dengan kalibrasi yang sama.

export type RoomId = "living" | "bedroom" | "office" | "plain";

export type RoomPreset = {
  id: RoomId;
  /** Ukuran kanvas preset dalam px (viewBox SVG / ukuran foto). */
  view: { w: number; h: number };
  /** Area dinding dalam px. Lebarnya mewakili `wallWidthCm`. */
  wall: { x: number; y: number; w: number; h: number };
  wallWidthCm: number;
  /** Tinggi titik tengah lukisan dari lantai (cm), ukuran galeri ±145 cm. */
  hangCenterCm: number;
  /** Tinggi perabot di bawah lukisan (cm). Lukisan dijaga minimal 20 cm di atasnya. */
  furnitureTopCm: number;
  photo?: string;
};

const view = { w: 1000, h: 700 };
const wall = { x: 0, y: 0, w: 1000, h: 560 };

export const rooms: RoomPreset[] = [
  { id: "living", view, wall, wallWidthCm: 450, hangCenterCm: 150, furnitureTopCm: 85 },
  { id: "bedroom", view, wall, wallWidthCm: 420, hangCenterCm: 155, furnitureTopCm: 110 },
  { id: "office", view, wall, wallWidthCm: 380, hangCenterCm: 145, furnitureTopCm: 75 },
  { id: "plain", view, wall, wallWidthCm: 420, hangCenterCm: 145, furnitureTopCm: 0 },
];

export function pxPerCm(room: RoomPreset): number {
  return room.wall.w / room.wallWidthCm;
}

/** Y lantai dalam px (tepi bawah area dinding). */
export function floorY(room: RoomPreset): number {
  return room.wall.y + room.wall.h;
}

/** Posisi dan ukuran lukisan di ruangan (px), dihitung dari dimensi karya dalam cm. */
export function placePainting(room: RoomPreset, widthCm: number, heightCm: number) {
  const s = pxPerCm(room);
  const w = widthCm * s;
  const h = heightCm * s;
  const floor = floorY(room);
  const centerY = floor - room.hangCenterCm * s;
  const maxBottom = room.furnitureTopCm ? floor - (room.furnitureTopCm + 20) * s : floor - 30 * s;
  const minTop = room.wall.y + 10 * s;
  let top = centerY - h / 2;
  if (top + h > maxBottom) top = maxBottom - h;
  if (top < minTop) top = minTop;
  return { x: room.wall.x + room.wall.w / 2 - w / 2, y: top, w, h };
}
