export type FaqItem = {
  question: string;
  answer: string;
  category: "Pemesanan" | "Perjalanan" | "Pembayaran";
};

export const faqs: FaqItem[] = [
  {
    category: "Pemesanan",
    question: "Bagaimana cara memesan kursi?",
    answer:
      "Pilih rute dan jadwal yang Anda inginkan, lalu tekan tombol WhatsApp. Pesan akan terisi otomatis dengan detail perjalanan Anda. Tim kami akan mengonfirmasi ketersediaan kursi, titik jemput, dan total biaya — biasanya dalam 15 menit pada jam operasional.",
  },
  {
    category: "Pemesanan",
    question: "Apakah harus membuat akun atau mengisi formulir panjang?",
    answer:
      "Tidak. Situs ini hanya untuk menampilkan informasi rute, armada, dan tarif. Semua pemesanan diselesaikan lewat WhatsApp bersama tim kami, tanpa akun, tanpa aplikasi tambahan.",
  },
  {
    category: "Perjalanan",
    question: "Berapa bagasi yang boleh dibawa?",
    answer:
      "Setiap penumpang mendapat satu koper 24 inci dan satu tas kabin. Untuk koper besar, stroller, atau alat olahraga, sampaikan saat pemesanan agar kami siapkan ruang bagasi yang cukup.",
  },
  {
    category: "Perjalanan",
    question: "Apakah bisa dijemput di rumah?",
    answer:
      "Bisa, untuk area dalam radius 10 km dari pool kami di Jakarta Timur tanpa biaya tambahan. Di luar area tersebut, tersedia layanan antar-jemput dengan biaya mulai Rp 50.000. Sebutkan alamat lengkap saat memesan.",
  },
  {
    category: "Perjalanan",
    question: "Apakah jadwal keberangkatan bisa berubah?",
    answer:
      "Jadwal yang tertera adalah jadwal reguler. Pada musim liburan atau ketika lalu lintas padat, kami dapat menyesuaikan jam keberangkatan dan akan menginformasikan perubahan melalui WhatsApp sebelum hari keberangkatan.",
  },
  {
    category: "Pembayaran",
    question: "Apakah harus membayar di muka?",
    answer:
      "Untuk mengunci kursi, kami meminta uang muka 30% dari total biaya. Sisanya dibayarkan sebelum keberangkatan, baik secara transfer maupun tunai kepada driver. Anda akan menerima rincian pembayaran resmi dari admin kami.",
  },
  {
    category: "Pembayaran",
    question: "Metode pembayaran apa saja yang diterima?",
    answer:
      "Transfer bank (BCA, Mandiri, BRI, BNI), QRIS, dan tunai. Kami tidak pernah meminta pembayaran ke rekening pribadi di luar rekening resmi yang tertera pada invoice.",
  },
  {
    category: "Pemesanan",
    question: "Apakah bisa menyewa satu armada penuh?",
    answer:
      "Ya. Semua armada tersedia untuk sewa penuh, baik untuk satu hari maupun beberapa hari. Sewa penuh sudah termasuk driver, BBM, tol, dan asuransi. Anda hanya perlu menambahkan biaya penginapan driver untuk perjalanan lintas kota lebih dari satu hari.",
  },
  {
    category: "Pemesanan",
    question: "Bagaimana aturan pembatalan?",
    answer:
      "Pembatalan lebih dari 48 jam sebelum keberangkatan: uang muka dikembalikan penuh. Pembatalan 24–48 jam: uang muka dikembalikan 50%. Kurang dari 24 jam: uang muka tidak dapat dikembalikan, tetapi dapat dipindahkan ke tanggal lain dalam 30 hari.",
  },
  {
    category: "Perjalanan",
    question: "Apakah tersedia kursi bayi?",
    answer:
      "Tersedia kursi bayi (baby seat) untuk anak usia 6 bulan–3 tahun dengan biaya tambahan Rp 50.000. Mohon sampaikan usia dan berat anak saat memesan agar kami menyiapkan jenis kursi yang sesuai.",
  },
];

export const faqCategories = ["Semua", "Pemesanan", "Perjalanan", "Pembayaran"] as const;
