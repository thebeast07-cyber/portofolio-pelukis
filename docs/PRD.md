> Diekstrak otomatis dari PDF. Tabel dan diagram (arsitektur informasi, alur inquiry, roadmap) bisa berantakan di sini; versi aslinya ada di `PRD-asli.pdf`.

PRD




PRD — Website Portofolio Pelukis
 ​Oct 4, 2026   · ​@Nailun Najah


Ringkasan & Tujuan
Situs ini portofolio seorang pelukis. Pekerjaannya: membuat kolektor nasional dan
internasional, galeri, dan kurator mengenali sosok senimannya — cukup untuk
menghubungi tentang sebuah karya yang belum pernah mereka lihat secara fisik.

Harga tidak ditampilkan. Karya tetap bisa ditanyakan dan dibeli, tapi angkanya dibahas
lewat percakapan yang akan dibahas lengkap pada lbagian Alur Inquiry.

Tujuan

 1. Membangun sosok dan identitas personal pelukis sebagai aset jangka panjang.
 2. Menampilkan body of work secara koheren, sehingga gaya dan arah berkaryanya
    terbaca sebagai satu kesatuan.
 3. Membuka jalur inquiry untuk karya dan commission, tanpa menampilkan harga.
 4. Bisa diperbarui tanpa menyentuh kode, setiap kali ada karya baru.
 5. Menampilkan tekstur dan skala karya dengan jujur, tanpa membuka risiko cetak ulang
    ilegal.

Non-goals — secara sadar tidak dikerjakan di versi ini:

      Harga tertera, keranjang, dan checkout. Angka dibahas lewat percakapan, bukan
      dipajang.
      Multi-seniman, akun pengguna, dan pembagian hasil.
      Penjualan print atau merchandise.
      Pencegahan screenshot atau screen recording. Ini mustahil secara teknis di web; lihat
      bagian Strategi Gambar & Perlindungan IP.


Target Pengguna
Empat tipe pengunjung. Tanpa harga tertera, semuanya berakhir pada tindakan yang sama
— menghubungi seniman — jadi jalur itu harus mudah ditemukan dari halaman mana pun.




                                                                                      Page 1 of 23
PRD




  Pengguna             Yang mereka cari      Apa yang                 Apa yang membuat
                                             meyakinkan mereka        mereka pergi

  Kolektor, nasional   Karya yang            Foto makro tekstur,      Tidak jelas bagaimana
  dan internasional    beresonansi, dan      cerita di balik karya,   cara bertanya, foto
                       seniman yang layak    ukuran yang jelas,       kecil atau penuh
                       diikuti               sosok seniman yang       watermark
                                             terasa nyata

  Galeri dan kurator   Body of work yang     Artist statement,        Tidak ada statement,
                       koheren, bukan        riwayat pameran,         karya terasa tidak
                       kumpulan karya acak   konsistensi gaya         berhubungan satu
                                             antar karya, foto        sama lain
                                             berkualitas pameran

  Peminat              Apakah seniman        Contoh commission        Tidak ada informasi
  commission           menerima pesanan,     sebelumnya, alur         commission sama
                       dan bagaimana         kerja yang dijelaskan,   sekali
                       prosesnya             lama pengerjaan

  Pengunjung dari      Konteks di balik      Halaman karya yang       Situs terasa seperti
  Instagram            karya yang baru       dalam, halaman           template, tidak ada
                       mereka lihat          About yang               sosok di belakangnya
                                             manusiawi


Prioritas desain jatuh ke kolektor dan kurator. Keduanya menilai hal yang sama —
keseriusan — dan konten yang meyakinkan mereka juga melayani dua tipe lainnya.

Menghilangkan harga menaikkan beban pada sisi lain: pengunjung tidak bisa menilai
sendiri apakah sebuah karya terjangkau, jadi satu-satunya jalan maju adalah bertanya.
Kalau tombol inquiry sulit ditemukan atau formnya terasa formal, situs kehilangan lead
yang tidak akan kembali.

Satu catatan yang mengubah banyak keputusan: mayoritas kunjungan akan datang dari
mobile, kemungkinan besar dari tautan Instagram. Setiap keputusan layout dinilai di layar
375px lebih dulu, bukan di desktop.


Ruang Lingkup MVP
Tiga keputusan membentuk seluruh ruang lingkup: portofolio lebih dulu, bukan katalog;
inquiry tanpa harga; dan single-artist. Ketiganya menghapus payment gateway,
keranjang, autentikasi, dan database transaksi dari proyek ini.

Masuk lingkup




                                                                                      Page 2 of 23
PRD




      Halaman About sebagai pusat situs: artist statement, proses berkarya, riwayat
      pameran, foto studio
      Body of work dengan filter berdasarkan tahun, medium, dan ukuran
      Halaman detail per karya dengan zoom tekstur resolusi tinggi
      Fitur View in Room dengan skala akurat
      Form inquiry per karya, tanpa harga, dengan judul karya terisi otomatis
      Form commission request terpisah
      CMS untuk mengelola karya dan konten About tanpa menyentuh kode
      Halaman Terms yang menyatakan hak penggunaan gambar
      Bahasa Inggris utama dengan toggle Indonesia
      SEO dan Open Graph image agar tautan terlihat baik saat dibagikan

Di luar lingkup


  Tidak dikerjakan                             Alasan

  Harga tertera di halaman karya               Keputusan baru. Situs ini portofolio; angka
                                               dibahas lewat percakapan

  Checkout, payment gateway, keranjang         Konsekuensi langsung dari poin di atas

  Akun pengguna, login, wishlist               Tidak ada kebutuhan yang dilayani di versi
                                               single-artist

  Multi-seniman, profil seniman, revenue       Proyek dengan skala berbeda
  split

  Kalkulasi ongkir otomatis per negara         Ongkir kanvas terlalu bervariasi untuk
                                               diotomatiskan; dibahas manual per inquiry

  Blog atau newsletter                         Bisa ditambah nanti; tidak memengaruhi inquiry
                                               pertama

  Penjualan print dan merchandise              Mengubah model konten dan melemahkan
                                               posisi portofolio

  Virtual gallery 3D walkthrough               Fase lanjut — lihat Roadmap

  Anti-screenshot, disable klik kanan          Mustahil secara teknis, dan merugikan
                                               pengunjung yang jujur


