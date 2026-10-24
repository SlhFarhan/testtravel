export type Route = {
  slug: string;
  from: string;
  to: string;
  duration: string;
  distance: string;
  priceFrom: number;
  departures: string[];
  note?: string;
  popular?: boolean;
};

export const routes: Route[] = [
  {
    slug: "jakarta-bandung",
    from: "Jakarta",
    to: "Bandung",
    duration: "3 jam",
    distance: "150 km",
    priceFrom: 150_000,
    departures: ["05.30", "08.00", "13.00", "17.00"],
    popular: true,
  },
  {
    slug: "jakarta-cirebon",
    from: "Jakarta",
    to: "Cirebon",
    duration: "4 jam 30 menit",
    distance: "220 km",
    priceFrom: 185_000,
    departures: ["06.00", "10.00", "15.00"],
    popular: true,
  },
  {
    slug: "jakarta-semarang",
    from: "Jakarta",
    to: "Semarang",
    duration: "7 jam",
    distance: "440 km",
    priceFrom: 275_000,
    departures: ["06.30", "13.00", "19.00"],
    popular: true,
  },
  {
    slug: "jakarta-yogyakarta",
    from: "Jakarta",
    to: "Yogyakarta",
    duration: "9 jam",
    distance: "560 km",
    priceFrom: 320_000,
    departures: ["06.00", "14.00", "19.30"],
    note: "Berhenti makan malam di rest area KM 379.",
    popular: true,
  },
  {
    slug: "bandung-yogyakarta",
    from: "Bandung",
    to: "Yogyakarta",
    duration: "7 jam",
    distance: "430 km",
    priceFrom: 290_000,
    departures: ["07.00", "15.00"],
  },
  {
    slug: "semarang-solo",
    from: "Semarang",
    to: "Solo",
    duration: "2 jam",
    distance: "100 km",
    priceFrom: 110_000,
    departures: ["06.00", "09.00", "12.00", "16.00", "19.00"],
  },
  {
    slug: "yogyakarta-surabaya",
    from: "Yogyakarta",
    to: "Surabaya",
    duration: "6 jam",
    distance: "330 km",
    priceFrom: 260_000,
    departures: ["07.30", "14.00", "20.00"],
  },
  {
    slug: "surabaya-malang",
    from: "Surabaya",
    to: "Malang",
    duration: "2 jam 30 menit",
    distance: "95 km",
    priceFrom: 120_000,
    departures: ["06.00", "09.30", "13.00", "16.30", "19.00"],
    popular: true,
  },
  {
    slug: "jakarta-tegal",
    from: "Jakarta",
    to: "Tegal",
    duration: "5 jam",
    distance: "290 km",
    priceFrom: 210_000,
    departures: ["07.00", "12.00", "17.00"],
  },
  {
    slug: "jakarta-purwokerto",
    from: "Jakarta",
    to: "Purwokerto",
    duration: "6 jam 30 menit",
    distance: "390 km",
    priceFrom: 250_000,
    departures: ["06.30", "13.30"],
  },
];

export const routeOrigins = Array.from(new Set(routes.map((route) => route.from)));

export function getRoute(slug: string) {
  return routes.find((route) => route.slug === slug);
}

export const routeHighlights = [
  "Tarif sudah termasuk tol, BBM, driver, dan asuransi penumpang.",
  "Titik jemput tersedia di pool, terminal, dan hotel area kota.",
  "Konfirmasi kursi dan jadwal diberikan langsung oleh tim kami via WhatsApp.",
];
