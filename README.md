# Rute Nusa — Travel Mobil Antar Kota

Situs informasi dan pemesanan travel mobil antar kota. Seluruh pemesanan
diarahkan ke WhatsApp admin — tidak ada akun, checkout, pembayaran, atau
database di dalam aplikasi ini.

## Stack

- **Next.js 16.4** (App Router, Turbopack, Cache Components)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- Tanpa backend, tanpa database

## Menjalankan lokal

Prasyarat: **Node.js 20.9+** (disarankan 22 LTS).

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

Buka <http://localhost:3000>.

Build produksi:

```bash
npm run build
npm start
```

Lint dan type-check:

```bash
npm run lint
npx tsc --noEmit
```

## Environment variables

| Variable | Wajib | Contoh | Keterangan |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Ya | `6281234567890` | Nomor WhatsApp tujuan semua tombol. Format internasional, tanpa `+`, spasi, atau tanda hubung. |
| `NEXT_PUBLIC_SITE_URL` | Ya | `https://rutenusa.id` | URL publik situs. Dipakai untuk `metadataBase`, canonical, Open Graph, `sitemap.xml`, `robots.txt`, dan JSON-LD. Tanpa garis miring di akhir. |

Keduanya diawali `NEXT_PUBLIC_`, artinya nilainya **di-inline saat build**.
Setelah mengubah nilainya di Vercel, lakukan **redeploy** agar perubahan ikut
terpakai.

## Deploy ke Vercel

### Opsi A — lewat GitHub (disarankan)

1. Push project ini ke repository GitHub/GitLab/Bitbucket.
2. Buka <https://vercel.com/new>, lalu import repository tersebut.
3. Vercel mendeteksi framework **Next.js** secara otomatis. Biarkan:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
4. Tambahkan environment variables di **Project → Settings → Environment
   Variables**:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_SITE_URL` (isi dengan domain produksi, mis.
     `https://rutenusa.id`)
5. Klik **Deploy**.
6. Setelah domain final terpasang, pastikan `NEXT_PUBLIC_SITE_URL` sudah
   memakai domain tersebut, lalu **Redeploy** (Deployments → ⋯ → Redeploy).

### Opsi B — lewat Vercel CLI

```bash
npm i -g vercel
vercel login
vercel link

# tambahkan env untuk production
vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER production
vercel env add NEXT_PUBLIC_SITE_URL production

vercel --prod
```

Untuk preview deployment, jalankan `vercel` tanpa `--prod`.

### Checklist sebelum go-live

- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` sudah memakai nomor asli (bukan contoh).
- [ ] `NEXT_PUBLIC_SITE_URL` sudah memakai domain final.
- [ ] `npm run build` sukses tanpa error.
- [ ] Tombol WhatsApp membuka chat dengan pesan yang terisi.
- [ ] `/sitemap.xml` dan `/robots.txt` dapat diakses.
- [ ] Cek satu halaman rute dan satu halaman armada di domain produksi.

## Struktur project

```
src/
├── app/
│   ├── page.tsx                 # Beranda
│   ├── rute/                    # Daftar rute + detail per rute
│   ├── armada/                  # Daftar armada + detail per armada
│   ├── tentang/                 # Tentang kami
│   ├── faq/                     # Pertanyaan umum
│   ├── kontak/                  # Kontak & lokasi
│   ├── layout.tsx               # Metadata global, header, footer
│   ├── sitemap.ts               # Sitemap dinamis
│   ├── robots.ts                # robots.txt
│   └── not-found.tsx            # Halaman 404
├── components/                  # Komponen UI & ikon
└── lib/                         # Data rute, armada, FAQ, situs
```

## SEO

- Metadata per halaman (title, description, canonical, Open Graph).
- JSON-LD: `TravelAgency`, `WebSite`, `BreadcrumbList`, `FAQPage`, `Service`,
  dan `Product`.
- Sitemap mencakup semua halaman statis, rute, dan armada.

## Catatan

- Nomor WhatsApp dan URL situs dibaca dari environment variables; jangan
  menaruh kredensial apa pun di repo ini.
- Semua konten (rute, tarif, armada, FAQ, testimoni) berada di `src/lib/` dan
  aman diubah tanpa menyentuh komponen.