Situs dianggap siap diluncurkan ketika seseorang bisa memahami siapa senimannya,
menelusuri karyanya, dan mengirim inquiry — tanpa bantuan.




                                                                                             Page 3 of 23
PRD




Arsitektur Informasi




arsitektur informasi · 6 rute, 1 halaman penutup

Homepage dibuka dengan satu karya besar, baru nama dan statement seniman di
bawahnya. Urutan ini disengaja: karya yang kuat menjual senimannya lebih baik daripada
sebaliknya, dan potret di posisi paling atas membuat situs terbaca seperti CV.

Halaman About naik jadi pusat situs, bukan pelengkap. Di portofolio tanpa harga, halaman
itulah yang menanggung seluruh beban meyakinkan — statement, proses berkarya,
riwayat pameran, dan sosok yang terasa nyata. Kurator dan galeri sering membukanya
lebih dulu daripada halaman karyanya.

/gallery tetap jadi tulang punggung, tapi dibaca sebagai body of work: dikelompokkan
per seri, bukan dijejer sebagai stok.

Rute /studio adalah panel CMS. Ia hidup di domain yang sama tapi tidak muncul di
navigasi, dan tidak diindeks mesin pencari.



Model Konten
Tiga tipe dokumen: artwork , series , dan artist . Yang terakhir adalah singleton — satu
dokumen berisi seluruh identitas pelukis, dan itulah yang membuat halaman About bisa
dikelola tanpa menyentuh kode.




                                                                                   Page 4 of 23
PRD




Schema ini dipakai sama persis baik saat data masih dummy lokal maupun setelah pindah
ke CMS, sehingga migrasinya tidak mengubah tampilan.

artwork


  Field             Tipe          Wajib       Catatan

  title             string        Ya          Judul karya

  slug              slug          Ya          Dibuat otomatis dari judul, bisa diedit

  year              number        Ya          Tahun penyelesaian

  series            reference     Tidak       Mengelompokkan karya; ini yang membuat
                                              body of work terbaca koheren, bukan acak

  images            array of      Ya, min 2   Urutan menentukan peran; lihat di bawah
                    image

  dimensions        object        Ya          width , height , depth dalam cm. Konversi
                                              ke inch otomatis

  medium            string        Ya          Contoh: oil on canvas, acrylic on canvas

  status            enum          Ya          available , privateCollection ,
                                              exhibited

  story             rich text     Ya          2–3 paragraf. Ini yang membangun nilai karya

  exhibitions       array         Tidak       Nama pameran, tempat, tahun. Bahan utama
                                              bagi kurator

  featured          boolean       Tidak       Menentukan karya yang tampil di homepage

  orientation       enum          Otomatis    Dihitung dari dimensi; dipakai layout grid dan
                                              View in Room

  internalPrice     number        Tidak       Hanya terlihat di CMS, tidak pernah
                                              dirender ke situs. Catatan untuk seniman
                                              saat membalas inquiry

  shippingNote      enum          Tidak       rolled , stretched , framed . Dipakai saat
                                              membalas, tidak ditampilkan di halaman


series — title , slug , description , year range . Satu seri mengikat beberapa karya
menjadi pernyataan, dan inilah yang dibaca kurator sebagai tanda keseriusan.

artist (singleton) — name , portrait , statement , bio , processImages[] ,
exhibitions[] , education[] , contact , socials[] . Seluruh halaman About dibangun
dari dokumen ini.


                                                                                         Page 5 of 23
PRD




Peran setiap gambar — urutan dalam array menentukan fungsinya:

 1. Primary — seluruh lukisan, bersih, tanpa watermark, pencahayaan rata. Ini yang
      muncul di grid, OG image, dan hero.
 2. Macro — detail brushstroke dari dekat. Minimal satu, idealnya dua. Ini satu-satunya
    gambar yang diberi watermark.
 3. Edge — sisi kanvas, menunjukkan ketebalan dan kualitas pengerjaan.
 4. Signature — tanda tangan seniman.
 5. Context — opsional, foto karya di studio atau dipegang, untuk referensi skala nyata.

Setiap gambar punya field alt wajib, untuk aksesibilitas dan SEO.

Aturan status

Karya tidak pernah dihapus, dan statusnya memakai bahasa dunia seni, bukan bahasa
toko.


  Status                  Tampil sebagai    Artinya

  available               Available         Masih di tangan seniman, bisa ditanyakan

  privateCollection       Private           Sudah dimiliki kolektor
                          collection

  exhibited               Exhibited         Pernah atau sedang dipamerkan; biasanya
                                            disertai nama pameran


Perbedaannya bukan kosmetik. Sold membaca seperti stok habis; Private collection
membaca seperti prestasi. Keduanya menggambarkan kejadian yang sama, tapi hanya
satu yang menaikkan posisi senimannya — dan di situs tanpa harga, bahasa seperti ini
yang menanggung seluruh kesan nilai.

Karya berstatus privateCollection tetap tampil di galeri, tetap punya halaman detail,
dan tetap diindeks Google. Tombolnya berubah menjadi "Request something similar" —
mengubah karya yang tidak lagi tersedia menjadi lead commission.




                                                                                       Page 6 of 23
PRD




Alur Inquiry




alur inquiry · 6 langkah, tanpa payment gateway

Langkah 1 dan 2 adalah satu-satunya bagian yang dibangun di situs. Sisanya terjadi di
email, WhatsApp, dan percakapan.

Tanpa harga di halaman, langkah 4 jadi titik paling rawan — di situlah angka disebut untuk
pertama kali. Balasan yang lambat, atau harga yang berbeda antar penanya, merusak
kepercayaan lebih cepat daripada harga yang dianggap mahal.

Field form inquiry


  Field      Wajib               Catatan

  Karya      Terisi otomatis     Judul karya, tidak bisa diubah pengunjung

  Nama       Ya

  Email      Ya                  Jalur balasan utama

  Negara     Ya                  Menentukan estimasi ongkir — tanpa ini balasan
                                 pertama jadi tidak berguna

  Pesan      Tidak               Dikosongkan tidak menghalangi pengiriman


