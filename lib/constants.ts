export const LOAN_LIMITS = {
  duration: { min: 6, max: 72 }, // Tenor 6 - 72 Bulan
  amount: { min: 2500000, max: 1000000000 }, // Plafon Rp 2.5 Juta - Rp 1 Milyar
  age: { min: 19, max: 75 }, // Usia produktif
};

export const MAPPINGS = {
  // ==========================================
  // 1. FINANCIAL STATUS (KEUANGAN)
  // ==========================================

  // Checking Account
  checking_status: [
    {
      value: "A14",
      label: "Tidak Ada Rekening Koran / Cash Oriented (Netral)",
    },
    { value: "A13", label: "Saldo Tinggi (> Rp 50.000.000) - Sangat Aman" },
    { value: "A12", label: "Saldo Menengah (Rp 5.000.000 - Rp 50.000.000)" },
    { value: "A11", label: "Saldo Rendah / Sering Kosong (< Rp 5.000.000)" }, // High Risk
  ],

  // Savings
  savings: [
    { value: "A64", label: "Sultan (> Rp 200.000.000)" },
    { value: "A63", label: "Mapan (Rp 50.000.000 - Rp 200.000.000)" },
    { value: "A62", label: "Cukup (Rp 10.000.000 - Rp 50.000.000)" },
    { value: "A61", label: "Minim (< Rp 10.000.000)" },
    { value: "A65", label: "Tidak Diketahui / Tidak Ada Data" },
  ],

  // ==========================================
  // 2. CREDIT HISTORY (REKAM JEJAK)
  // ==========================================

  // Credit History
  credit_history: [
    { value: "A34", label: "Nasabah Prioritas / Kredit Lancar (Kol 1)" },
    { value: "A32", label: "Lancar / Tidak Ada Tunggakan (Kol 1)" },
    {
      value: "A31",
      label: "Semua Kredit Sudah Lunas (Tidak Ada Fasilitas Aktif)",
    },
    { value: "A30", label: "Belum Pernah Kredit Sama Sekali (New Borrower)" },
    { value: "A33", label: "Pernah Menunggak / Kredit Macet (Kol 2-5)" }, // Bad
  ],

  // Existing Credits
  existing_credits: [
    { value: "A161", label: "1 Fasilitas (Hanya Pengajuan Ini)" },
    { value: "A162", label: "2-3 Fasilitas Aktif" },
    { value: "A163", label: "4-5 Fasilitas Aktif" },
    { value: "A164", label: "Lebih dari 6 Fasilitas (High Exposure)" },
  ],

  // ==========================================
  // 3. EMPLOYMENT & SKILL (PEKERJAAN)
  // ==========================================

  // Employment
  employment: [
    { value: "A75", label: "Sangat Stabil (> 7 Tahun)" },
    { value: "A74", label: "Stabil (4 - 7 Tahun)" },
    { value: "A73", label: "Cukup (1 - 4 Tahun)" },
    { value: "A72", label: "Baru Bekerja (< 1 Tahun)" },
    { value: "A71", label: "Tidak Bekerja / Pengangguran" },
  ],

  // Job Level
  job: [
    { value: "A174", label: "Manajemen / Profesional / Pegawai Tinggi" },
    { value: "A173", label: "Staf Ahli / Pegawai Tetap (Skilled)" },
    { value: "A172", label: "Buruh / Pekerja Tidak Tetap (Unskilled)" },
    { value: "A171", label: "Tidak Bekerja / Magang" },
  ],

  // ==========================================
  // 4. PURPOSE (TUJUAN)
  // ==========================================

  purpose: [
    { value: "A40", label: "Pembelian Mobil Baru" },
    { value: "A41", label: "Pembelian Mobil Bekas" },
    { value: "A42", label: "Perabot Rumah / Elektronik" },
    { value: "A43", label: "Barang Hobi (Radio/TV)" },
    { value: "A44", label: "Peralatan Rumah Tangga" },
    { value: "A45", label: "Perbaikan Rumah (Renovasi)" },
    { value: "A46", label: "Biaya Pendidikan" },
    { value: "A48", label: "Pelatihan / Retraining" },
    { value: "A49", label: "Modal Usaha / Bisnis" },
    { value: "A410", label: "Keperluan Lainnya (Others)" },
  ],

  // ==========================================
  // 5. PERSONAL DATA & STABILITY (PERSONAL)
  // ==========================================

  // Personal Status
  personal_status: [
    { value: "A93", label: "Laki-laki: Lajang" },
    { value: "A94", label: "Laki-laki: Menikah / Duda" },
    { value: "A92", label: "Perempuan: Bercerai / Berpisah / Menikah" },
    { value: "A91", label: "Laki-laki: Bercerai / Berpisah" },
  ],

  // Residence Since
  residence_since: [
    { value: "A114", label: "> 4 Tahun (Menetap)" },
    { value: "A113", label: "3 - 4 Tahun" },
    { value: "A112", label: "2 - 3 Tahun" },
    { value: "A111", label: "< 1 Tahun (Pindah-pindah)" },
  ],

  // Dependents
  dependents: [
    { value: "A181", label: "0 - 2 Orang Tanggungan" },
    { value: "A182", label: "3 Orang atau Lebih" },
  ],

  // Foreign Worker
  foreign_worker: [
    { value: "A202", label: "WNI (Warga Negara Indonesia)" },
    { value: "A201", label: "WNA (Warga Negara Asing)" },
  ],

  // ==========================================
  // 6. ASSETS & LIABILITIES (ASET & HUTANG)
  // ==========================================

  // Property
  property: [
    { value: "A121", label: "Real Estate (Sertifikat Tanah/Rumah)" },
    { value: "A122", label: "Asuransi Jiwa / Surat Berharga" },
    { value: "A123", label: "Kendaraan Bermotor (BPKB)" },
    { value: "A124", label: "Tidak Memiliki Aset Agunan" },
  ],

  // Housing
  housing: [
    { value: "A152", label: "Rumah Milik Sendiri (Own)" },
    { value: "A153", label: "Rumah Dinas / Gratis (For Free)" },
    { value: "A151", label: "Sewa / Kontrak (Rent)" },
  ],

  // Other Installment
  other_installment: [
    { value: "A143", label: "Tidak Ada Cicilan Lain (None)" },
    { value: "A141", label: "Ada Cicilan Bank Lain (KPR/KKB)" },
    { value: "A142", label: "Ada Cicilan Toko / Paylater" },
  ],

  // Other Debtors
  other_debtors: [
    { value: "A101", label: "Tanpa Penjamin (Single Debtor)" },
    { value: "A102", label: "Ada Co-Applicant (Pasangan)" },
    { value: "A103", label: "Ada Penjamin Pihak Ketiga (Guarantor)" },
  ],
};
