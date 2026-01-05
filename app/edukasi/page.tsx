import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BrainCircuit,
  Scale,
  ArrowRight,
  Database,
  ScanLine,
  Calculator,
  FileCheck,
  AlertTriangle,
  Lightbulb,
  ShieldAlert,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function EdukasiPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20 pointer-events-none" />

        <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
          <Badge
            variant="outline"
            className="mb-6 px-4 py-1.5 border-indigo-200 bg-white text-indigo-700 rounded-full shadow-sm dark:bg-slate-900 dark:text-indigo-300 dark:border-indigo-800"
          >
            <Lightbulb className="mr-2 h-3.5 w-3.5" />
            Knowledge Base
          </Badge>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-6 leading-tight">
            Bagaimana{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              AI Menilai Risiko
            </span>{" "}
            Kredit Anda?
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Pahami logika di balik keputusan sistem. Bukan sekadar
            tebak-tebakan, melainkan kalkulasi matematis presisi menggunakan{" "}
            <strong>Radial Basis Function (RBF) Network</strong>.
          </p>
        </div>
      </section>

      {/* --- 1. THE CORE CONCEPTS (GRID) --- */}
      <section className="container max-w-6xl mx-auto px-4 mb-24">
        <div className="grid md:grid-cols-3 gap-8">
          <ConceptCard
            icon={<BrainCircuit className="h-8 w-8 text-indigo-600" />}
            title="RBF Network"
            desc="Algoritma syaraf tiruan yang meniru cara kerja otak. Ia tidak menghapal data, tapi mempelajari 'pola kemiripan' (Similarity) antara nasabah baru dengan nasabah lama."
          />
          <ConceptCard
            icon={<Scale className="h-8 w-8 text-emerald-600" />}
            title="Cost-Sensitive"
            desc="Pendekatan yang 'Lebih Galak pada Risiko'. Sistem dihukum 5x lebih berat jika salah meloloskan kredit macet dibanding salah menolak kredit lancar."
          />
          <ConceptCard
            icon={<Database className="h-8 w-8 text-blue-600" />}
            title="German Dataset"
            desc="Sistem dilatih menggunakan 1.000 data historis standar industri (UCI Repository) yang mencakup 20 atribut finansial dan demografis."
          />
        </div>
      </section>

      {/* --- 2. HOW IT WORKS (STEP BY STEP) --- */}
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Alur Proses Analisis
            </h2>
            <p className="text-muted-foreground">
              Dari input data hingga keluar keputusan, inilah yang terjadi di
              belakang layar.
            </p>
          </div>

          <div className="space-y-12">
            {/* Step 1 */}
            <StepRow
              number="01"
              title="Normalisasi & Ekstraksi Fitur"
              desc="Data mentah Anda (Rupiah, Tahun, Kategori) diubah menjadi angka skala 0.0 s.d 1.0. Ini agar input 'Gaji' yang jutaan tidak mendominasi input 'Durasi' yang puluhan."
              icon={<ScanLine className="h-6 w-6 text-indigo-600" />}
            />

            {/* Step 2 (Visual Explanation) */}
            <StepRow
              number="02"
              title="Pengukuran Jarak (Euclidean Distance)"
              desc="Sistem mengukur 'seberapa jauh' profil Anda dari titik pusat (Centroid) nasabah 'Baik' dan nasabah 'Buruk'. Bayangkan peta: Apakah posisi Anda lebih dekat ke Kota Aman atau Kota Bahaya?"
              icon={<Calculator className="h-6 w-6 text-blue-600" />}
            >
              {/* Visualisasi Sederhana Cluster */}
              <div className="mt-6 p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 relative h-32 flex items-center justify-between px-10 md:px-20 overflow-hidden">
                {/* Garis Jarak */}
                <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-slate-300 dark:bg-slate-700 -z-10"></div>

                {/* Cluster Bad */}
                <div className="flex flex-col items-center gap-2 z-10">
                  <div className="w-12 h-12 rounded-full bg-red-100 border-4 border-red-500 flex items-center justify-center shadow-lg">
                    <XCircle className="text-red-600 h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-red-600">
                    Bad Cluster
                  </span>
                </div>

                {/* User Point (Animasi) */}
                <div className="flex flex-col items-center gap-2 z-10 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 border-4 border-white shadow-xl"></div>
                  <span className="text-xs font-bold text-indigo-600 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border">
                    Posisi Anda
                  </span>
                </div>

                {/* Cluster Good */}
                <div className="flex flex-col items-center gap-2 z-10">
                  <div className="w-12 h-12 rounded-full bg-green-100 border-4 border-green-500 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="text-green-600 h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-green-600">
                    Good Cluster
                  </span>
                </div>
              </div>
            </StepRow>

            {/* Step 3 */}
            <StepRow
              number="03"
              title="Aktivasi RBF & Pembobotan"
              desc="Jarak tadi dimasukkan ke fungsi Gaussian. Semakin dekat jaraknya, nilai aktivasinya makin besar (mendekati 1). Kemudian, nilai ini dikali dengan bobot (Cost Matrix)."
              icon={<BrainCircuit className="h-6 w-6 text-purple-600" />}
            />

            {/* Step 4 */}
            <StepRow
              number="04"
              title="Keputusan & Red Flag Check"
              desc="Sistem membandingkan skor akhir. Jika ada indikator bahaya (seperti cicilan melebihi 40% gaji), sistem akan mengaktifkan 'Veto' untuk menolak otomatis demi keamanan."
              icon={<FileCheck className="h-6 w-6 text-emerald-600" />}
              isLast
            />
          </div>
        </div>
      </section>

      {/* --- 3. COST SENSITIVE EXPLAINED (VISUAL TABLE) --- */}
      <section className="container max-w-4xl mx-auto px-4 py-24">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <ShieldAlert className="h-8 w-8 text-yellow-400" />
              <h3 className="text-2xl font-bold">Mengapa Cost-Sensitive?</h3>
            </div>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Dalam dunia kredit, kesalahan tidak setara. Memberi pinjaman ke
              orang yang kabur (False Positive) jauh lebih merugikan bank
              daripada menolak orang baik (False Negative).
            </p>

            {/* The Matrix Table */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10">
              <div className="grid grid-cols-3 bg-white/5 border-b border-white/10 p-4 text-sm font-bold text-center">
                <div>Skenario</div>
                <div>Dampak Finansial</div>
                <div>Bobot Penalti AI</div>
              </div>

              {/* Row 1: False Negative */}
              <div className="grid grid-cols-3 p-4 border-b border-white/10 items-center text-sm">
                <div className="text-slate-300">
                  Menolak Nasabah Baik <br />
                  <span className="text-xs opacity-60">(False Negative)</span>
                </div>
                <div className="text-yellow-400 font-medium">
                  Kehilangan Bunga (Kecil)
                </div>
                <div className="text-center font-mono bg-white/10 rounded py-1 mx-4">
                  1x
                </div>
              </div>

              {/* Row 2: False Positive */}
              <div className="grid grid-cols-3 p-4 items-center text-sm bg-red-500/10">
                <div className="text-white font-bold">
                  Meloloskan Nasabah Macet <br />
                  <span className="text-xs opacity-80">(False Positive)</span>
                </div>
                <div className="text-red-400 font-bold">
                  Kehilangan Modal Pokok (Besar!)
                </div>
                <div className="text-center font-mono bg-red-500/20 text-red-300 rounded py-1 mx-4 border border-red-500/30">
                  5x
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4 text-center italic">
              *Sistem Credify dirancang untuk menghindari skenario baris kedua
              (Merah) sebisa mungkin.
            </p>
          </div>
        </div>
      </section>

      {/* --- 4. FAQ (ACCORDION) --- */}
      <section className="container max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          Pertanyaan Umum (FAQ)
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Mengapa pinjaman kecil saya ditolak?
            </AccordionTrigger>
            <AccordionContent>
              Meskipun nominal kecil, sistem mungkin mendeteksi "Red Flag" pada
              karakter kredit Anda (misal: riwayat macet di SLIK OJK) atau rasio
              kapasitas bayar yang tidak memadai (misal: pengangguran tanpa
              aset). Dalam prinsip 5C, Karakter adalah kunci utama.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Apa bedanya model Standard dan Cost-Sensitive?
            </AccordionTrigger>
            <AccordionContent>
              Model Standard hanya peduli akurasi matematika (misal: benar 90
              dari 100). Model Cost-Sensitive peduli pada keamanan modal. Ia
              mungkin sedikit lebih "pelit" meloloskan pinjaman, tapi itu demi
              mencegah kerugian besar akibat gagal bayar.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Apakah data saya disimpan?</AccordionTrigger>
            <AccordionContent>
              Jika Anda login, riwayat simulasi disimpan untuk referensi Anda di
              Dashboard. Jika Anda menggunakan mode tamu, data hanya diproses
              sesaat di browser dan tidak disimpan ke database server demi
              privasi.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Bagaimana cara agar disetujui?</AccordionTrigger>
            <AccordionContent>
              Perbaiki rasio hutang (lunasi cicilan lain), pastikan saldo
              rekening aktif mencerminkan kemampuan bayar, dan pilih tenor yang
              masuk akal (jangan terlalu singkat untuk nominal besar). Memiliki
              aset (BPKB/Sertifikat) juga sangat membantu skor RBF.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* CTA Footer */}
      <section className="mt-24 text-center">
        <p className="text-muted-foreground mb-4">Sudah paham cara kerjanya?</p>
        <Button
          asChild
          size="lg"
          className="rounded-full px-8 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none"
        >
          <Link href="/simulasi">
            Coba Simulasi Sekarang <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}

// --- SUB COMPONENTS ---

function ConceptCard({ icon, title, desc }: any) {
  return (
    <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-indigo-500">
      <CardHeader>
        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mb-2">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed text-sm">{desc}</p>
      </CardContent>
    </Card>
  );
}

function StepRow({ number, title, desc, icon, isLast, children }: any) {
  return (
    <div className="flex gap-4 md:gap-8">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shrink-0 z-10">
          {number}
        </div>
        {!isLast && (
          <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-800 my-2"></div>
        )}
      </div>
      <div className="pb-12 w-full">
        <div className="flex items-center gap-3 mb-2">
          {icon}
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            {title}
          </h3>
        </div>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          {desc}
        </p>
        {children}
      </div>
    </div>
  );
}