Field dijaga seminimal mungkin. Setiap field tambahan menurunkan jumlah inquiry, dan
sisanya bisa ditanyakan di balasan pertama.

Percabangan untuk karya yang sudah terjual

Pada karya berstatus privateCollection , tombol berubah menjadi "Request something
similar" dan form masuk ke alur yang sama di langkah 2, dengan penanda bahwa ini
permintaan commission. Karya yang sudah dimiliki kolektor tetap menghasilkan lead.


                                                                                    Page 7 of 23
PRD




Ekspektasi respons

Halaman menyatakan balasan dalam 24 jam, dan janji itu harus ditepati. Pembeli
internasional yang tidak dibalas dalam sehari menganggap situsnya tidak aktif — dan
tidak mengirim inquiry kedua.


Fitur View in Room
Fitur ini menjawab pertanyaan yang paling sering menghentikan orang sebelum mereka
bertanya: seberapa besar ini sebenarnya. Angka 60×80cm tidak berarti apa-apa di kepala
orang; lukisan di atas sofa berarti segalanya.

Di situs tanpa harga, menghilangkan keraguan praktis jadi lebih penting, bukan kurang —
karena satu-satunya langkah maju yang tersedia bagi pengunjung adalah mengirim pesan.

Cara kerja

Lukisan di-composite ke atas foto ruangan preset menggunakan CSS transform. Bukan 3D,
bukan AR, bukan WebGL. Satu gambar di atas gambar lain dengan skala yang dihitung
benar.

Setiap foto ruangan preset menyimpan dua angka kalibrasi: lebar dinding yang terlihat
dalam cm, dan koordinat area dinding dalam piksel. Dari situ skala lukisan dihitung
otomatis dari field dimensions . Artinya seniman tidak perlu menyetel apa pun per karya
— upload dimensi yang benar, skalanya mengikuti.

Ruangan preset


  Preset         Fungsi                                             Referensi skala

  Living room    Konteks paling umum, paling relatable              Sofa tiga tempat duduk

  Bedroom        Karya ukuran sedang di atas headboard              Tempat tidur queen

  Office         Pembeli korporat dan karya ukuran kecil            Meja kerja dan kursi

  Plain wall     Menilai karya tanpa distraksi, dengan silhouette   Silhouette manusia
                 manusia tinggi 170cm


Preset Plain wall adalah yang paling penting secara fungsional. Tiga lainnya menjual
suasana; yang ini menjawab pertanyaan skala dengan paling jujur.

Requirement

      Default menampilkan Living room; preset diganti lewat thumbnail, bukan dropdown
      Perpindahan preset harus instan — semua foto ruangan di-preload




                                                                                       Page 8 of 23
PRD




      Di mobile, muncul sebagai bagian dari galeri gambar yang bisa di-swipe, bukan modal
      terpisah
      Lukisan menampilkan bayangan halus agar tidak terlihat seperti tempelan
      Ukuran dalam cm dan inch tampil sebagai overlay di samping lukisan
      Foto ruangan memakai gambar yang bebas lisensi untuk penggunaan komersial, atau
      foto sendiri

Batasan yang disampaikan ke pengguna

Satu baris teks di bawah fitur: ini simulasi untuk referensi skala, bukan representasi warna
yang akurat. Warna lukisan di layar selalu berbeda dari aslinya, dan menyatakan itu lebih
dulu mencegah sengketa setelah pengiriman.


Strategi Gambar & Perlindungan IP
Prinsipnya: jangan mencegah penyalinan, buat salinannya tidak berguna.


Mengapa anti-screenshot tidak dikejar
Memblokir screenshot dan screen recording tidak mungkin dilakukan di web. Screenshot
adalah fungsi sistem operasi; JavaScript di halaman tidak punya akses untuk mendeteksi
maupun mencegahnya, dan tidak ada Web API untuk itu. Bahkan jika ada, gambar tetap
harus sampai ke mata pengunjung agar bisa dilihat — dan siapa pun bisa memfoto layar
dengan ponsel.

Upaya yang biasa dicoba — menonaktifkan klik kanan, memblokir PrintScreen,
mendeteksi DevTools — bisa dilewati dalam hitungan detik oleh orang yang berniat, tapi
berhasil sepenuhnya mengganggu calon pembeli yang jujur. Rugi di dua sisi, jadi tidak
dipakai.


Plafon resolusi: pertahanan utama
File resolusi cetak tidak pernah diunggah ke CMS. Semua gambar diresize ke maksimal
2000px pada sisi terpanjang sebelum upload. Master resolusi penuh disimpan offline.

Ini penting karena CMS menyajikan gambar dari URL publik dengan parameter ukuran
seperti ?w=1200 . Siapa pun bisa menghapus parameter itu dan mendapatkan file original
yang diunggah. Jadi yang diunggah adalah batas atas yang dibagikan ke internet — tidak
ada pengaturan yang bisa membatalkan itu.

Mencetak kanvas 60×80cm dengan kualitas layak butuh file sekitar 7000px. Pada 2000px
hasil cetaknya pecah dan tidak laku, sementara 2000px masih lebih dari cukup untuk
tampil tajam di layar Retina dan untuk zoom tekstur. Satu langkah ini menghapus hampir
seluruh risiko nyata, tanpa biaya.



                                                                                     Page 9 of 23
PRD




Lapisan pendukung

  Lapisan                Efektivitas             Biaya            Keputusan

  Plafon resolusi        Tinggi — cetak ulang    Gratis           Dipakai
  2000px                 jadi mustahil

  Zoom berbasis tile —   Tinggi                  Sedang           Dipakai
  gambar zoom
  dipotong jadi
  kepingan, bukan satu
  file besar

  Watermark halus,       Sedang                  Estetika         Dipakai, terbatas
  hanya di foto makro                            sedikit
                                                 terganggu

  Metadata IPTC —        Rendah untuk            Gratis           Dipakai, otomatis saat
  nama dan copyright     mencegah, tinggi                         upload
  tertanam di file       untuk pembuktian

  Registrasi hak cipta   Ini yang punya          Murah            Direkomendasikan, di
  — DJKI dan US          kekuatan hukum                           luar lingkup teknis
  Copyright Office

  Reverse image search   Deteksi saja            Gratis, perlu    Direkomendasikan
  rutin — Google                                 kebiasaan        sebagai kebiasaan
  Images, TinEye                                                  bulanan

  Halaman Terms yang     Mendukung klaim         Gratis           Dipakai
  menyatakan hak         takedown
  penggunaan


