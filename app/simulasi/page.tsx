"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner"; // Ganti Alert biasa dengan Sonner
import {
  Loader2,
  Info,
  CheckCircle2,
  AlertOctagon,
  RefreshCw,
  ChevronRight,
  Banknote,
  Calendar,
  User,
} from "lucide-react";

// Import Logic & Constants
import { runSimulation } from "@/lib/engine";
import { MAPPINGS, LOAN_LIMITS } from "@/lib/constants";

// Import Shadcn Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

export default function SimulasiPage() {
  const [results, setResults] = useState<ReturnType<
    typeof runSimulation
  > | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Setup Form tanpa Zod Resolver
  const form = useForm({
    defaultValues: {
      duration: 12,
      amount: 10000000,
      age: 25,
      checking_status: "",
      savings: "",
      credit_history: "",
      employment: "",
    },
  });

  // 2. Manual Validation & Submit Handler
  function onSubmit(values: any) {
    // --- Validasi Manual (Pengganti Zod) ---

    // Cek Field Kosong
    if (
      !values.checking_status ||
      !values.savings ||
      !values.credit_history ||
      !values.employment
    ) {
      toast.error("Data Belum Lengkap", {
        description:
          "Harap pilih semua opsi pada kolom kategori (Rekening, Tabungan, dll).",
      });
      return;
    }

    // Cek Range Durasi
    if (
      values.duration < LOAN_LIMITS.duration.min ||
      values.duration > LOAN_LIMITS.duration.max
    ) {
      toast.warning("Durasi Tidak Valid", {
        description: `Durasi pinjaman harus antara ${LOAN_LIMITS.duration.min} - ${LOAN_LIMITS.duration.max} bulan.`,
      });
      return;
    }

    // Cek Range Umur
    if (values.age < LOAN_LIMITS.age.min || values.age > LOAN_LIMITS.age.max) {
      toast.warning("Usia Tidak Valid", {
        description: `Usia pemohon harus antara ${LOAN_LIMITS.age.min} - ${LOAN_LIMITS.age.max} tahun.`,
      });
      return;
    }

    // Cek Range Amount
    if (
      values.amount < LOAN_LIMITS.amount.min ||
      values.amount > LOAN_LIMITS.amount.max
    ) {
      toast.warning("Nominal Tidak Valid", {
        description: `Jumlah pinjaman harus antara Rp 2.5 Juta s.d Rp 185 Juta.`,
      });
      return;
    }

    // --- Jika Lolos Validasi ---
    setIsLoading(true);
    setResults(null); // Clear hasil lama

    // Simulasi Network Request
    setTimeout(() => {
      try {
        const res = runSimulation(values);
        setResults(res);
        setIsLoading(false);

        // Notifikasi Sukses dengan Sonner
        toast.success("Analisis Selesai", {
          description:
            "Perhitungan RBF Network & Cost-Sensitive berhasil dijalankan.",
          duration: 4000,
        });
      } catch (error) {
        setIsLoading(false);
        toast.error("Terjadi Kesalahan", {
          description: "Gagal menjalankan kalkulasi.",
        });
      }
    }, 800);
  }

  function handleReset() {
    setResults(null);
    form.reset({
      duration: 12,
      amount: 10000000,
      age: 25,
      checking_status: "",
      savings: "",
      credit_history: "",
      employment: "",
    });
    toast.info("Formulir Direset", {
      description: "Silakan masukkan data baru.",
    });
  }

  return (
    <div className="container max-w-7xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Simulasi Kredit AI
          </h1>
          <p className="text-muted-foreground mt-1">
            Input data nasabah untuk melihat prediksi risiko secara real-time.
          </p>
        </div>
        {results && (
          <Button
            variant="outline"
            onClick={handleReset}
            className="gap-2 hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <RefreshCw className="h-4 w-4" /> Reset Data
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* --- KOLOM KIRI: FORM INPUT --- */}
        <Card className="lg:col-span-5 border-t-4 border-t-blue-600 shadow-xl h-fit sticky top-24">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              Data Pengajuan
            </CardTitle>
            <CardDescription>
              Lengkapi profil nasabah di bawah ini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Input Group: Numerik */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-xs uppercase font-semibold text-muted-foreground">
                          <Calendar className="h-3 w-3" /> Tenor (Bulan)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            className="font-medium"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-xs uppercase font-semibold text-muted-foreground">
                          <User className="h-3 w-3" /> Usia (Tahun)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            className="font-medium"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-xs uppercase font-semibold text-muted-foreground">
                        <Banknote className="h-3 w-3" /> Jumlah Pinjaman (IDR)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="font-medium text-lg"
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Min: 2.5 Juta — Max: 185 Juta
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <Separator className="bg-border/60" />

                {/* Input Group: Kategorikal */}
                <div className="space-y-4">
                  <SelectField
                    form={form}
                    name="checking_status"
                    label="Status Rekening Koran"
                    placeholder="Pilih kondisi rekening..."
                    options={MAPPINGS.checking_status}
                  />
                  <SelectField
                    form={form}
                    name="savings"
                    label="Simpanan / Tabungan"
                    placeholder="Pilih jumlah tabungan..."
                    options={MAPPINGS.savings}
                  />
                  <SelectField
                    form={form}
                    name="credit_history"
                    label="Riwayat Kredit"
                    placeholder="Pilih histori pembayaran..."
                    options={MAPPINGS.credit_history}
                  />
                  <SelectField
                    form={form}
                    name="employment"
                    label="Lama Bekerja"
                    placeholder="Pilih masa kerja..."
                    options={MAPPINGS.employment}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
                      Menganalisis...
                    </>
                  ) : (
                    <>
                      Analisis Risiko <ChevronRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* --- KOLOM KANAN: HASIL --- */}
        <div className="lg:col-span-7 space-y-6">
          {!results ? (
            // State Kosong (Placeholder)
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-xl bg-muted/10 p-8 text-center">
              <div className="bg-background p-6 rounded-full shadow-sm mb-6 animate-pulse">
                <AlertOctagon className="h-16 w-16 text-muted-foreground/30" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground/80">
                Menunggu Input Data
              </h3>
              <p className="max-w-md text-muted-foreground">
                Hasil analisis perbandingan antara model{" "}
                <strong>RBF Standard</strong> dan{" "}
                <strong>Cost-Sensitive</strong> akan muncul di sini.
              </p>
            </div>
          ) : (
            // State Hasil (Result Cards)
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
              {/* Hasil Utama: COST SENSITIVE */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20"></div>
                <ResultCard
                  title="Cost-Sensitive Model"
                  badge="Rekomendasi Utama"
                  type="cost-sensitive"
                  data={results.costSensitive}
                  desc="Model ini memberikan denda 5x lipat pada risiko. Sangat konservatif dan diutamakan untuk melindungi modal bank dari kredit macet."
                />
              </div>

              {/* Hasil Pembanding: STANDARD */}
              <ResultCard
                title="Standard RBF Model"
                badge="Baseline / Pembanding"
                type="standard"
                data={results.standard}
                desc="Model ini bekerja secara standar mengejar akurasi statistik tanpa mempertimbangkan besarnya kerugian finansial."
              />

              {/* Card Interpretasi */}
              <Card className="bg-slate-50 dark:bg-slate-900/50 border-dashed">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Info className="h-4 w-4" /> Catatan Interpretasi
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    • Jika kedua model hijau (
                    <span className="text-green-600 font-bold">APPROVED</span>),
                    nasabah sangat aman.
                  </p>
                  <p>
                    • Jika Standard hijau tapi Cost-Sensitive merah, ini adalah{" "}
                    <strong>"Hidden Risk"</strong>. Sistem menyarankan untuk{" "}
                    <span className="text-red-600 font-bold">MENOLAK</span> demi
                    keamanan.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Komponen Helper untuk Form Select ---
function SelectField({ form, name, label, options, placeholder }: any) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs uppercase font-semibold text-muted-foreground">
            {label}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="h-10">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((opt: any) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}

// --- Komponen Result Card ---
function ResultCard({ title, badge, data, desc, type }: any) {
  const isApproved = data.status === "APPROVED";
  const isCostSensitive = type === "cost-sensitive";

  // Style config
  const borderColor = isCostSensitive
    ? "border-indigo-500/50"
    : "border-border";
  const headerBg = isCostSensitive
    ? "bg-indigo-50/50 dark:bg-indigo-900/20"
    : "bg-muted/30";
  const statusColor = isApproved
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";

  // Visual Progress Bar Calculation
  // Mapping score range roughly -2 to +2 to 0-100%
  const rawScore = parseFloat(data.score);
  const progressValue = Math.min(100, Math.max(0, (rawScore + 1.5) * 33));

  return (
    <Card
      className={`overflow-hidden shadow-sm transition-all hover:shadow-md ${borderColor} relative bg-card`}
    >
      <CardHeader className={`pb-3 border-b ${headerBg}`}>
        <div className="flex justify-between items-start">
          <div>
            <span
              className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm ${
                isCostSensitive
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                  : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              {badge}
            </span>
            <CardTitle className="text-xl mt-2">{title}</CardTitle>
          </div>
          {isCostSensitive && (
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
              <AlertOctagon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Main Status */}
        <div className="flex items-center justify-between">
          <div className="text-left">
            <p className="text-xs text-muted-foreground font-semibold uppercase">
              Keputusan Sistem
            </p>
            <div
              className={`text-2xl font-black tracking-tight flex items-center gap-2 ${statusColor}`}
            >
              {isApproved ? (
                <CheckCircle2 className="h-6 w-6" />
              ) : (
                <AlertOctagon className="h-6 w-6" />
              )}
              {isApproved ? "DITERIMA" : "DITOLAK"}
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground font-semibold uppercase">
              RBF Score
            </p>
            <p className={`text-3xl font-mono font-bold ${statusColor}`}>
              {data.score}
            </p>
          </div>
        </div>

        {/* Visual Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
            <span>High Risk</span>
            <span>Threshold (0.2)</span>
            <span>Safe</span>
          </div>
          <Progress
            value={progressValue}
            className={`h-3 ${
              isApproved ? "[&>div]:bg-green-500" : "[&>div]:bg-red-500"
            }`}
          />
        </div>

        {/* Description */}
        <div className="bg-muted/40 p-3 rounded-lg border text-xs text-muted-foreground leading-relaxed italic">
          "{desc}"
        </div>
      </CardContent>
    </Card>
  );
}
