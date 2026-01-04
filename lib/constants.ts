export const LOAN_LIMITS = {
  duration: { min: 4, max: 72, label: "Bulan" },
  amount: { min: 2500000, max: 185000000, label: "Rupiah" }, // Konversi DM ke IDR
  age: { min: 19, max: 75, label: "Tahun" },
};

export const MAPPINGS = {
  checking_status: [
    { label: "Saldo Negatif / Macet", value: "A11" },
    { label: "Saldo Rendah (< Rp 2 Juta)", value: "A12" },
    { label: "Saldo Stabil (> Rp 2 Juta)", value: "A13" },
    { label: "Tidak Memiliki Rekening Bank", value: "A14" },
  ],
  credit_history: [
    { label: "Tidak ada kredit / Semua lunas", value: "A30" },
    { label: "Kredit di bank ini lunas semua", value: "A31" },
    { label: "Kredit yang ada masih lancar", value: "A32" },
    { label: "Pernah telat bayar di masa lalu", value: "A33" },
    { label: "Akun kritis / Ada kredit di tempat lain", value: "A34" },
  ],
  savings: [
    { label: "< Rp 1 Juta", value: "A61" },
    { label: "Rp 1 - 5 Juta", value: "A62" },
    { label: "Rp 5 - 10 Juta", value: "A63" },
    { label: "> Rp 10 Juta", value: "A64" },
    { label: "Tidak punya tabungan / Tidak diketahui", value: "A65" },
  ],
  employment: [
    { label: "Pengangguran", value: "A71" },
    { label: "Kurang dari 1 tahun", value: "A72" },
    { label: "1 - 4 tahun", value: "A73" },
    { label: "4 - 7 tahun", value: "A74" },
    { label: "Lebih dari 7 tahun", value: "A75" },
  ],
};
