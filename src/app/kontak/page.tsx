import type { Metadata } from "next";
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { Shell, WhatsAppButton } from "@/components/ui";
import { breadcrumbSchema } from "@/lib/structured-data";
import { addressLine, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Rute Nusa Travel: WhatsApp, telepon, email, dan alamat pool di Kalimalang, Jakarta Timur. Admin online setiap hari 06.00–21.00 WIB.",
  alternates: { canonical: "/kontak" },
};

const mapQuery = encodeURIComponent(addressLine);
const mapEmbed = `https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed`;

export default function KontakPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontak"
        title={
          <>
            Bicara dengan manusia,{" "}
            <span className="text-clay italic">bukan bot.</span>
          </>
        }
        description="Pemesanan, perubahan jadwal, atau pertanyaan soal rute — semuanya lewat satu pintu: WhatsApp admin kami. Tidak perlu mengisi formulir panjang atau menunggu balasan otomatis."
        breadcrumbs={[{ label: "Kontak" }]}
      />

      <section>
        <Shell className="py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <div className="space-y-4">
              <div className="grain relative overflow-hidden rounded-2xl bg-ink p-6 text-paper shadow-soft sm:p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-10 size-48 rounded-full bg-[#25d366]/20 blur-2xl"
                />
                <div className="relative">
                  <span className="grid size-11 place-items-center rounded-xl bg-[#25d366] text-ink">
                    <WhatsAppIcon className="size-5" />
                  </span>
                  <p className="mt-5 text-[10px] font-bold tracking-[0.16em] text-paper/40 uppercase">
                    Jalur tercepat
                  </p>
                  <h2 className="mt-1.5 font-display text-2xl tracking-tight">
                    WhatsApp admin
                  </h2>
                  <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-paper/55">
                    Dibalas rata-rata di bawah 15 menit pada jam operasional.
                    Sertakan rute, tanggal, dan jumlah penumpang agar kami bisa
                    langsung mengecek ketersediaan.
                  </p>
                  <p className="mt-4 text-lg font-semibold tracking-tight">
                    {site.whatsapp.display}
                  </p>
                  <WhatsAppButton
                    size="lg"
                    variant="light"
                    className="mt-4 w-full sm:w-auto"
                  >
                    Mulai chat
                  </WhatsAppButton>
                  <p className="mt-4 flex items-center gap-1.5 text-[10.5px] text-paper/35">
                    <ClockIcon className="size-3" />
                    {site.hours}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href={site.phone.href}
                  className="group rounded-2xl border border-line bg-[#fffdf8] p-5 transition-colors hover:border-ink/25"
                >
                  <span className="grid size-9 place-items-center rounded-lg bg-paper-2 text-ink/60">
                    <PhoneIcon className="size-4" />
                  </span>
                  <p className="mt-4 text-[10px] font-bold tracking-[0.12em] text-ink/40 uppercase">
                    Telepon
                  </p>
                  <p className="mt-1 text-[13.5px] font-semibold group-hover:text-clay">
                    {site.phone.display}
                  </p>
                  <p className="mt-1 text-[10.5px] text-ink/40">
                    Untuk panggilan mendesak
                  </p>
                </a>

                <a
                  href={`mailto:${site.email}`}
                  className="group rounded-2xl border border-line bg-[#fffdf8] p-5 transition-colors hover:border-ink/25"
                >
                  <span className="grid size-9 place-items-center rounded-lg bg-paper-2 text-ink/60">
                    <MailIcon className="size-4" />
                  </span>
                  <p className="mt-4 text-[10px] font-bold tracking-[0.12em] text-ink/40 uppercase">
                    Email
                  </p>
                  <p className="mt-1 text-[13.5px] font-semibold group-hover:text-clay">
                    {site.email}
                  </p>
                  <p className="mt-1 text-[10.5px] text-ink/40">
                    Untuk invoice & kerja sama
                  </p>
                </a>
              </div>

              <div className="rounded-2xl border border-line bg-[#fffdf8] p-5">
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-paper-2 text-ink/60">
                    <MapPinIcon className="size-4" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.12em] text-ink/40 uppercase">
                      Pool & kantor
                    </p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed font-medium">
                      {site.address.street}
                      <br />
                      {site.address.district}, {site.address.city}{" "}
                      {site.address.postalCode}
                    </p>
                    <a
                      href={`https://maps.google.com/?q=${mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-semibold text-clay hover:text-clay-deep"
                    >
                      Buka di Google Maps
                      <span aria-hidden>↗</span>
                    </a>
                    <p className="mt-3 border-t border-line pt-3 text-[11px] leading-relaxed text-ink/45">
                      Titik jemput utama untuk rute Jawa bagian barat dan
                      tengah. Penjemputan di rumah tersedia untuk area dalam
                      radius 10 km.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="overflow-hidden rounded-2xl border border-line bg-paper-2">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
                  <p className="text-[10px] font-bold tracking-[0.14em] text-ink/40 uppercase">
                    Lokasi pool
                  </p>
                  <p className="text-[11px] text-ink/45">
                    Jakarta Timur · buka 06.00–21.00
                  </p>
                </div>
                <iframe
                  title="Peta lokasi pool Rute Nusa di Kalimalang, Jakarta Timur"
                  src={mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[360px] w-full border-0 sm:h-[440px] lg:h-[520px]"
                />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-line bg-[#fffdf8] p-4">
                  <p className="text-[10px] font-bold tracking-[0.12em] text-ink/40 uppercase">
                    Sebelum datang
                  </p>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink/55">
                    Konfirmasi dulu lewat WhatsApp. Pool tidak melayani
                    pembelian kursi langsung tanpa reservasi.
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-[#fffdf8] p-4">
                  <p className="text-[10px] font-bold tracking-[0.12em] text-ink/40 uppercase">
                    Parkir & akses
                  </p>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink/55">
                    Tersedia area tunggu beratap dan parkir gratis untuk
                    pengantar. Akses dari Jl. Raya Kalimalang.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-paper-2/60 p-4">
                <p className="flex items-start gap-2 text-[11px] leading-relaxed text-ink/50">
                  <WhatsAppIcon className="mt-0.5 size-3.5 shrink-0 text-sage" />
                  Kami tidak pernah meminta pembayaran ke rekening pribadi.
                  Semua instruksi pembayaran dikirim dari nomor resmi{" "}
                  <strong className="font-semibold text-ink/70">
                    {site.whatsapp.display}
                  </strong>{" "}
                  dan disertai invoice.
                </p>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Beranda", path: "/" },
          { name: "Kontak", path: "/kontak" },
        ])}
      />
    </>
  );
}