Watermark hanya dipasang di foto makro. Foto utama tetap bersih — foto utama
berwatermark terlihat tidak percaya diri dan menurunkan kesan premium, dan kolektor
memperhatikan hal seperti itu.

Soal registrasi: karena target pasarnya internasional, registrasi di US Copyright Office
berdampak besar. Tanpa registrasi, klaim DMCA hanya bisa meminta takedown. Dengan
registrasi, tersedia jalur ganti rugi statutori — dan itu yang membuat platform dan pelaku
menurut.




                                                                                      Page 10 of 23
PRD




Risiko yang arahnya berlawanan
Produk yang dijual adalah objek fisik yang unik. Orang yang punya file JPEG tidak punya
lukisannya, dan tidak bisa menjualnya sebagai karya asli. Risiko nyatanya hanya dua:
sindikat print-on-demand, dan gambar dipakai di iklan atau penipuan. Keduanya sudah
tertangani oleh plafon resolusi, metadata, dan pemantauan.

Risiko yang lebih besar justru sebaliknya: tidak ada yang tahu karyanya ada. Pembeli
lukisan perlu melihat tekstur dengan jelas sebelum mengeluarkan uang besar untuk
barang yang belum pernah dipegang. Gambar yang kecil, gelap, penuh watermark, dan
diproteksi berlebihan membuat mereka pergi. Setiap keputusan proteksi di dokumen ini
diuji terhadap biaya itu.



Internasionalisasi & Pengiriman
Target pasarnya Indonesia tapi berorientasi internasional. Konsekuensinya bukan sekadar
menambah tombol bahasa.

Bahasa

Bahasa Inggris adalah bahasa utama, ditulis sebagai bahasa asli — bukan hasil terjemahan
dari Indonesia. Pasar seni internasional menilai hal ini, dan kalimat yang terasa seperti
terjemahan mesin langsung menurunkan kredibilitas. Bahasa Indonesia tersedia lewat
toggle, dengan konten penuh — bukan terjemahan sebagian. Pasar domestik ikut dihitung,
jadi versi Indonesia bukan pelengkap.

Secara teknis: routing locale disiapkan sejak awal dan kedua bahasa diisi di MVP. Setiap
field teks di CMS punya dua versi, dan karya yang belum punya terjemahan Indonesia
jatuh kembali ke teks Inggris — bukan tampil kosong.

Harga — tidak ditampilkan

Harga tidak muncul di mana pun — tidak di grid, tidak di halaman detail, tidak di hasil
pencarian. Ini keputusan posisi, bukan kelalaian. Situs seniman mapan dan galeri jarang
memajang angka, karena harga yang tertera mengubah karya menjadi produk dan
mengundang perbandingan yang tidak menguntungkan seniman.

Konsekuensinya harus ditanggung dengan sadar: pengunjung kehilangan cara menilai
sendiri apakah sebuah karya masuk anggarannya, dan sebagian akan pergi tanpa
bertanya. Yang menahan kehilangan itu cuma satu hal — tombol inquiry yang mudah
ditemukan dan form yang terasa ringan, bukan formulir resmi.

Angka tetap dicatat di CMS lewat field internalPrice yang tidak pernah dirender.
Tujuannya agar seniman menjawab dengan konsisten; tanpa catatan itu, harga yang
disebutkan ke dua penanya berbeda bisa tidak sama, dan itu merusak kepercayaan lebih
cepat daripada harga yang dianggap mahal.


                                                                                      Page 11 of 23
PRD




Pengiriman — masalah terbesar

Kanvas berukuran besar dari Indonesia ke Amerika atau Eropa bisa menelan biaya 150–300
USD, dan pembeli sering terkena import duty yang tidak mereka duga. Ini penyebab
pembatalan paling umum pada penjualan lukisan lintas negara.

Strateginya:


  Pendekatan                            Kapan dipakai         Yang disampaikan ke pembeli

  Rolled canvas — dikirim tanpa         Default untuk         Jauh lebih murah dan lebih aman;
  stretcher, digulung dalam tabung      karya besar           pembeli memasang stretcher di
                                                              negaranya

  Stretched — dikirim terpasang         Karya kecil sampai    Siap digantung saat tiba
  di stretcher                          sedang

  Framed                                Hanya atas            Biaya dan risiko tertinggi
                                        permintaan


Setiap karya menyimpan shippingNote yang menyatakan cara pengirimannya. Halaman
detail karya menampilkan ini secara eksplisit, bukan menyembunyikannya di FAQ.

Soal import duty, satu baris jujur di halaman karya: bea masuk dan pajak di negara tujuan
menjadi tanggung jawab pembeli. Menyatakan ini lebih dulu mencegah sengketa yang jauh
lebih mahal daripada kehilangan satu penjualan.

Certificate of Authenticity

Wajib, bukan opsional. Ini standar yang dicari kolektor internasional, dan ketiadaannya
menjadi alasan untuk tidak membeli. Berisi judul, tahun, dimensi, medium, tanda tangan
seniman, dan nomor seri. Disebutkan di setiap halaman karya sebagai bagian dari apa yang
pembeli terima.


Stack Teknis, Performa & SEO

  Bagian          Pilihan                    Alasan

  Framework       Next.js, App Router        SEO penting untuk penjualan karya; image
                                             optimization bawaan; static generation cocok
                                             untuk katalog yang jarang berubah

  CMS             Sanity                     Gratis di skala ini, panel admin bisa dipakai non-
                                             teknis, sekaligus image CDN. Alternatif Payload
                                             jika ingin self-host




                                                                                           Page 12 of 23
PRD




  Bagian           Pilihan                  Alasan

  Styling          Tailwind                 Kontrol tipografi yang ketat, penting untuk situs
                                            seni

  Hosting          Vercel                   Gratis di skala ini, integrasi langsung dengan
                                            Next.js

  Gambar           Sanity image CDN         Resize dan format otomatis; menghindari
                                            menyimpan gambar besar di repo

  Form &           Resend atau              Inquiry masuk ke email; tanpa backend sendiri
  email            Formspree


