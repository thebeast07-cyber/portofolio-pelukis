// Data dummy lokal. Nanti diganti query Sanity dengan bentuk keluaran yang sama.
// Satu-satunya pintu data untuk halaman: fungsi `get*` di bawah.
// `internalPrice` dibuang di sini supaya tidak pernah ikut ke HTML/payload halaman.

import type { Artist, Artwork, PublicArtwork, Series } from "./types";

const artist: Artist = {
  name: "Sekar Ayuningtyas",
  portrait: {
    seed: 901,
    alt: {
      en: "Sekar Ayuningtyas in her studio, standing beside an unfinished canvas",
      id: "Sekar Ayuningtyas di studionya, berdiri di samping kanvas yang belum selesai",
    },
  },
  statement: {
    en: "I paint the hour before rain. Not the storm itself, but the weight that sits on a city when the air turns thick and everyone walks a little faster.\n\nMost of my canvases start with a wash of diluted oil left to run, then weeks of building texture with a palette knife until the surface feels like a wall that has been through many monsoons. I keep returning to the same few colours: wet laterite, tarnished brass, the green of moss on a gutter.",
    id: "Saya melukis satu jam sebelum hujan. Bukan badainya, tapi berat yang menggantung di atas kota ketika udara menebal dan semua orang berjalan sedikit lebih cepat.\n\nKebanyakan kanvas saya dimulai dengan sapuan cat minyak encer yang dibiarkan mengalir, lalu berminggu-minggu membangun tekstur dengan pisau palet sampai permukaannya terasa seperti tembok yang sudah melewati banyak musim hujan. Saya terus kembali ke beberapa warna yang sama: laterit basah, kuningan kusam, hijau lumut di talang air.",
  },
  bioShort: {
    en: "Sekar Ayuningtyas (b. 1991, Yogyakarta) is an Indonesian painter working in oil and palette knife. Her work translates tropical weather and urban surfaces into dense, layered abstraction. She has exhibited in Yogyakarta, Jakarta and Singapore.",
    id: "Sekar Ayuningtyas (lahir 1991, Yogyakarta) adalah pelukis Indonesia yang bekerja dengan cat minyak dan pisau palet. Karyanya menerjemahkan cuaca tropis dan permukaan kota menjadi abstraksi yang padat dan berlapis. Ia telah berpameran di Yogyakarta, Jakarta, dan Singapura.",
  },
  bioLong: {
    en: "Sekar grew up above her family's print shop in Kotagede, where she learned to read ink, paper and the way colour changes as it dries. She studied painting at the Indonesian Institute of the Arts in Yogyakarta, and spent two years assisting a restorer of colonial-era murals, an experience that taught her to see walls as records of time.\n\nShe works from a small studio on the edge of the city with a corrugated roof, which is why rain became her subject: she paints to the sound of it. Each series takes between one and two years and usually begins with a single walk she repeats every day.\n\nShe lives and works in Yogyakarta.",
    id: "Sekar tumbuh di atas percetakan keluarganya di Kotagede, tempat ia belajar membaca tinta, kertas, dan cara warna berubah saat mengering. Ia belajar seni lukis di Institut Seni Indonesia Yogyakarta, lalu dua tahun menjadi asisten restorator mural era kolonial, pengalaman yang mengajarinya melihat tembok sebagai catatan waktu.\n\nIa bekerja di studio kecil di pinggir kota beratap seng, dan karena itulah hujan menjadi subjeknya: ia melukis diiringi suaranya. Setiap seri memakan waktu satu sampai dua tahun dan biasanya berawal dari satu rute jalan kaki yang ia ulang setiap hari.\n\nIa tinggal dan bekerja di Yogyakarta.",
  },
  processImages: [
    {
      seed: 911,
      alt: { en: "Hands spreading oil paint with a palette knife", id: "Tangan meratakan cat minyak dengan pisau palet" },
    },
    {
      seed: 912,
      alt: { en: "A palette crusted with earth-toned oil paint", id: "Palet penuh cat minyak bernuansa tanah" },
    },
    {
      seed: 913,
      alt: { en: "An unfinished canvas on the easel", id: "Kanvas yang belum selesai di atas easel" },
    },
    {
      seed: 914,
      alt: { en: "Rain on the studio's corrugated roof", id: "Hujan di atap seng studio" },
    },
  ],
  signature: {
    seed: 921,
    alt: { en: "Signature of Sekar Ayuningtyas", id: "Tanda tangan Sekar Ayuningtyas" },
  },
  exhibitions: [
    { title: "Before the Rain", venue: "Galeri Lorong", city: "Yogyakarta", year: 2025, solo: true },
    { title: "Surface Tension", venue: "Ruang Tamu Gallery", city: "Jakarta", year: 2024 },
    { title: "Southeast Weather", venue: "Gajah Annex", city: "Singapore", year: 2023 },
    { title: "Tembok", venue: "Kedai Kebun Forum", city: "Yogyakarta", year: 2022, solo: true },
  ],
  education: ["BFA Painting, Institut Seni Indonesia Yogyakarta, 2014"],
  awards: ["Finalist, Indonesia Painting Prize, 2023"],
  commission: {
    accepting: true,
    sizeRange: { en: "40 × 50 cm up to 150 × 200 cm", id: "40 × 50 cm sampai 150 × 200 cm" },
    leadTime: { en: "8–12 weeks, depending on size", id: "8–12 minggu, tergantung ukuran" },
    deposit: {
      en: "30% deposit once the concept sketch is agreed",
      id: "DP 30% setelah sketsa konsep disepakati",
    },
    process: {
      en: "We start with a conversation about the space and what you are drawn to in my work. I send two small studies, you choose one, and I keep you updated with studio photos until the painting is finished.",
      id: "Kita mulai dengan obrolan soal ruangan dan apa yang membuat Anda tertarik pada karya saya. Saya kirim dua studi kecil, Anda pilih satu, dan saya kabari lewat foto studio sampai lukisannya selesai.",
    },
  },
  contact: { email: "studio@example.com", whatsapp: "+6281200000000" },
  socials: [{ label: "Instagram", url: "https://instagram.com/example" }],
};

