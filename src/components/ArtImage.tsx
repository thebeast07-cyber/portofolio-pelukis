// Satu-satunya pintu untuk gambar karya dan foto seniman.
// Sekarang: kalau `src` kosong, gambar placeholder SVG dibuat dari `seed`.
// Nanti (Sanity): `src` terisi → tampil <img>. Komponen lain tidak perlu tahu bedanya.
//
// Warna di placeholder adalah "isi lukisan", bukan warna UI, jadi tidak lewat design tokens.
// Watermark hanya di foto `macro` (PRD). Untuk foto asli, watermark ditanam saat ekspor.

import type { ImageRole, Locale, Localized } from "@/lib/types";
import { loc } from "@/lib/i18n";

export type ImageKind = ImageRole | "portrait" | "process";

type Props = {
  image: { seed: number; alt: Localized; src?: string; role?: ImageRole };
  locale: Locale;
  /** Rasio lebar/tinggi. Untuk `primary`, isi dari dimensi karya. */
  ratio?: number;
  /** Override jenis placeholder. Default: `image.role`, lalu `primary`. */
  kind?: ImageKind;
  /** Teks watermark untuk foto macro (nama seniman). */
  watermark?: string;
  priority?: boolean;
  className?: string;
};

const defaultRatio: Record<ImageKind, number> = {
  primary: 1,
  macro: 1,
  edge: 4 / 3,
  signature: 3 / 2,
  context: 4 / 5,
  portrait: 4 / 5,
  process: 1,
};

export default function ArtImage({ image, locale, ratio, kind, watermark, priority, className = "" }: Props) {
  const resolvedKind: ImageKind = kind ?? image.role ?? "primary";
  const r = ratio ?? defaultRatio[resolvedKind];
  const alt = loc(image.alt, locale);

  if (image.src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- diganti next/image + loader Sanity saat CMS dipasang
      <img
        src={image.src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`block h-auto w-full object-cover ${className}`}
        style={{ aspectRatio: r }}
      />
    );
  }

  const w = 1000;
  const h = Math.round(w / r);
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={alt}
      preserveAspectRatio="xMidYMid slice"
      className={`block h-auto w-full ${className}`}
      style={{ aspectRatio: r }}
    >
      <title>{alt}</title>
      <Placeholder kind={resolvedKind} seed={image.seed} w={w} h={h} />
      {resolvedKind === "macro" && watermark ? (
        <text
          x={w - 32}
          y={h - 32}
          textAnchor="end"
          fontSize={28}
          fontFamily="sans-serif"
          fill="#fff"
          fillOpacity={0.45}
        >
          © {watermark}
        </text>
      ) : null}
    </svg>
  );
}

/* ---------- placeholder generator (deterministik dari seed) ---------- */

function rng(seed: number) {
  let a = seed * 2654435761;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => n.toFixed(1);

function palette(seed: number) {
  const rand = rng(seed);
  const hue = Math.floor(rand() * 360);
  const shift = 20 + Math.floor(rand() * 40);
  return {
    ground: `hsl(${hue} 30% 82%)`,
    mid: `hsl(${(hue + shift) % 360} 35% 52%)`,
    deep: `hsl(${(hue + 180 + shift) % 360} 25% 26%)`,
    accent: `hsl(${(hue + 30) % 360} 55% 48%)`,
    rand,
  };
}

/** Pita horizontal dengan tepi tidak rata, seperti lapisan cat. */
function band(rand: () => number, w: number, y: number, thickness: number) {
  const steps = 8;
  const top: string[] = [];
  const bottom: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    top.push(`${f(x)},${f(y + (rand() - 0.5) * thickness * 0.5)}`);
    bottom.unshift(`${f(x)},${f(y + thickness + (rand() - 0.5) * thickness * 0.5)}`);
  }
  return `M${top.join(" L")} L${bottom.join(" L")} Z`;
}

function strokes(rand: () => number, w: number, h: number, count: number, size: number, colors: string[]) {
  return Array.from({ length: count }, (_, i) => {
    const x = rand() * w;
    const y = rand() * h;
    const len = size * (0.6 + rand());
    const angle = (rand() - 0.5) * 30;
    return (
      <rect
        key={i}
        x={f(x)}
        y={f(y)}
        width={f(len)}
        height={f(len * (0.08 + rand() * 0.12))}
        rx={f(len * 0.04)}
        fill={colors[i % colors.length]}
        fillOpacity={f(0.35 + rand() * 0.5)}
        transform={`rotate(${f(angle)} ${f(x)} ${f(y)})`}
      />
    );
  });
}