Tidak ada database, tidak ada autentikasi, tidak ada server state. CMS adalah satu-
satunya sumber data.

Strategi rendering

Semua halaman karya di-generate statis saat build. Webhook dari CMS memicu rebuild
ketika karya ditambah atau diubah. Hasilnya halaman yang sangat cepat dan biaya hosting
nol, dengan konsekuensi perubahan konten butuh satu sampai dua menit untuk tampil —
trade-off yang wajar untuk katalog lukisan.

Target performa

Situs penuh gambar besar dengan pembeli di belahan dunia lain menggunakan jaringan
mobile. Performa adalah fitur komersial, bukan kemewahan teknis.

      LCP di bawah 2,5 detik pada koneksi 4G
      Gambar grid disajikan sebagai WebP atau AVIF, dengan ukuran responsif per
      breakpoint
      Gambar zoom resolusi tinggi dimuat hanya saat zoom dibuka, tidak di muat awal
      Placeholder blur saat gambar dimuat, agar layout tidak melompat
      Tidak ada library berat di halaman katalog

SEO

      Judul dan deskripsi unik per karya, dibangun dari judul, medium, dan dimensi
      Structured data VisualArtwork pada setiap halaman karya — bukan Product , karena
      tidak ada harga maupun ketersediaan untuk dideklarasikan
      Structured data Person pada halaman About, lengkap dengan tautan ke akun sosial.
      Ini yang membuat Google mengenali pelukis sebagai entitas, bukan sekadar nama di
      sebuah halaman — langkah pertama menuju knowledge panel, dan inti dari personal
      branding di sisi teknis




                                                                                             Page 13 of 23
PRD




      Open Graph image per karya memakai foto utama, agar tautan yang dibagikan ke
      Instagram dan WhatsApp tampil benar
      Field alt wajib di setiap gambar
      Sitemap otomatis, termasuk karya berstatus privateCollection
      Halaman karya privateCollection tetap diindeks — ini aset SEO jangka panjang dan
      bukti rekam jejak, bukan halaman mati

Analytics

Satu tool ringan dan menghormati privasi, misalnya Plausible atau Vercel Analytics. Yang
perlu diketahui hanya: karya mana yang paling dilihat, berapa yang membuka zoom,
berapa yang membuka View in Room, dan berapa yang mengirim inquiry. Tidak perlu
cookie banner jika tool-nya tidak memakai cookie — satu hambatan konversi lebih sedikit.


Roadmap




roadmap · 6 tahap, 2 gerbang keputusan

Urutannya berubah mengikuti pivot ke portofolio. About naik dari tahap 5 ke tahap 3,
karena portofolio tanpa halaman About bukan portofolio — ia cuma galeri gambar tanpa
pemilik. Situs tidak bisa diluncurkan tanpanya.




                                                                                   Page 14 of 23
PRD




Tahap 1 tetap paling depan karena membuka pekerjaan paralel: begitu CMS jalan,
pengunggahan karya dan penulisan konten About bisa berjalan bersamaan dengan
pengembangan tahap berikutnya.

Beban konten justru naik setelah pivot ini. Selain 10–30 karya, sekarang dibutuhkan artist
statement, bio, riwayat pameran, dan foto proses di studio — dan menulis artist statement
yang tidak terdengar klise biasanya memakan waktu lebih lama daripada memotret
seluruh karyanya.

Tahap 6 punya gerbang yang eksplisit. Jika View in Room dipakai kurang dari 25%
pengunjung halaman karya, galeri 3D hampir pasti tidak akan dipakai juga, dan usahanya
lebih baik dialihkan ke kualitas foto dan jangkauan.


Yang Perlu Disiapkan Pelukis
Bagian ini ditujukan untuk pihak pelukis. Desain dan kode bisa selesai sementara situsnya
masih kosong — yang menentukan tanggal rilis adalah materi di bawah, bukan kecepatan
pengerjaan teknis.

Foto karya sudah selesai diambil, jadi mata rantai paling rawan di proyek seperti ini sudah
lewat. Yang tersisa hampir seluruhnya berupa teks dan keputusan — dan tidak ada satu
pun yang bisa digantikan developer atau desainer. Kami bisa mengarahkan, mengedit,
menerjemahkan, dan memotong, tapi bahan mentahnya hanya ada pada pelukisnya.
Karena harga dihilangkan dari situs, bahan inilah yang menanggung seluruh beban
meyakinkan: tidak ada angka atau tombol beli yang bisa menutupi materi yang setengah
jadi.


  Materi                  Status       Isi singkat

  Foto karya              Sudah ada    Diambil sendiri oleh tim pengembang. Tinggal
                                       verifikasi kelengkapan dan serah terima file master

  Nama & domain           Belum        Satu ejaan nama untuk semua kanal, lalu
                                       domainnya

  Data tiap karya         Belum        Judul, tahun, ukuran, medium, seri, status, cerita

  Materi About            Belum        Statement, bio, riwayat pameran, potret, foto
                                       proses

  Keputusan operasional   Belum        Email, WhatsApp, kebijakan commission, harga
                                       internal

  Legal & kepemilikan     Belum        Kepemilikan akun, hak cipta karya, serah terima file
                                       master foto




                                                                                       Page 15 of 23
PRD




Foto karya — sudah ada, tinggal diverifikasi
Di situs tanpa harga, foto adalah produknya. Pembeli tidak bisa menyentuh kanvasnya, jadi
yang mereka nilai adalah fotonya — dan foto itu sudah ada. Yang tersisa bukan lagi
pengambilan, tapi pemeriksaan dan serah terima.

