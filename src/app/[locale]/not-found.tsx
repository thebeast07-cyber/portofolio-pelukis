import Link from "next/link";

// Dipanggil lewat notFound(). Teks dua bahasa sekaligus karena `params` tidak tersedia di sini.
export default function NotFound() {
  return (
    <div className="page py-24">
      <p className="eyebrow">404</p>
      <h1 className="h-display mt-3 text-3xl">Page not found · Halaman tidak ditemukan</h1>
      <p className="mt-6">
        <Link href="/en/gallery" className="underline underline-offset-4">
          See all work
        </Link>
        {" · "}
        <Link href="/id/gallery" className="underline underline-offset-4">
          Lihat semua karya
        </Link>
      </p>
    </div>
  );
}
