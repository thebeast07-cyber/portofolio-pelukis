# Prompt pembuka untuk Claude Code

Tempel ini sebagai pesan pertama di sesi Claude Code (setelah repo dibuka):

---

Baca `CLAUDE.md` dan `docs/PRD.md` dulu. Ini website portofolio pelukis tanpa harga (bukan toko). Fondasinya sudah ada: setup Next.js 14 + Tailwind, design tokens, dan `src/lib/types.ts`.

Tim desain masih menyusun desainnya, jadi saya mau versi kasar yang fungsional dulu dan mudah di-reskin. Kerjakan sesuai urutan di bagian "Belum ada" di `CLAUDE.md`, mulai dari langkah 1 sampai 6, pakai data dummy lokal. Tampilan cukup polos tapi rapi dan mobile-first; semua warna dan font hanya lewat design tokens.

Setelah tiap langkah selesai: jalankan `npm run build`, perbaiki kalau error, lalu commit. Setelah langkah 6, kasih ringkasan singkat apa yang sudah jalan dan apa yang belum.

Kalau ada keputusan yang bentrok dengan PRD, berhenti dan tanya dulu.

---

## Setup repo (sekali saja)

1. Buat repo GitHub baru (private), misalnya `pelukis-portfolio`.
2. Unzip paket ini, lalu push isinya ke repo itu.
3. Buka Claude Code, hubungkan ke repo tersebut, lalu tempel prompt di atas.
4. Untuk deploy: import repo ke Vercel.
