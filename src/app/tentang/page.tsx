import type { Metadata } from "next";
import {
  CheckIcon,
  ClockIcon,
  HeartIcon,
  ShieldIcon,
  WalletIcon,
} from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { Pill, Shell, WhatsAppButton } from "@/components/ui";
import { VehicleArt } from "@/components/vehicle-art";
import { breadcrumbSchema } from "@/lib/structured-data";
import { site } from "@/lib/site";
import { stats } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Rute Nusa Travel berdiri sejak 2016 di Jakarta Timur. Cerita, prinsip, dan standar perawatan armada yang kami pegang sampai sekarang.",
  alternates: { canonical: "/tentang" },
};

const milestones = [
  {
    year: "2016",
    title: "Dua mobil, satu rute",
    description:
      "Berawal dari layanan antar-jemput keluarga di Jakarta Timur. Rute pertama: Jakarta–Bandung, dengan dua unit Avanza.",
  },
  {
    year: "2019",
    title: "Hiace pertama, pool sendiri",
    description:
      "Menambah armada minibus dan membuka pool tetap di Kalimalang agar titik jemput lebih teratur.",
  },
  {
    year: "2023",
    title: "Rombongan dan perusahaan",
    description:
      "Mulai melayani sewa penuh untuk keluarga besar, komunitas, dan perjalanan dinas perusahaan.",
  },
  {
    year: "2026",
    title: "38 armada, 10 rute",
    description:
      "Lebih dari 120.000 penumpang diantar, dengan jadwal reguler di sepuluh rute Jawa.",
  },
];

const principles = [
  {
    icon: ShieldIcon,
    title: "Keselamatan bukan fitur tambahan",
    description:
      "Rem, ban, dan lampu diperiksa sebelum setiap keberangkatan. Driver punya batas jam mengemudi, dan kami menolak jadwal yang memaksa mereka begadang.",
  },
  {
    icon: WalletIcon,
    title: "Harga tidak berubah di tengah jalan",
    description:
      "Kalau ada biaya tambahan, kami sampaikan sebelum kamu membayar DP — bukan saat sudah di tol. Rincian selalu tertulis, bukan hanya diucapkan.",
  },
  {
    icon: HeartIcon,
    title: "Manusia, bukan algoritma",
    description:
      "Kamu bicara dengan admin yang bisa mengambil keputusan: menggeser jadwal, mengganti titik jemput, atau mencarikan armada pengganti.",
  },
];

const standards = [
  "Servis mesin dan kaki-kaki setiap 5.000 km",
  "Inspeksi rem, ban, dan lampu sebelum berangkat",
  "Kabin dibersihkan sebelum setiap perjalanan",
  "Armada pengganti jika terjadi kendala teknis",
];