const series: Series[] = [
  {
    slug: "before-the-rain",
    title: { en: "Before the Rain", id: "Sebelum Hujan" },
    description: {
      en: "Six large canvases made over the 2024 wet season, each one painted on the afternoon of a storm that had not yet broken.",
      id: "Enam kanvas besar yang dibuat sepanjang musim hujan 2024, masing-masing dilukis pada sore hari menjelang badai yang belum turun.",
    },
    yearFrom: 2024,
    yearTo: 2025,
  },
  {
    slug: "tembok",
    title: { en: "Tembok", id: "Tembok" },
    description: {
      en: "Small and medium works built from the textures of old city walls: peeling lime wash, patched plaster, moss.",
      id: "Karya kecil dan sedang yang dibangun dari tekstur tembok tua kota: kapur yang mengelupas, plester tambalan, lumut.",
    },
    yearFrom: 2021,
    yearTo: 2023,
  },
];

const artworks: Artwork[] = [
  {
    slug: "afternoon-pressure",
    title: { en: "Afternoon Pressure", id: "Tekanan Sore" },
    year: 2025,
    seriesSlug: "before-the-rain",
    images: [
      { role: "primary", seed: 101, alt: { en: "Afternoon Pressure, full view: a heavy band of rust and grey over a pale ochre ground", id: "Tekanan Sore, tampak penuh: pita berat karat dan abu-abu di atas dasar oker pucat" } },
      { role: "macro", seed: 102, alt: { en: "Close-up of palette-knife ridges in rust and grey", id: "Detail guratan pisau palet berwarna karat dan abu-abu" } },
      { role: "macro", seed: 103, alt: { en: "Close-up of a thin ochre wash running into thick paint", id: "Detail sapuan oker tipis yang mengalir ke cat tebal" } },
      { role: "edge", seed: 104, alt: { en: "Side of the canvas showing paint wrapping over the edge", id: "Sisi kanvas, cat melingkar sampai ke tepi" } },
      { role: "signature", seed: 105, alt: { en: "Signature on the lower right corner", id: "Tanda tangan di pojok kanan bawah" } },
    ],
    dimensions: { width: 150, height: 120, depth: 4 },
    medium: "Oil on canvas",
    status: "available",
    story: {
      en: "This was painted in the last week of November, when the clouds sat over the city for four days without breaking. I kept the top of the canvas heavy on purpose and almost lightened it twice.\n\nThe pale strip at the bottom is the light that comes in under the clouds just before rain, the only time the street in front of my studio turns gold.",
      id: "Lukisan ini dibuat di minggu terakhir November, ketika awan menggantung di atas kota selama empat hari tanpa hujan. Bagian atas kanvas sengaja saya buat berat, dan dua kali hampir saya terangkan.\n\nStrip pucat di bawah adalah cahaya yang masuk dari bawah awan tepat sebelum hujan, satu-satunya waktu jalan di depan studio saya berubah keemasan.",
    },
    featured: true,
    internalPrice: 4800,
    shippingNote: "rolled",
  },
  {
    slug: "humid-orchard",
    title: { en: "Humid Orchard", id: "Kebun Lembap" },
    year: 2024,
    seriesSlug: "before-the-rain",
    images: [
      { role: "primary", seed: 201, alt: { en: "Humid Orchard, full view: layered greens dissolving into a grey sky", id: "Kebun Lembap, tampak penuh: lapisan hijau yang larut ke langit abu-abu" } },
      { role: "macro", seed: 202, alt: { en: "Close-up of layered green paint", id: "Detail lapisan cat hijau" } },
      { role: "edge", seed: 203, alt: { en: "Side of the canvas", id: "Sisi kanvas" } },
      { role: "context", seed: 204, alt: { en: "The painting leaning against the studio wall", id: "Lukisan bersandar di dinding studio" } },
    ],
    dimensions: { width: 100, height: 140, depth: 4 },
    medium: "Oil on canvas",
    status: "privateCollection",
    story: {
      en: "My neighbour's rambutan trees go completely still before a storm. I painted this standing at the fence, and the canvas came back to the studio covered in leaves.\n\nIt now lives with a collector in Singapore.",
      id: "Pohon rambutan tetangga saya diam total sebelum badai. Saya melukis ini sambil berdiri di pagar, dan kanvasnya pulang ke studio penuh daun.\n\nSekarang lukisan ini tinggal bersama seorang kolektor di Singapura.",
    },
    exhibitions: [{ title: "Southeast Weather", venue: "Gajah Annex", city: "Singapore", year: 2023 }],
    internalPrice: 3900,
    shippingNote: "rolled",
  },
  {
    slug: "brass-hour",
    title: { en: "Brass Hour" },
    year: 2025,
    seriesSlug: "before-the-rain",
    images: [
      { role: "primary", seed: 301, alt: { en: "Brass Hour, full view: tarnished gold horizon under a dark mass", id: "Brass Hour, tampak penuh: cakrawala emas kusam di bawah massa gelap" } },
      { role: "macro", seed: 302, alt: { en: "Close-up of tarnished gold texture", id: "Detail tekstur emas kusam" } },
      { role: "edge", seed: 303, alt: { en: "Side of the canvas", id: "Sisi kanvas" } },
    ],
    dimensions: { width: 180, height: 90, depth: 4 },
    medium: "Oil on canvas",
    status: "exhibited",
    story: {
      en: "The widest painting in the series, made to be read slowly from left to right like a street.\n\nIt was the centrepiece of Before the Rain at Galeri Lorong.",
    },
    exhibitions: [{ title: "Before the Rain", venue: "Galeri Lorong", city: "Yogyakarta", year: 2025, solo: true }],
    internalPrice: 5600,
    shippingNote: "rolled",
  },
  {
    slug: "lime-wash-no-3",
    title: { en: "Lime Wash No. 3", id: "Kapur No. 3" },
    year: 2022,
    seriesSlug: "tembok",
    images: [
      { role: "primary", seed: 401, alt: { en: "Lime Wash No. 3, full view: chalky white over patches of terracotta", id: "Kapur No. 3, tampak penuh: putih kapur di atas tambalan terakota" } },
      { role: "macro", seed: 402, alt: { en: "Close-up of cracked white paint", id: "Detail cat putih yang retak" } },
      { role: "signature", seed: 403, alt: { en: "Signature on the back of the canvas", id: "Tanda tangan di balik kanvas" } },
    ],
    dimensions: { width: 50, height: 60, depth: 3 },
    medium: "Oil and marble dust on canvas",
    status: "available",
    story: {
      en: "Part of a set of studies of one wall in Kotagede that gets repainted every Lebaran. Under the new white you can always see last year's colour.",
      id: "Bagian dari rangkaian studi satu tembok di Kotagede yang dicat ulang setiap Lebaran. Di bawah putih yang baru, warna tahun lalu selalu kelihatan.",
    },
    internalPrice: 1400,
    shippingNote: "stretched",
  },
  {
    slug: "moss-gutter",
    title: { en: "Moss Gutter", id: "Talang Berlumut" },
    year: 2021,
    seriesSlug: "tembok",
    images: [
      { role: "primary", seed: 501, alt: { en: "Moss Gutter, full view: a vertical green stain over grey plaster", id: "Talang Berlumut, tampak penuh: noda hijau vertikal di atas plester abu-abu" } },
      { role: "macro", seed: 502, alt: { en: "Close-up of green paint over grey", id: "Detail cat hijau di atas abu-abu" } },
    ],
    dimensions: { width: 40, height: 50, depth: 3 },
    medium: "Oil on canvas",
    status: "privateCollection",
    story: {
      en: "The first painting where I stopped using brushes entirely. Everything here was put on with a knife and taken off with a rag.",
      id: "Lukisan pertama di mana saya berhenti memakai kuas sama sekali. Semuanya ditempel dengan pisau dan diangkat dengan kain.",
    },
    internalPrice: 900,
    shippingNote: "stretched",
  },
  {
    slug: "kotagede-dawn",
    title: { en: "Kotagede, Dawn" },
    year: 2023,
    images: [
      { role: "primary", seed: 601, alt: { en: "Kotagede, Dawn, full view: soft pink and blue horizontal bands", id: "Kotagede, Dawn, tampak penuh: pita horizontal merah muda dan biru lembut" } },
      { role: "macro", seed: 602, alt: { en: "Close-up of soft pink and blue layers", id: "Detail lapisan merah muda dan biru" } },
    ],
    dimensions: { width: 80, height: 80, depth: 4 },
    medium: "Acrylic on linen",
    status: "available",
    story: {
      en: "A standalone piece painted for my father's print shop the morning it closed. The pink is the colour of the old proofing paper.",
      id: "Karya lepas yang dilukis untuk percetakan ayah saya, pagi hari ketika percetakan itu tutup. Merah mudanya adalah warna kertas cetak coba yang lama.",
    },
    internalPrice: 2200,
    shippingNote: "stretched",
  },
];

function toPublic({ internalPrice: _omit, ...rest }: Artwork): PublicArtwork {
  return rest;
}

export function getArtist(): Artist {
  return artist;
}

export function getSeries(): Series[] {
  return [...series].sort((a, b) => b.yearTo - a.yearTo);
}

export function getSeriesBySlug(slug: string): Series | undefined {
  return series.find((s) => s.slug === slug);
}

/** Semua karya, terbaru dulu. */
export function getArtworks(): PublicArtwork[] {
  return [...artworks].sort((a, b) => b.year - a.year).map(toPublic);
}

export function getArtwork(slug: string): PublicArtwork | undefined {
  const found = artworks.find((a) => a.slug === slug);
  return found ? toPublic(found) : undefined;
}

/** Karya hero Home: featured terbaru, atau karya terbaru kalau belum ada yang featured. */
export function getHeroArtwork(): PublicArtwork {
  const all = getArtworks();
  return all.find((a) => a.featured) ?? all[0];
}

export function getArtworksBySeries(seriesSlug: string): PublicArtwork[] {
  return getArtworks().filter((a) => a.seriesSlug === seriesSlug);
}