Perlu dipastikan sebelum tahap 2 jalan:

      Kelengkapan bidikan per karya: tampak penuh, makro tekstur, sisi kanvas, tanda
      tangan, dan satu foto berskala ruangan. Yang paling sering terlewat adalah makro dan
      sisi kanvas — padahal dua itulah yang membuktikan lukisannya nyata dan dikerjakan
      tangan.
      Resolusi master: sisi panjang minimal 3000px supaya crop makro masih tajam. Situs
      tetap hanya menerima turunan 2000px, sesuai Strategi Gambar.
      Konsistensi warna antar karya. Kalau sesi fotonya terpisah-pisah, grid galeri bisa
      terlihat belang meski tiap fotonya bagus sendiri-sendiri. Satu pass koreksi warna di
      akhir menyelesaikan ini.
      Akurasi warna terhadap kanvas aslinya. Ini yang dimaksimalkan: warna di situs harus
      warna yang ada di kanvas, bukan warna yang terlihat lebih menarik di layar. Warna yang
      tidak cocok adalah sumber keluhan paling umum setelah lukisan sampai di tangan
      pembeli, dan keluhan itu sulit dibantah lewat chat.
      Penyimpanan file master di luar CMS, dan kejelasan hak atas foto itu — lihat Legal &
      kepemilikan.

Kebijakan editing — pemrosesan dibuat seminimal mungkin: denoise, pelurusan, dan
pemotongan latar. Tanpa color grading, tanpa auto-enhance, tanpa penajaman saturasi.
Resolusinya mengikuti plafon yang sudah ditetapkan di Strategi Gambar dan tidak
berubah. Empat hal teknis menentukan apakah niat mempertahankan warna asli itu
benar-benar sampai ke layar pengunjung:

      Ekspor ke sRGB dengan profil ICC tertanam. Ini penyebab paling umum warna
      berubah antara file master dan halaman web: master di Adobe RGB atau ProPhoto yang
      diunggah tanpa dikonversi akan tampil pudar dan bergeser di sebagian besar browser.
      Konversinya dilakukan sekali di langkah ekspor, seragam untuk semua karya.
      Profil warna harus bertahan melewati pipeline gambar. CMS dan Next.js meng-
      encode ulang gambar ke WebP atau AVIF; perlu diverifikasi sekali di awal bahwa
      profilnya tidak dibuang dalam proses itu. Kalau dibuang, file ekspor yang sudah benar
      tetap akan tampil salah dan penyebabnya sulit dilacak belakangan.
      Denoise jangan dipakai sama rata. Pada bidikan makro, tekstur adalah subjeknya —
      denoise agresif akan menghaluskan guratan kuas sampai lukisannya terlihat seperti
      cetakan, dan justru bidikan itulah yang meyakinkan pembeli bahwa karyanya dikerjakan
      tangan. Bidikan makro diproses paling ringan, atau tidak diproses sama sekali.




                                                                                       Page 16 of 23
PRD




      Monitor yang dipakai mengedit sebaiknya dikalibrasi, atau minimal hasilnya dicek di
      dua layar berbeda plus satu ponsel. Mengoreksi warna di monitor yang biasnya tidak
      diketahui berarti memindahkan warna ke arah bias monitor itu, bukan ke arah
      kanvasnya.

Layar pengunjung tetap di luar kendali kita. Karena itu halaman detail karya memuat satu
baris bahwa warna bisa sedikit berbeda antar layar, dan menawarkan foto atau video
tambahan atas permintaan. Satu baris itu memindahkan percakapan soal warna ke
sebelum pembelian, bukan sesudah lukisannya sampai.

Standar ini tetap berlaku untuk karya yang datang nanti. Situs dibuat supaya karya baru
bisa ditambahkan tanpa menyentuh kode, jadi siapa pun yang memfoto karya berikutnya
harus memakai setup yang sama: cahaya menyebar tanpa flash, kanvas tegak lurus lensa,
latar polos, dan white balance yang sama seperti sesi pertama. Karya baru yang fotonya
tidak cocok akan langsung terlihat di grid galeri.


Nama & domain
Dua hal ini ditanyakan paling awal karena menempel di semua yang dibuat sesudahnya:
domain, alamat email, Certificate of Authenticity, structured data Person , dan akun
media sosial. Mengubahnya di tengah jalan berarti mengganti semua itu sekaligus.

      Nama yang dipakai. Nama lengkap, nama panggung, atau versi pendeknya — pilih satu
      dan pakai itu di mana-mana, dengan ejaan yang persis sama di situs, Instagram, label
      pameran, dan katalog galeri. Google menyatukan semua kanal menjadi satu entitas
      lewat konsistensi nama; dua ejaan yang berbeda dibaca sebagai dua orang, dan
      personal branding-nya terbelah.
      Domain. Nama pelukis diikuti .com adalah pilihan default yang benar untuk portofolio.
      Ketersediaannya perlu dicek sekarang, karena jawabannya menentukan alamat email
      dan semua materi cetak. Kalau sudah diambil orang lain, urutan alternatif yang masih
      wajar: .art , lalu .com dengan inisial atau nama tengah, lalu .id . Hindari
      menambahkan kata seperti "studio", "art", atau "official" di depan nama — itu membuat
      domainnya sulit diucapkan dan terdengar seperti akun cadangan.
      Siapa yang mendaftarkan. Atas nama pelukis sejak hari pertama, bukan diserahkan
      belakangan — alasannya di Legal & kepemilikan.


Data tiap karya
Untuk setiap lukisan, keterangan berikut harus datang dari pelukis. Karya yang datanya
belum lengkap lebih baik ditunda daripada dipublikasikan setengah jadi — halaman detail
yang kosong justru melemahkan karya di sebelahnya.




                                                                                      Page 17 of 23
PRD




  Field                Isi                               Catatan

  Judul                Judul karya                       "Untitled" boleh, tapi beri
                                                         penomoran supaya bisa dirujuk saat
                                                         inquiry

  Tahun                Tahun penyelesaian

  Ukuran               Lebar × tinggi × kedalaman,       Dipakai View in Room untuk
                       dalam cm                          menghitung skala. Ukuran yang
                                                         salah membuat lukisan tampil salah
                                                         besar di foto ruangan

  Medium               "Oil on canvas", "Acrylic on      Penulisannya harus konsisten di
                       linen"                            semua karya

  Seri                 Seri tempat karya ini masuk       Boleh kosong untuk karya lepas

  Status               Available, Private collection,    Harus dijaga akurat. Karya yang
                       atau Exhibited                    sudah terjual tapi masih Available
                                                         berarti email yang akhirnya harus
                                                         ditolak

  Cerita               80–150 kata per karya             Bagian tersulit dan paling bernilai —
                                                         lihat catatan di bawah

  Riwayat pameran      Nama pameran, tempat, tahun       Hanya kalau karya itu pernah
  karya ini                                              dipamerkan

  Harga internal       Angka dalam USD                   Hanya terlihat di CMS, tidak pernah
                                                         tampil di situs