function Painting({ seed, w, h, density = 1 }: { seed: number; w: number; h: number; density?: number }) {
  const p = palette(seed);
  const bands = 3 + Math.floor(p.rand() * 3);
  return (
    <g>
      <rect width={w} height={h} fill={p.ground} />
      {Array.from({ length: bands }, (_, i) => (
        <path
          key={i}
          d={band(p.rand, w, (h / bands) * i + p.rand() * h * 0.1, h * (0.12 + p.rand() * 0.25))}
          fill={[p.mid, p.deep, p.accent][i % 3]}
          fillOpacity={f(0.55 + p.rand() * 0.4)}
        />
      ))}
      {strokes(p.rand, w, h, Math.round(40 * density), Math.max(w, h) * 0.12 / density, [p.ground, p.mid, p.deep, p.accent])}
    </g>
  );
}

function Placeholder({ kind, seed, w, h }: { kind: ImageKind; seed: number; w: number; h: number }) {
  const p = palette(seed);

  switch (kind) {
    case "primary":
      return <Painting seed={seed} w={w} h={h} />;

    case "macro":
      return <Painting seed={seed} w={w} h={h} density={3} />;

    case "edge": {
      const face = w * 0.68;
      return (
        <g>
          <Painting seed={seed} w={face} h={h} />
          <rect x={face} width={w - face} height={h} fill={p.deep} fillOpacity={0.85} />
          {strokes(p.rand, w - face, h, 20, h * 0.1, [p.mid, p.ground]).map((s, i) => (
            <g key={i} transform={`translate(${f(face)} 0)`}>
              {s}
            </g>
          ))}
          <rect x={face - 4} width={8} height={h} fill={p.ground} fillOpacity={0.5} />
        </g>
      );
    }

    case "signature": {
      const y = h * 0.6;
      const pts = Array.from({ length: 9 }, (_, i) => `${f(w * 0.2 + i * w * 0.07)},${f(y + (p.rand() - 0.5) * h * 0.3)}`);
      return (
        <g>
          <Painting seed={seed} w={w} h={h} density={2} />
          <path d={`M${pts.join(" T")}`} fill="none" stroke={p.deep} strokeWidth={10} strokeLinecap="round" />
          <path d={`M${f(w * 0.68)},${f(y + h * 0.12)} L${f(w * 0.82)},${f(y + h * 0.1)}`} stroke={p.deep} strokeWidth={8} strokeLinecap="round" />
        </g>
      );
    }

    case "portrait":
      return (
        <g>
          <rect width={w} height={h} fill={p.ground} />
          <rect y={h * 0.78} width={w} height={h * 0.22} fill={p.mid} fillOpacity={0.4} />
          <rect x={w * 0.62} y={h * 0.12} width={w * 0.3} height={h * 0.45} fill={p.accent} fillOpacity={0.5} />
          <circle cx={w * 0.42} cy={h * 0.32} r={w * 0.11} fill={p.deep} fillOpacity={0.85} />
          <path
            d={`M${f(w * 0.2)},${h} Q${f(w * 0.22)},${f(h * 0.5)} ${f(w * 0.42)},${f(h * 0.48)} Q${f(w * 0.62)},${f(h * 0.5)} ${f(w * 0.64)},${h} Z`}
            fill={p.deep}
            fillOpacity={0.85}
          />
        </g>
      );

    case "context":
    case "process":
      return (
        <g>
          <rect width={w} height={h} fill={p.ground} />
          <rect y={h * 0.72} width={w} height={h * 0.28} fill={p.mid} fillOpacity={0.35} />
          <path
            d={`M${f(w * 0.3)},${h} L${f(w * 0.5)},${f(h * 0.1)} L${f(w * 0.7)},${h}`}
            fill="none"
            stroke={p.deep}
            strokeWidth={12}
          />
          <g transform={`translate(${f(w * 0.25)} ${f(h * 0.15)})`}>
            <Painting seed={seed + 7} w={w * 0.5} h={h * 0.5} />
          </g>
        </g>
      );
  }
}
