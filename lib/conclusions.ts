export const CONCLUSIONS = {
  // KASUS 1: APPROVED (STANDARD) + APPROVED (COST-SENSITIVE)
  // Artinya: Sangat Aman
  STRONG_APPROVE: {
    bank: [
      {
        title: "Rekomendasi: APPROVE (Prioritas)",
        desc: "Profil nasabah sangat solid. Jarak vektor sangat dekat dengan centroid 'Good Credit' di semua dimensi (Karakter & Kapasitas). Risiko default < 2%.",
        action:
          "Segera cairkan. Tawarkan plafon lebih tinggi atau produk bundling untuk meningkatkan retensi nasabah ini.",
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      },
      {
        title: "Rekomendasi: LAYAK CAIR",
        desc: "Nasabah memenuhi semua kriteria 5C. Tidak ditemukan anomali pada riwayat kredit maupun rasio aset.",
        action:
          "Proses sesuai prosedur standar. Tidak diperlukan agunan tambahan.",
        color: "bg-green-100 text-green-800 border-green-200",
      },
    ],
    nasabah: [
      {
        title: "Status: SANGAT DISARANKAN",
        desc: "Selamat! Profil keuangan Anda dinilai sangat sehat (Low Risk). Anda adalah tipe nasabah idaman bank.",
        action:
          "Anda memiliki posisi tawar tinggi. Cobalah negosiasi bunga yang lebih rendah.",
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      },
      {
        title: "Status: PELUANG TINGGI",
        desc: "Skor kredit Anda sangat baik. Sistem tidak menemukan masalah pada riwayat pembayaran masa lalu.",
        action:
          "Siapkan dokumen administrasi. Kemungkinan besar pengajuan disetujui dalam waktu singkat.",
        color: "bg-green-100 text-green-800 border-green-200",
      },
    ],
  },

  // KASUS 2: REJECTED (STANDARD) + REJECTED (COST-SENSITIVE)
  // Artinya: Sangat Buruk
  STRONG_REJECT: {
    bank: [
      {
        title: "Rekomendasi: HARD REJECT (Veto)",
        desc: "Terdeteksi 'Red Flags' kritikal (Riwayat Buruk / Aset Minim). Pinjaman kecil pun berisiko macet total karena karakter nasabah.",
        action:
          "Tolak mutlak. Jangan berikan keringanan tanpa jaminan aset likuid 120%.",
        color: "bg-red-100 text-red-800 border-red-200",
      },
      {
        title: "Rekomendasi: BERISIKO TINGGI",
        desc: "Skor jauh di bawah threshold. Nasabah memiliki kedekatan pola dengan data 'Bad Credit' historis.",
        action:
          "Tolak pengajuan untuk melindungi NPL (Non-Performing Loan) bank.",
        color: "bg-red-100 text-red-800 border-red-200",
      },
    ],
    nasabah: [
      {
        title: "Status: DITOLAK SISTEM",
        desc: "Profil kredit Anda belum memenuhi syarat. Ada catatan negatif pada riwayat atau rasio hutang yang terlalu tinggi.",
        action:
          "Perbaiki BI Checking/SLIK OJK Anda terlebih dahulu. Lunasi tunggakan sebelum mengajukan lagi.",
        color: "bg-red-100 text-red-800 border-red-200",
      },
      {
        title: "Status: KURANG MEMENUHI SYARAT",
        desc: "Berdasarkan data historis, profil keuangan seperti ini memiliki risiko tinggi.",
        action:
          "Anda perlu menambah jumlah tabungan atau menyertakan penjamin (Guarantor) untuk bisa lolos.",
        color: "bg-red-100 text-red-800 border-red-200",
      },
    ],
  },

  // KASUS 3: APPROVED (STD) + REJECTED (CS) -> HIDDEN RISK
  HIDDEN_RISK: {
    bank: [
      {
        title: "Rekomendasi: TOLAK (False Positive)",
        desc: "Model Standard meloloskan, namun Cost-Sensitive mendeteksi risiko tersembunyi. Kemungkinan nasabah baru 'terlihat' baik tapi fundamentalnya rapuh.",
        action:
          "Ikuti Cost-Sensitive (Tolak) atau minta Down Payment (DP) besar > 40%.",
        color: "bg-amber-100 text-amber-800 border-amber-200",
      },
      {
        title: "Rekomendasi: WARNING (Grey Area)",
        desc: "Nasabah masuk kategori 'Grey Area'. Statistik meragukan. Potensi gagal bayar cukup tinggi jika ekonomi memburuk.",
        action:
          "Lakukan verifikasi lapangan (Survey). Cek validitas slip gaji dan rekening koran secara manual.",
        color: "bg-orange-100 text-orange-800 border-orange-200",
      },
    ],
    nasabah: [
      {
        title: "Status: PERLU TINJAUAN KHUSUS",
        desc: "Aplikasi Anda berada di perbatasan. Ada kriteria yang lolos, tapi ada juga yang dinilai berisiko oleh sistem ketat.",
        action:
          "Siapkan bukti keuangan tambahan (Slip gaji, Rekening Listrik) untuk meyakinkan analis bank.",
        color: "bg-amber-100 text-amber-800 border-amber-200",
      },
    ],
  },

  // KASUS 4: REJECTED (STD) + APPROVED (CS) -> POTENTIAL GEM
  POTENTIAL_GEM: {
    bank: [
      {
        title: "Rekomendasi: APPROVE BERSYARAT",
        desc: "Secara umum kurang ideal, tapi nasabah memiliki 'Saving Grace' (misal: Tabungan sangat besar) yang diharga tinggi oleh sistem.",
        action: "Bisa disetujui dengan limit lebih kecil.",
        color: "bg-blue-100 text-blue-800 border-blue-200",
      },
    ],
    nasabah: [
      {
        title: "Status: ADA HARAPAN",
        desc: "Meskipun ada kekurangan, aset/tabungan Anda membantu menaikkan skor.",
        action: "Coba ajukan dengan tenor yang lebih pendek.",
        color: "bg-blue-100 text-blue-800 border-blue-200",
      },
    ],
  },
};