Cerita per karya adalah bagian yang paling sering macet. Yang dicari pembeli bukan
analisis, tapi asal-usulnya: kenapa karya ini dibuat, apa yang sedang terjadi waktu itu, apa
yang nyaris diubah tapi dibiarkan. Tiga kalimat yang jujur mengalahkan satu paragraf
istilah seni.

Kalau menulis terasa berat, cara tercepat: pelukis merekam voice note dua sampai tiga
menit per karya, bercerita seperti ke teman. Transkripnya kami rapikan menjadi teks. Ini
mengubah pekerjaan menulis tiga puluh naskah menjadi sekitar dua jam bicara.


Materi About
Di portofolio tanpa harga, About adalah halaman yang mengubah penonton menjadi
penanya. Ia tidak bisa diisi belakangan dan tidak bisa diisi oleh kami.




                                                                                        Page 18 of 23
PRD




  Materi                  Bentuk                          Catatan

  Artist statement        150–250 kata                    Suara sendiri. Hindari kalimat yang
                                                          bisa ditempel di portofolio siapa
                                                          pun. Sebut hal yang spesifik:
                                                          bahan apa, kebiasaan apa, obsesi
                                                          apa yang terus berulang

  Bio pendek              50–80 kata, orang ketiga        Dipakai galeri, pers, caption, dan
                                                          structured data Person

  Bio panjang             150–300 kata                    Untuk halaman About

  Riwayat pameran         Tahun, judul, tempat, kota,     Terbaru di atas. Kalau belum
                          tunggal atau bersama            pernah pameran, biarkan kosong
                                                          — jangan diisi hal yang bukan
                                                          pameran

  Pendidikan &            Daftar                          Opsional. Kosong lebih baik
  penghargaan                                             daripada dipaksakan

  Potret seniman          1–2 foto                        Wajah terlihat jelas, bukan selfie.
                                                          Di studio lebih baik

  Foto proses studio      3–5 foto                        Tangan sedang bekerja, palet,
                                                          kanvas belum selesai di easel. Ini
                                                          bagian paling meyakinkan di
                                                          seluruh situs — bukti bahwa
                                                          karyanya memang dikerjakan
                                                          tangan

  Tanda tangan            1 foto atau scan                Dipakai di Certificate of
                                                          Authenticity dan halaman detail


Tulis semuanya dalam bahasa Indonesia dulu, apa adanya. Penerjemahan ke Inggris kami
urus. Statement yang dipaksa langsung ditulis dalam bahasa Inggris yang belum nyaman
biasanya kehilangan suaranya — dan suara itu justru produk utama halaman ini.


Keputusan operasional
Keputusan-keputusan kecil berikut tidak terlihat penting sampai pekerjaan berhenti
karena menunggunya.

      Email tujuan inquiry. Sebaiknya alamat di domain sendiri, bukan Gmail pribadi. Satu
      orang bertanggung jawab membacanya setiap hari.




                                                                                        Page 19 of 23
PRD




      Nomor WhatsApp bisnis, terpisah dari nomor pribadi. Pembeli internasional akan
      menulis di luar jam kerja Indonesia.
      Komitmen waktu balas. Inquiry yang dibalas lebih dari 2×24 jam praktis hilang —
      kolektor membacanya sebagai tanda tidak profesional. Ini bagian dari produk, bukan
      sekadar niat baik.
      Siapa yang memegang CMS. Harus ada satu orang yang mengunggah karya baru:
      pelukisnya sendiri atau satu asisten. Orang itu perlu satu sesi pelatihan sekitar satu
      jam, dan dialah yang menjaga status karya tetap akurat.
      Kebijakan commission: menerima atau tidak, rentang ukuran, lead time, dan apakah
      ada deposit. Pertanyaan ini pasti masuk, dan jawaban yang mengambang membuat
      calon pembeli berhenti di situ.
      Daftar harga internal dalam USD untuk seluruh karya. Tidak tampil di situs, tapi harus
      sudah ada sebelum inquiry pertama datang. Menentukan harga sambil menjawab email
      menghasilkan angka yang berbeda antar pembeli, dan perbedaan itu akan diingat.
      Kesediaan mengirim: rolled, stretched, atau framed, ke negara mana saja, dan siapa
      yang menanggung bea masuk.
      Nama domain. Untuk personal branding, nama pelukis sendiri hampir selalu pilihan
      yang benar.


Legal & kepemilikan
Karena pelukisnya adalah klien dan bukan pemilik proyek ini, hal-hal berikut perlu
disepakati tertulis di awal, bukan saat proyek selesai.

      Semua akun atas nama pelukis — domain, Sanity, Vercel, email, analytics — atau
      diserahkan ke dia di akhir proyek beserta daftar kredensialnya. Situs portofolio yang
      akunnya dipegang pihak lain adalah situs yang suatu hari bisa hilang tanpa bisa diambil
      kembali.
      Hak cipta karya tetap pada pelukis. Yang diberikan ke proyek ini hanya izin
      menampilkan.
      Hak atas foto karya. Hak atas foto karya tetap pada pelukis, meski pengambilannya
      dikerjakan tim pengembang — ini sudah disepakati. Karena secara default hak cipta
      foto ada pada orang yang memotret, kesepakatan itu tetap perlu ditulis satu baris di
      perjanjian, bersama serah terima file masternya. Satu baris sekarang menghindari
      pertanyaan saat foto itu dipakai galeri, pers, atau katalog cetak.
      Pendaftaran hak cipta di DJKI, dan di US Copyright Office kalau pasar internasional
      dibidik serius. Alasannya sudah dibahas di Strategi Gambar: yang kedua itulah yang
      membuat takedown punya gigi.
      Template Certificate of Authenticity dengan tanda tangan asli, siap sebelum
      penjualan pertama.



                                                                                        Page 20 of 23
