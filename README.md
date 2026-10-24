# Rute Nusa — Website Pemasaran Travel Mobil

Website informasi untuk layanan travel mobil antar kota. Seluruh pemesanan
diarahkan ke WhatsApp dengan pesan yang sudah terisi otomatis — tidak ada
checkout, pembayaran, akun, atau database.

![Stack](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)

## Stack

| Lapisan | Teknologi | Alasan |
| --- | --- | --- |
| Framework | Next.js 16 (App Router, Cache Components) | Halaman statis/SEO, routing per armada & rute |
| UI | React 19 + TypeScript | Komponen aman tipe, minim JS klien |
| Styling | Tailwind CSS 4 | Design token dan utility konsisten |
| Font | `next/font` — Plus Jakarta Sans + Fraunces | Font di-host sendiri, tanpa request ke Google |
| Data | File TypeScript di `src/lib` | Cukup untuk konten yang berubah jarang |
| Pemesanan | `wa.me` deep link | Tanpa backend; admin mengonfirmasi manual |
| Deploy | Vercel (disarankan) atau Node host | Tidak butuh database |

## Halaman

- `/` — hero, papan keberangkatan, pencarian rute, armada unggulan, rute populer, cara pesan, ulasan, FAQ
- `/armada` — daftar armada + panduan memilih
- `/armada/[slug]` — detail armada, fasilitas, tarif, skema Product
- `/rute` — daftar 10 rute + filter kota asal (query `?dari=`)
- `/rute/[slug]` — detail rute, jadwal, tarif, rute terkait
- `/tentang`, `/faq`, `/kontak`
- `sitemap.xml`, `robots.txt`, `opengraph-image`, `icon.svg`, halaman 404

## Menjalankan

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

Buka http://localhost:3000.

```bash
npm run lint
npm run build
npm start
```

## Konfigurasi

Salin `.env.example` menjadi `.env.local`:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890
NEXT_PUBLIC_SITE_URL=https://rutenusa.id
```

- `NEXT_PUBLIC_WHATSAPP_NUMBER` — nomor tujuan semua tombol. Format internasional
  tanpa `+` dan tanpa spasi (`628…`). Teks tampilan (`+62 812-…`) dihitung otomatis.
- `NEXT_PUBLIC_SITE_URL` — dipakai untuk canonical, Open Graph, sitemap, dan JSON-LD.
  Wajib diisi dengan domain produksi sebelum deploy.

> Variabel `NEXT_PUBLIC_*` dibaca saat build. Setelah mengubahnya, jalankan
> `npm run build` ulang (atau redeploy).

## Mengubah konten

| Yang ingin diubah | File |
| --- | --- |
| Nama brand, nomor WA, alamat, jam, sosial media | `src/lib/site.ts` |
| Armada (kapasitas, fasilitas, tarif, slug) | `src/lib/fleet.ts` |
| Rute, durasi, jam berangkat, tarif | `src/lib/routes.ts` |
| FAQ | `src/lib/faq.ts` |
| Ulasan & statistik | `src/lib/testimonials.ts` |
| Warna, font, bayangan, animasi | `src/app/globals.css` (`@theme`) |
| Hero & section beranda | `src/app/page.tsx` |
| Pesan WhatsApp otomatis | `waMessages` dan `bookingMessage` di `src/lib/site.ts` |

Semua harga memakai `formatRupiah()` sehingga otomatis berformat `Rp 150.000`.
Halaman armada dan rute memakai `generateStaticParams()` — tambahkan item baru di
file data, lalu build ulang; halaman detail, sitemap, dan metadata ikut terbentuk.

## Alur pemesanan

1. Pengunjung memilih rute/armada atau mengisi form pencarian.
2. Tombol membuka `https://wa.me/<nomor>?text=...` dengan rute, tanggal, jumlah
   penumpang, dan permintaan konfirmasi.
3. Admin membalas jadwal, titik jemput, dan total biaya.
4. Pembayaran DP dilakukan di luar situs (transfer/QRIS/tunai).

Tidak ada data pengguna yang disimpan di server. Detail perjalanan hanya dikirim
ke WhatsApp setelah pengunjung menekan tombol.

## Struktur

```
src/
├─ app/                 # route, metadata, sitemap, OG image
│  ├─ armada/[slug]/    # detail armada (static params)
│  ├─ rute/[slug]/      # detail rute (static params)
│  └─ globals.css       # design token Tailwind 4
├─ components/          # header, footer, kartu, form, ilustrasi SVG
└─ lib/                 # data konten, helper WhatsApp, JSON-LD
```

Ilustrasi kendaraan dibuat sebagai SVG (`components/vehicle-art.tsx`) agar tidak
bergantung pada stok foto dan tetap tajam di semua ukuran. Ganti dengan foto asli
lewat `next/image` bila sudah tersedia.

## Deploy

**Vercel** — import repo, tambahkan dua environment variable di atas, deploy.
Cache Components dan Partial Prefetching aktif secara default di `next.config.ts`.

Untuk VPS/Node:

```bash
npm ci
npm run build
npm start
```

Jalankan di belakang reverse proxy (Nginx/Caddy) dengan HTTPS. Jangan gunakan
`next export` — fitur Cache Components dan image optimization membutuhkan server
Node.

## Sebelum go-live

- [ ] Ganti nomor WhatsApp placeholder dengan nomor bisnis asli.
- [ ] Ganti alamat, email, dan tautan sosial media placeholder.
- [ ] Sesuaikan tarif, jadwal, dan fasilitas dengan kondisi nyata.
- [ ] Ganti ulasan contoh dengan ulasan asli yang sudah diizinkan.
- [ ] Isi `NEXT_PUBLIC_SITE_URL` dengan domain produksi.
- [ ] Ganti ilustrasi dengan foto armada asli bila ada.
- [ ] Verifikasi bisnis di Google Business Profile dan tautkan ke halaman kontak.
- [ ] Tambahkan analytics (Vercel Analytics/Plausible) bila diperlukan.

> Semua nama, tarif, jadwal, alamat, dan ulasan di repo ini adalah konten contoh.
> Jangan tayangkan sebelum disesuaikan dengan data bisnis yang sebenarnya.
