"use client";

// View in Room: lukisan ditempel di atas ruangan preset dengan skala dari `dimensions` (PRD).
// Bukan 3D/AR/WebGL: satu lapisan di atas lapisan lain, posisi dihitung dalam persen.
// Ruangan digambar inline (SVG) sehingga pindah preset instan tanpa memuat file.

import { useState } from "react";
import ArtImage from "./ArtImage";
import { rooms, pxPerCm, floorY, placePainting, type RoomId, type RoomPreset } from "@/lib/rooms";
import { t } from "@/lib/i18n";
import type { ArtImage as ArtImageType, Locale } from "@/lib/types";

type Props = {
  image: ArtImageType;
  widthCm: number;
  heightCm: number;
  locale: Locale;
};

const pct = (v: number, total: number) => `${(v / total) * 100}%`;
const inch = (cm: number) => Math.round((cm / 2.54) * 10) / 10;

export default function ViewInRoom({ image, widthCm, heightCm, locale }: Props) {
  const dict = t(locale);
  const [roomId, setRoomId] = useState<RoomId>("living");
  const room = rooms.find((r) => r.id === roomId) ?? rooms[0];
  const art = placePainting(room, widthCm, heightCm);
  const { w: vw, h: vh } = room.view;
  // Label ukuran di kanan lukisan; kalau mepet tepi, pindah ke bawahnya.
  const labelRight = art.x + art.w + 12 < vw * 0.78;

  return (
    <div className="w-full p-3 sm:p-6">
      <p className="eyebrow">{dict.room.title}</p>
      <div className="relative mt-3 w-full overflow-hidden" style={{ aspectRatio: `${vw} / ${vh}` }}>
        {room.photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- foto ruangan berlisensi, nanti
          <img src={room.photo} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <svg viewBox={`0 0 ${vw} ${vh}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
            <RoomScene room={room} silhouetteLabel={dict.room.silhouette} />
          </svg>
        )}

        <div
          className="absolute shadow-art"
          style={{ left: pct(art.x, vw), top: pct(art.y, vh), width: pct(art.w, vw) }}
        >
          <ArtImage image={image} locale={locale} ratio={widthCm / heightCm} />
        </div>

        <p
          className="absolute whitespace-nowrap text-[10px] leading-tight text-ink sm:text-xs"
          style={
            labelRight
              ? { left: pct(art.x + art.w + 12, vw), top: pct(art.y, vh) }
              : { left: pct(art.x, vw), top: pct(art.y + art.h + 8, vh) }
          }
        >
          {widthCm} × {heightCm} cm
          <br />
          <span className="text-muted">
            {inch(widthCm)} × {inch(heightCm)} in
          </span>
        </p>
      </div>

      <div role="radiogroup" aria-label={dict.room.presets} className="mt-3 grid grid-cols-4 gap-2">
        {rooms.map((r) => (
          <button
            key={r.id}
            type="button"
            role="radio"
            aria-checked={r.id === roomId}
            onClick={() => setRoomId(r.id)}
            className={`border p-1 text-left text-[11px] leading-tight sm:text-xs ${
              r.id === roomId ? "border-ink" : "border-line"
            }`}
          >
            <svg viewBox={`0 0 ${r.view.w} ${r.view.h}`} className="block w-full" aria-hidden="true">
              <RoomScene room={r} />
            </svg>
            <span className="mt-1 block">{dict.room[r.id]}</span>
          </button>
        ))}
      </div>

      <p className="mt-3 text-xs text-muted">{dict.room.disclaimer}</p>
    </div>
  );
}

/** Gambar ruangan dalam skala cm yang sama dengan lukisan. Warna lewat design tokens. */
function RoomScene({ room, silhouetteLabel }: { room: RoomPreset; silhouetteLabel?: string }) {
  const s = pxPerCm(room);
  const floor = floorY(room);
  const cx = room.wall.x + room.wall.w / 2;
  const cm = (v: number) => v * s;

  return (
    <g>
      <rect x={0} y={0} width={room.view.w} height={floor} className="fill-surface" />
      <rect x={0} y={floor} width={room.view.w} height={room.view.h - floor} className="fill-line" />
      <line x1={0} y1={floor} x2={room.view.w} y2={floor} className="stroke-muted" strokeWidth={2} />

      {room.id === "living" ? (
        // Sofa tiga dudukan: 210 × 85 cm, dudukan 45 cm.
        <g className="fill-muted">
          <rect x={cx - cm(105)} y={floor - cm(85)} width={cm(210)} height={cm(40)} rx={cm(6)} opacity={0.75} />
          <rect x={cx - cm(105)} y={floor - cm(45)} width={cm(210)} height={cm(30)} rx={cm(4)} />
          <rect x={cx - cm(115)} y={floor - cm(65)} width={cm(18)} height={cm(50)} rx={cm(6)} />
          <rect x={cx + cm(97)} y={floor - cm(65)} width={cm(18)} height={cm(50)} rx={cm(6)} />
          <rect x={cx - cm(100)} y={floor - cm(15)} width={cm(6)} height={cm(15)} />
          <rect x={cx + cm(94)} y={floor - cm(15)} width={cm(6)} height={cm(15)} />
        </g>
      ) : null}

      {room.id === "bedroom" ? (
        // Tempat tidur queen: lebar 160 cm, headboard 110 cm, kasur 55 cm.
        <g className="fill-muted">
          <rect x={cx - cm(85)} y={floor - cm(110)} width={cm(170)} height={cm(110)} rx={cm(4)} opacity={0.6} />
          <rect x={cx - cm(80)} y={floor - cm(55)} width={cm(160)} height={cm(55)} rx={cm(3)} />
          <rect x={cx - cm(70)} y={floor - cm(72)} width={cm(60)} height={cm(20)} rx={cm(8)} className="fill-surface" />
          <rect x={cx + cm(10)} y={floor - cm(72)} width={cm(60)} height={cm(20)} rx={cm(8)} className="fill-surface" />
          <rect x={cx - cm(140)} y={floor - cm(55)} width={cm(45)} height={cm(55)} opacity={0.75} />
          <rect x={cx + cm(95)} y={floor - cm(55)} width={cm(45)} height={cm(55)} opacity={0.75} />
        </g>
      ) : null}

      {room.id === "office" ? (
        // Meja kerja 140 × 75 cm dan kursi.
        <g className="fill-muted">
          <rect x={cx - cm(70)} y={floor - cm(75)} width={cm(140)} height={cm(4)} />
          <rect x={cx - cm(66)} y={floor - cm(71)} width={cm(4)} height={cm(71)} />
          <rect x={cx + cm(62)} y={floor - cm(71)} width={cm(4)} height={cm(71)} />
          <rect x={cx + cm(20)} y={floor - cm(110)} width={cm(45)} height={cm(55)} rx={cm(6)} opacity={0.75} />
          <rect x={cx + cm(15)} y={floor - cm(50)} width={cm(55)} height={cm(8)} rx={cm(3)} />
          <rect x={cx + cm(40)} y={floor - cm(42)} width={cm(4)} height={cm(42)} />
          <rect x={cx - cm(50)} y={floor - cm(105)} width={cm(30)} height={cm(30)} rx={cm(2)} opacity={0.5} />
        </g>
      ) : null}

      {room.id === "plain" ? (
        // Siluet manusia 170 cm, berdiri di kiri lukisan (label ukuran ada di kanan).
        <g>
          <Silhouette x={cx - cm(130)} floor={floor} heightPx={cm(170)} />
          {silhouetteLabel ? (
            <text
              x={cx - cm(130)}
              y={floor + 40}
              textAnchor="middle"
              fontSize={22}
              className="fill-muted"
              fontFamily="sans-serif"
            >
              {silhouetteLabel}
            </text>
          ) : null}
        </g>
      ) : null}
    </g>
  );
}

function Silhouette({ x, floor, heightPx }: { x: number; floor: number; heightPx: number }) {
  const u = heightPx / 170; // px per cm
  const top = floor - heightPx;
  return (
    <g className="fill-muted">
      <circle cx={x} cy={top + u * 12} r={u * 11} />
      <path
        d={`M${x - u * 22},${top + u * 30}
            L${x + u * 22},${top + u * 30}
            L${x + u * 24},${top + u * 95}
            L${x + u * 15},${top + u * 95}
            L${x + u * 13},${floor}
            L${x + u * 2},${floor}
            L${x},${top + u * 105}
            L${x - u * 2},${floor}
            L${x - u * 13},${floor}
            L${x - u * 15},${top + u * 95}
            L${x - u * 24},${top + u * 95} Z`}
      />
    </g>
  );
}