PRD




      Siapa yang menjawab inquiry secara resmi — pelukis sendiri atau perwakilan. Nama
      itu muncul di setiap email balasan dan sebaiknya konsisten sejak awal.


Apa yang memblokir apa

  Dibutuhkan              Materi                            Kalau belum ada
  sebelum

  Tahap 1                 Nama dan domain                   Repo dan deployment tetap bisa
                                                            jalan, tapi alamat email, COA, dan
                                                            semua materi cetak menunggu
                                                            keputusan ini

  Tahap 2 dimulai         Data tiga karya contoh            Layout galeri dan halaman detail
                                                            tidak bisa diuji dengan konten
                                                            nyata. Keputusan desain yang
                                                            diambil di atas placeholder
                                                            hampir selalu salah

  Tahap 2 selesai         Seluruh data karya dan serah      Situs jadi tapi kosong. Ini
                          terima file master foto           penyebab penundaan paling
                                                            umum di proyek seperti ini

  Tahap 3                 Materi About lengkap              Tidak bisa rilis. Portofolio tanpa
                                                            About bukan portofolio

  Tahap 4                 Email, WhatsApp, kebijakan        Tombol inquiry tidak punya
                          commission, harga internal        tujuan, dan situs belum bisa
                                                            menghasilkan apa pun

  Tahap 5                 Foto ruangan berlisensi           View in Room ditunda. Tidak
                                                            memblokir rilis

  Sebelum penjualan       COA, kesepakatan pengiriman,      Penjualan tetap bisa jalan, tapi
  pertama                 pendaftaran hak cipta             tanpa perlindungan dan tanpa
                                                            dokumen yang diharapkan
                                                            kolektor


Satu hal menentukan kecepatan lebih dari semua yang di atas: satu orang pengambil
keputusan di sisi pelukis. Kalau pemilihan karya dan naskah statement harus lewat
beberapa orang, waktu habis di putaran revisi, bukan di pengerjaan. Tunjuk satu nama
yang berhak mengatakan sebuah materi sudah final.

Checklist di bagian berikutnya adalah versi ringkas dari daftar ini, dalam bentuk yang bisa
dicentang.




                                                                                         Page 21 of 23
PRD




Metrik Keberhasilan & Pertanyaan Terbuka
Metrik yang diukur

Untuk portofolio dengan 10–30 karya, jumlah kunjungan tidak berguna. Yang diukur adalah
kedalaman minat, dan apakah sosok senimannya benar-benar sampai.


  Metrik                     Target awal                  Mengapa ini yang diukur

  Inquiry per bulan          3–5                          Satu-satunya metrik yang
                                                          terhubung langsung ke
                                                          pendapatan

  Kunjungan ke halaman       Di atas 35% pengunjung       Portofolio gagal kalau orang tidak
  About                                                   pernah bertemu senimannya

  Karya dilihat per sesi     Di atas 3                    Menunjukkan body of work
                                                          terbaca sebagai kesatuan, bukan
                                                          satu karya yang kebetulan viral

  Rasio pembukaan zoom       Di atas 40% pengunjung       Menunjukkan apakah karya dinilai
  tekstur                    halaman karya                dengan serius

  Rasio penggunaan           Di atas 25%                  Memvalidasi fitur, sekaligus
  View in Room                                            gerbang untuk tahap 6

  Waktu di halaman karya     Di atas 60 detik             Lukisan dinilai setelah dipandangi,
                                                          bukan di-scroll

  Rasio inquiry menjadi      Dicatat, belum ditarget      Butuh data beberapa bulan
  penjualan                                               sebelum punya arti


Dua metrik ini layak diperhatikan bersama: kalau kunjungan ke About rendah tapi inquiry
tetap masuk, situs bekerja sebagai katalog dan pivot ke portofolio belum benar-benar
terjadi. Kalau View in Room di bawah 10% setelah tiga bulan, fitur itu dievaluasi ulang —
dan galeri 3D sebaiknya tidak dilanjutkan.

Pertanyaan terbuka

      Domain belum ditentukan — untuk personal branding, nama pelukis sendiri hampir
      selalu pilihan yang benar, bukan nama studio atau kata yang dibuat-buat
      Artist statement, bio, dan riwayat pameran belum ditulis
      Foto potret seniman dan foto proses di studio belum ada
      Pengelompokan seri: karya yang ada dibagi menjadi berapa seri, dan apa nama masing-
      masing
      Email tujuan inquiry dan nomor WhatsApp bisnis belum ditentukan



                                                                                         Page 22 of 23
PRD




      Apakah seniman menerima commission, dan berapa lama pengerjaannya
      Foto ruangan untuk View in Room: pakai stock berlisensi komersial atau foto sendiri
      Virtual gallery 3D: diputuskan setelah data tiga bulan pertama masuk
      Foto karya sudah diambil — sisanya verifikasi kelengkapan bidikan dan serah terima
      file master
      Akun domain, CMS, dan hosting didaftarkan atas nama siapa, dan kapan diserahkan ke
      pelukis
      Siapa yang memegang CMS setelah rilis, dan siapa satu orang yang berhak menyatakan
      sebuah materi final
      Daftar harga internal dalam USD untuk seluruh karya belum disusun
      Hak foto sudah disepakati tetap pada pelukis — tinggal dituliskan di perjanjian,
      bersama serah terima file master
      Ejaan nama yang dipakai di seluruh kanal belum diseragamkan — situs, Instagram, label
      pameran, katalog

Catatan tentang virtual gallery 3D

Ide awalnya adalah galeri 3D yang bisa dijelajahi. Itu ditunda secara sadar ke fase 6,
dengan alasan: berat di mobile tempat mayoritas pengunjung berada, cenderung
mengubah pengunjung menjadi pemain alih-alih pembeli, dan bisa menghabiskan porsi
besar waktu pengembangan sebelum ada satu penjualan pun.

Kebutuhan sebenarnya di balik ide itu — "seberapa besar lukisan ini di ruangan saya" —
sudah dijawab oleh View in Room dengan biaya jauh lebih kecil. Jika tetap dibangun nanti,
posisinya sebagai pengalaman tambahan dan bagian dari portofolio, bukan jalur utama
belanja.

Arahan untuk mockup UI ada di tab terpisah: ​Design Brief




                                                                                         Page 23 of 23