export default function TentangPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tentang kami"
        title={
          <>
            Dimulai dari satu mobil, satu sopir,{" "}
            <span className="text-clay italic">dan janji yang sama.</span>
          </>
        }
        description="Rute Nusa berdiri pada 2016 sebagai layanan antar-jemput keluarga di Jakarta Timur. Sembilan tahun kemudian, prinsipnya belum berubah: kalau sudah janji berangkat, berangkat."
        breadcrumbs={[{ label: "Tentang" }]}
      >
        <div className="flex flex-wrap gap-2">
          <Pill>
            <ClockIcon className="size-3.5" />
            Sejak {site.since}
          </Pill>
          <Pill tone="green">
            <CheckIcon className="size-3.5" />
            Pool sendiri
          </Pill>
        </div>
      </PageHeader>

      <section>
        <Shell className="py-12 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.35] font-medium tracking-[-0.01em] text-ink/85">
                Kami tidak tumbuh dari iklan. Kami tumbuh dari penumpang yang
                naik lagi, lalu membawa saudaranya.
              </p>
              <div className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-ink/60">
                <p>
                  Awalnya hanya dua unit Avanza dan satu driver yang mengantar
                  tetangga ke Bandung pada akhir pekan. Tidak ada aplikasi,
                  tidak ada call center — hanya satu nomor WhatsApp yang
                  dipegang langsung oleh pemilik usaha.
                </p>
                <p>
                  Nomor itu masih nomor yang sama sampai hari ini. Yang
                  berubah hanya skalanya: 38 armada, tiga jenis kendaraan, dan
                  jadwal reguler di sepuluh rute Jawa. Admin yang menjawab
                  pesanmu sekarang masih bisa mengambil keputusan tanpa
                  menunggu persetujuan siapa pun.
                </p>
                <p>
                  Kami sengaja tidak menjadi marketplace travel. Tidak ada
                  armada pihak ketiga yang kami jual tanpa tahu kondisinya.
                  Setiap kendaraan yang tampil di situs ini adalah kendaraan
                  yang kami rawat sendiri, dengan driver yang kami kenal.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6">
                {stats.slice(1, 3).map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-[1.9rem] leading-none font-semibold tracking-tight">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[11px] leading-snug text-ink/45">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <figure className="relative">
              <div className="overflow-hidden rounded-[1.75rem] border border-line shadow-soft">
                <VehicleArt
                  theme="sage"
                  label="Ilustrasi armada Rute Nusa di jalan antar kota"
                  className="aspect-[4/3]"
                />
              </div>
              <figcaption className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-ink/40">
                <span aria-hidden className="mt-1.5 size-1 shrink-0 rounded-full bg-clay" />
                Pool kami di Kalimalang, Jakarta Timur. Titik jemput utama
                untuk rute Jawa bagian barat dan tengah.
              </figcaption>
            </figure>
          </div>
        </Shell>
      </section>

      <section className="border-y border-line bg-paper-2/40">
        <Shell className="py-14 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-clay">Perjalanan kami</p>
              <h2 className="mt-3 font-display text-[clamp(1.8rem,3vw,2.4rem)] tracking-tight">
                Sembilan tahun, empat titik balik.
              </h2>
            </div>
            <p className="max-w-sm text-[12px] leading-relaxed text-ink/45">
              Tidak ada lonjakan besar. Hanya penambahan satu armada setiap
              kali permintaan benar-benar ada.
            </p>
          </div>

          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {milestones.map((item) => (
              <li key={item.year} className="border-t border-ink/15 pt-5">
                <span className="font-display text-[1.75rem] leading-none font-semibold tracking-tight text-clay">
                  {item.year}
                </span>
                <h3 className="mt-3 text-sm font-semibold">{item.title}</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink/55">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </Shell>
      </section>

      <section>
        <Shell className="py-14 lg:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow text-clay">Prinsip kerja</p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3vw,2.4rem)] leading-tight tracking-tight">
              Tiga hal yang tidak kami kompromikan.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <div
                  key={principle.title}
                  className="rounded-2xl border border-line bg-[#fffdf8] p-6"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-clay-soft/60 text-clay-deep">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-xl leading-snug tracking-tight">
                    {principle.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-ink/60">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Shell>
      </section>

      <section className="border-t border-line">
        <Shell className="py-14 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="eyebrow text-clay">Standar armada</p>
              <h2 className="mt-3 font-display text-[clamp(1.8rem,3vw,2.4rem)] leading-tight tracking-tight">
                Perawatan yang tidak terlihat di foto.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/60">
                Kendaraan yang bersih itu mudah. Yang sulit adalah memastikan
                remnya bekerja di turunan Cikampek setelah delapan jam
                perjalanan. Bagian itu yang kami jaga.
              </p>
              <WhatsAppButton size="md" variant="ink" className="mt-6">
                Tanya soal armada
              </WhatsAppButton>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {standards.map((standard) => (
                <li
                  key={standard}
                  className="flex items-start gap-3 rounded-xl border border-line bg-[#fffdf8] p-4"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sage-soft text-sage">
                    <CheckIcon className="size-3" />
                  </span>
                  <span className="text-[12.5px] leading-relaxed text-ink/65">
                    {standard}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Shell>
      </section>

      <section className="border-t border-line bg-paper-2/40">
        <Shell className="py-12 lg:py-16">
          <div className="rounded-2xl bg-ink p-8 text-paper sm:p-10">
            <p className="mx-auto max-w-2xl text-center font-display text-[clamp(1.5rem,3vw,2.2rem)] leading-snug font-medium">
              “Kami tidak menjual pengalaman premium. Kami menjual kepastian
              sampai.”
            </p>
            <p className="mt-4 text-center text-[11px] tracking-wide text-paper/40 uppercase">
              Prinsip yang dipakai sejak 2016
            </p>
          </div>
        </Shell>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Beranda", path: "/" },
          { name: "Tentang", path: "/tentang" },
        ])}
      />
    </>
  );
}
