import Link from "next/link";
import { ArrowRightIcon, MapPinIcon } from "@/components/icons";
import { Shell, WhatsAppButton } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-clay/[0.08] blur-3xl"
      />
      <Shell className="relative grid min-h-[62vh] place-items-center py-20">
        <div className="max-w-lg text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold text-ink/50">
            <MapPinIcon className="size-3.5 text-clay" />
            Error 404
          </span>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,3.8rem)] leading-[1.02] font-medium tracking-[-0.03em]">
            Rute ini tidak ada{" "}
            <span className="text-clay italic">di peta kami.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-relaxed text-ink/60">
            Halaman yang kamu cari mungkin sudah dipindahkan atau alamatnya
            salah ketik. Kembali ke beranda, atau tanya admin langsung — mereka
            lebih cepat daripada peta.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper transition-colors hover:bg-ink-2"
            >
              Kembali ke beranda
              <ArrowRightIcon className="size-4" />
            </Link>
            <WhatsAppButton size="md">Tanya admin</WhatsAppButton>
          </div>
        </div>
      </Shell>
    </section>
  );
}
