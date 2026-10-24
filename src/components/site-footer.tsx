import Link from "next/link";
import {
  ClockIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TikTokIcon,
} from "@/components/icons";
import { Logo } from "@/components/logo";
import { Shell } from "@/components/ui";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

async function getCurrentYear() {
  "use cache";

  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await getCurrentYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 text-paper/[0.07]"
      />
      <Shell className="relative">
        <div className="flex flex-col gap-3 border-b border-paper/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-[12.5px] leading-relaxed text-paper/50">
            <span className="font-semibold text-paper/80">
              Pemesanan hanya melalui WhatsApp resmi.
            </span>{" "}
            Tidak ada transaksi di situs ini — admin kami yang akan mengonfirmasi
            jadwal, kursi, dan total biaya.
          </p>
          <a
            href={site.phone.href}
            className="inline-flex shrink-0 items-center gap-2 text-[12.5px] font-semibold text-paper/70 transition-colors hover:text-paper"
          >
            <PhoneIcon className="size-3.5" />
            {site.phone.display}
          </a>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_1.1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/55">
              Travel mobil antar kota sejak {site.since}. Berbasis di Jakarta,
              melayani rute Jawa dengan armada yang dirawat berkala.
            </p>
            <div className="mt-5 flex gap-2">
              {site.socials.map((social) => {
                const Icon =
                  social.label === "Instagram" ? InstagramIcon : TikTokIcon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} di ${social.label}`}
                    className="grid size-9 place-items-center rounded-full border border-paper/15 text-paper/70 transition-colors hover:border-paper/40 hover:text-paper"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Navigasi footer">
            <h3 className="text-[11px] font-bold tracking-[0.16em] text-paper/40 uppercase">
              Navigasi
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-paper/70">
              <li>
                <Link href="/" className="link-underline hover:text-paper">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/armada" className="link-underline hover:text-paper">
                  Armada
                </Link>
              </li>
              <li>
                <Link href="/rute" className="link-underline hover:text-paper">
                  Rute & tarif
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="link-underline hover:text-paper">
                  Tentang kami
                </Link>
              </li>
              <li>
                <Link href="/faq" className="link-underline hover:text-paper">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="link-underline hover:text-paper">
                  Kontak
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-[11px] font-bold tracking-[0.16em] text-paper/40 uppercase">
              Rute populer
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-paper/70">
              {routes.slice(0, 5).map((route) => (
                <li key={route.slug}>
                  <Link
                    href="/rute"
                    className="link-underline hover:text-paper"
                  >
                    {route.from}–{route.to}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/rute"
                  className="inline-flex items-center gap-1 text-paper/45 hover:text-paper"
                >
                  Lihat semua rute
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold tracking-[0.16em] text-paper/40 uppercase">
              Hubungi kami
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm text-paper/70">
              <li>
                <a
                  href={site.phone.href}
                  className="flex items-start gap-2.5 transition-colors hover:text-paper"
                >
                  <PhoneIcon className="mt-0.5 size-4 shrink-0 text-paper/40" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-start gap-2.5 transition-colors hover:text-paper"
                >
                  <MailIcon className="mt-0.5 size-4 shrink-0 text-paper/40" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPinIcon className="mt-0.5 size-4 shrink-0 text-paper/40" />
                <span className="leading-relaxed">
                  {site.address.street}
                  <br />
                  {site.address.district}, {site.address.city}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <ClockIcon className="mt-0.5 size-4 shrink-0 text-paper/40" />
                {site.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-paper/10 py-6 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. Seluruh hak cipta dilindungi.
          </p>
          <p className="max-w-md sm:text-right">
            Situs ini hanya menampilkan informasi. Pemesanan dan pembayaran
            dilakukan melalui WhatsApp resmi kami.
          </p>
        </div>
      </Shell>
    </footer>
  );
}
