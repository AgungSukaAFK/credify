"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
  HelpCircle,
  BarChart3,
  Scan,
  Calculator,
  MousePointerClick,
  Building2,
  UserCircle2,
  AlertTriangle,
  FileText,
  XCircle,
  Wallet,
  Landmark,
  ShieldCheck,
  Activity,
} from "lucide-react";

// Import Logic & Data
import { CONCLUSIONS } from "@/lib/conclusions";
import { runSimulation } from "@/lib/engine";
import { MAPPINGS, LOAN_LIMITS } from "@/lib/constants";
import { createClient } from "@/utils/supabase/client";

// Import Shadcn Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// --- HELPER FUNCTIONS ---
const formatRupiah = (value: number | string) => {
  if (!value) return "";
  const numberString = value.toString().replace(/[^,\d]/g, "");
  const split = numberString.split(",");
  let sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  if (ribuan) {
    const separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }
  return split[1] !== undefined
    ? "Rp " + rupiah + "," + split[1]
    : "Rp " + rupiah;
};

const getConclusion = (
  stdStatus: string,
  csStatus: string,
  redFlags: string[] = [],
  mode: "bank" | "nasabah"
) => {
  const flags = Array.isArray(redFlags) ? redFlags : [];
  const hasUnrealisticFlag = flags.some(
    (f) =>
      f.includes("Tenor") ||
      f.includes("Gagal Bayar") ||
      f.includes("Kapasitas")
  );
  let key = "STRONG_REJECT";
  if (hasUnrealisticFlag) {
    key = "UNREALISTIC";
  } else {
    const isStdApp = stdStatus === "APPROVED";
    const isCsApp = csStatus === "APPROVED";
    if (isStdApp && isCsApp) key = "STRONG_APPROVE";
    else if (!isStdApp && !isCsApp) key = "STRONG_REJECT";
    else if (isStdApp && !isCsApp) key = "HIDDEN_RISK";
    else key = "POTENTIAL_GEM";
  }
  // @ts-ignore
  const list = CONCLUSIONS[key]?.[mode];
  if (!list || list.length === 0)
    return {
      title: "Analisis Selesai",
      desc: "Cek detail di bawah.",
      action: "Tinjau hasil.",
      color: "bg-slate-100",
    };
  return list[Math.floor(Math.random() * list.length)];
};

const MAX_LOAN = 1000000000;

// --- MAIN COMPONENT ---

export default function SimulasiPage() {
  const [results, setResults] = useState<ReturnType<
    typeof runSimulation
  > | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [displayAmount, setDisplayAmount] = useState("");
  const [viewMode, setViewMode] = useState<"bank" | "nasabah">("bank");
  const [conclusionText, setConclusionText] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.id);
      }
    };
    checkUser();
  }, []);

  // DEFINISI DEFAULT VALUES AGAR RESET BERJALAN MULUS
  const defaultValues = {
    amount: 0,
    duration: 12,
    purpose: "",
    age: 25,
    personal_status: "",
    residence_since: "",
    dependents: "",
    foreign_worker: "",
    checking_status: "",
    savings: "",
    credit_history: "",
    existing_credits: "",
    employment: "",
    job: "",
    property: "",
    housing: "",
    other_installment: "",
    other_debtors: "",
  };

  const form = useForm({ defaultValues });

  // Loading Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setLoadingProgress(0);
      interval = setInterval(() => {
        setLoadingProgress((prev) =>
          prev >= 90 ? prev : prev + Math.random() * 10
        );
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (results) {
      setConclusionText(
        getConclusion(
          results.standard.status,
          results.costSensitive.status,
          results.redFlags,
          viewMode
        )
      );
    }
  }, [viewMode, results]);

  // --- SUBMIT HANDLER ROBUST ---
  async function onSubmit(values: any) {
    // 1. Validasi Amount
    if (
      !values.amount ||
      values.amount < LOAN_LIMITS.amount.min ||
      values.amount > MAX_LOAN
    ) {
      toast.error("Nominal Tidak Valid", {
        description: "Range: Rp 5 Juta - Rp 1 Milyar",
      });
      return;
    }

    // 2. Validasi Kelengkapan (Cek nilai kosong/undefined)
    // Filter key yang nilainya falsy (kecuali angka 0)
    const missingFields = Object.keys(values).filter((key) => {
      const val = values[key];
      return val === "" || val === undefined || val === null;
    });

    if (missingFields.length > 0) {
      // Tampilkan field mana yang kurang dengan nama yang lebih manusiawi (opsional mapping)
      toast.error("Data Belum Lengkap", {
        description: `Mohon lengkapi data yang masih kosong.`,
      });
      return;
    }

    setIsLoading(true);
    setResults(null);

    setTimeout(async () => {
      try {
        setLoadingProgress(100);
        const res = runSimulation(values);
        setResults(res);
        setConclusionText(
          getConclusion(
            res.standard.status,
            res.costSensitive.status,
            res.redFlags,
            viewMode
          )
        );

        if (isLoggedIn && userId) {
          const supabase = createClient();
          await supabase.from("history_simulasi").insert({
            user_id: userId,
            input_data: values,
            score_standard: parseFloat(res.standard.score),
            status_standard: res.standard.status,
            score_cost_sensitive: parseFloat(res.costSensitive.score),
            status_cost_sensitive: res.costSensitive.status,
          });
          toast.success("Riwayat Disimpan");
        }
      } catch (e) {
        toast.error("Gagal Memproses");
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    }, 1200);
  }

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const numericValue = parseInt(rawValue, 10) || 0;
    setDisplayAmount(formatRupiah(numericValue));
    field.onChange(numericValue);
  };

  // RESET TOTAL YANG BERSIH
  function handleReset() {
    setResults(null);
    setDisplayAmount("");
    // Reset ke default values agar state React Hook Form bersih
    form.reset(defaultValues);
    toast.info("Formulir direset", {
      description: "Silakan isi kembali data simulasi.",
    });
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
      <div className="container max-w-6xl mx-auto py-10 px-4">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Analisis Kredit
              </span>{" "}
              AI
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Simulasi keputusan kredit menggunakan RBF Network (German Credit
              Data).
            </p>
          </div>
          {results && (
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Data
            </Button>
          )}
        </div>

        <div className="grid gap-8">
          {/* --- FORM SECTION --- */}
          <Card className="border-t-4 border-t-indigo-600 shadow-xl shadow-indigo-100/50 dark:shadow-none">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b pb-4">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-indigo-600" /> Formulir
                Pengajuan
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* GROUP 1: DETAIL PINJAMAN */}
                  <div className="space-y-4">
                    <SectionHeader
                      icon={<Banknote />}
                      title="1. Detail Pinjaman"
                    />
                    <div className="grid md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem className="md:col-span-1">
                            <FormLabelWithTooltip
                              label="Nominal Pengajuan"
                              icon={<Banknote className="h-4 w-4" />}
                              desc="Total dana yang ingin dipinjam."
                            />
                            <FormControl>
                              <Input
                                placeholder="Rp 0"
                                value={displayAmount}
                                onChange={(e) => handleAmountChange(e, field)}
                                className="text-lg font-semibold text-indigo-900 h-12"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabelWithTooltip
                              label="Tenor (Bulan)"
                              icon={<Calendar className="h-4 w-4" />}
                              desc="Durasi pembayaran cicilan."
                            />
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                className="text-lg h-12"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <SelectField
                        form={form}
                        name="purpose"
                        label="Tujuan Penggunaan"
                        placeholder="Pilih Tujuan..."
                        options={MAPPINGS.purpose}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* GROUP 2: PROFIL PRIBADI */}
                  <div className="space-y-4">
                    <SectionHeader icon={<User />} title="2. Profil Pribadi" />
                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabelWithTooltip
                              label="Usia (Tahun)"
                              icon={<User className="h-4 w-4" />}
                              desc="Usia pemohon saat ini."
                            />
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                className="h-10"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <SelectField
                        form={form}
                        name="personal_status"
                        label="Status & Gender"
                        placeholder="Pilih..."
                        options={MAPPINGS.personal_status}
                      />
                      <SelectField
                        form={form}
                        name="dependents"
                        label="Tanggungan"
                        placeholder="Jml..."
                        options={MAPPINGS.dependents}
                      />
                      <SelectField
                        form={form}
                        name="foreign_worker"
                        label="Kewarganegaraan"
                        placeholder="Status..."
                        options={MAPPINGS.foreign_worker}
                      />
                      <SelectField
                        form={form}
                        name="residence_since"
                        label="Lama Tinggal"
                        placeholder="Durasi..."
                        options={MAPPINGS.residence_since}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* GROUP 3: KEUANGAN & PEKERJAAN */}
                  <div className="space-y-4">
                    <SectionHeader
                      icon={<Wallet />}
                      title="3. Keuangan & Pekerjaan"
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <SelectField
                        form={form}
                        name="checking_status"
                        label="Saldo Rekening Utama"
                        placeholder="Pilih Kondisi..."
                        options={MAPPINGS.checking_status}
                      />
                      <SelectField
                        form={form}
                        name="savings"
                        label="Tabungan / Aset Likuid"
                        placeholder="Pilih Range..."
                        options={MAPPINGS.savings}
                      />
                      <SelectField
                        form={form}
                        name="credit_history"
                        label="Riwayat Kredit (SLIK)"
                        placeholder="Pilih Histori..."
                        options={MAPPINGS.credit_history}
                      />

                      <SelectField
                        form={form}
                        name="employment"
                        label="Lama Bekerja"
                        placeholder="Masa Kerja..."
                        options={MAPPINGS.employment}
                      />
                      <SelectField
                        form={form}
                        name="job"
                        label="Level Pekerjaan"
                        placeholder="Posisi/Skill..."
                        options={MAPPINGS.job}
                      />
                      <SelectField
                        form={form}
                        name="existing_credits"
                        label="Fasilitas Kredit Aktif"
                        placeholder="Jumlah Kredit..."
                        options={MAPPINGS.existing_credits}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* GROUP 4: ASET & LIABILITAS */}
                  <div className="space-y-4">
                    <SectionHeader
                      icon={<Landmark />}
                      title="4. Aset & Liabilitas Lain"
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <SelectField
                        form={form}
                        name="property"
                        label="Kepemilikan Aset"
                        placeholder="Pilih Aset..."
                        options={MAPPINGS.property}
                      />
                      <SelectField
                        form={form}
                        name="housing"
                        label="Tempat Tinggal"
                        placeholder="Status Rumah..."
                        options={MAPPINGS.housing}
                      />
                      <SelectField
                        form={form}
                        name="other_installment"
                        label="Cicilan Lain"
                        placeholder="Cicilan Luar..."
                        options={MAPPINGS.other_installment}
                      />
                      <SelectField
                        form={form}
                        name="other_debtors"
                        label="Penjamin / Mitra"
                        placeholder="Pilih Penjamin..."
                        options={MAPPINGS.other_debtors}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all mt-4"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Sedang Menganalisis..."
                      : "Jalankan Analisis Risiko Lengkap"}
                    {!isLoading && <ChevronRight className="ml-2 h-5 w-5" />}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* LOADING OVERLAY */}
          {isLoading && (
            <div className="py-12 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
                <div className="relative bg-white dark:bg-slate-900 p-6 rounded-full shadow-2xl border border-indigo-100">
                  <Scan className="h-12 w-12 text-indigo-600 animate-[spin_3s_linear_infinite]" />
                </div>
              </div>
              <h3 className="text-xl font-bold">
                Memproses 20 Atribut Data...
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Mencocokkan pola dengan Cluster RBF
              </p>
              <div className="w-full max-w-md">
                <Progress value={loadingProgress} className="h-3" />
              </div>
            </div>
          )}

          {/* RESULT DASHBOARD */}
          {!isLoading && results && (
            <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-1000">
              {/* A. HEADER RESULT */}
              <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b pb-4">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-indigo-600" /> Hasil
                    Analisis Sistem
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="font-mono text-xs">
                      Est. Cicilan: Rp{" "}
                      {Math.round(results.monthlyInstallment).toLocaleString(
                        "id-ID"
                      )}{" "}
                      /bln
                    </Badge>
                  </div>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border">
                  <Button
                    size="sm"
                    variant={viewMode === "bank" ? "default" : "ghost"}
                    onClick={() => setViewMode("bank")}
                    className={
                      viewMode === "bank" ? "bg-indigo-600 shadow" : ""
                    }
                  >
                    <Building2 className="mr-2 h-4 w-4" /> Bank View
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "nasabah" ? "default" : "ghost"}
                    onClick={() => setViewMode("nasabah")}
                    className={
                      viewMode === "nasabah"
                        ? "bg-emerald-600 text-white shadow"
                        : ""
                    }
                  >
                    <UserCircle2 className="mr-2 h-4 w-4" /> Nasabah View
                  </Button>
                </div>
              </div>

              {/* B. RED FLAG ALERT */}
              {results.redFlags && results.redFlags.length > 0 && (
                <div className="bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 rounded-xl p-4 flex gap-4 animate-pulse">
                  <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-800 dark:text-red-300">
                      PERINGATAN RISIKO TINGGI (VETO)
                    </h4>
                    <ul className="list-disc pl-5 text-sm text-red-700 dark:text-red-400 mt-1">
                      {results.redFlags.map((flag: string, i: number) => (
                        <li key={i}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* C. SCORE CARDS */}
              <div className="grid lg:grid-cols-2 gap-8">
                <ResultCard
                  title="Cost-Sensitive Model"
                  subtitle="Rekomendasi Utama (Aman)"
                  status={results.costSensitive.status}
                  score={results.costSensitive.score}
                  isPrimary
                />
                <ResultCard
                  title="Standard RBF Model"
                  subtitle="Baseline Statistik"
                  status={results.standard.status}
                  score={results.standard.score}
                />
              </div>

              {/* D. CONCLUSION TEXT */}
              {conclusionText && (
                <Card
                  className={`border-2 border-dashed transition-colors duration-500 ${conclusionText.color}`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      {viewMode === "bank" ? <ShieldCheck /> : <FileText />}
                      {conclusionText.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="font-medium leading-relaxed">
                      {conclusionText.desc}
                    </p>
                    <Separator className="bg-current opacity-20" />
                    <div className="flex gap-4 items-start">
                      <AlertTriangle className="h-5 w-5 mt-1 opacity-70 shrink-0" />
                      <div>
                        <span className="text-xs font-bold uppercase opacity-70 block mb-1">
                          {viewMode === "bank" ? "Tindakan Bank:" : "Saran:"}
                        </span>
                        <p className="font-bold">{conclusionText.action}</p>
                      </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                      <MathDetailModal
                        details={results.details}
                        distances={results.distances}
                        redFlags={results.redFlags}
                        installment={results.monthlyInstallment}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// === SUB-COMPONENTS ===

function SectionHeader({ icon, title }: any) {
  return (
    <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold border-b pb-2 mb-2">
      {icon} {title}
    </div>
  );
}

function ResultCard({ title, subtitle, status, score, isPrimary }: any) {
  const isApproved = status === "APPROVED";
  const colorClass = isApproved
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";
  const bgClass = isApproved ? "bg-green-500" : "bg-red-500";
  const percentage = Math.min(100, Math.max(0, (parseFloat(score) + 2) * 25));

  return (
    <Card
      className={`overflow-hidden flex flex-col h-full shadow-lg ${
        isPrimary
          ? "border-t-4 border-t-indigo-600 ring-1 ring-indigo-100 dark:ring-indigo-900"
          : "border-t-4 border-t-slate-400"
      }`}
    >
      <CardHeader className="pb-2 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </div>
          <Badge
            variant={isPrimary ? "default" : "secondary"}
            className={isPrimary ? "bg-indigo-600" : ""}
          >
            {isPrimary ? "Main" : "Ref"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6 flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-muted-foreground uppercase">
            Keputusan
          </div>
          <div
            className={`text-3xl font-black tracking-tight flex items-center gap-2 ${colorClass}`}
          >
            {isApproved ? "DITERIMA" : "DITOLAK"}
            {isApproved ? (
              <CheckCircle2 className="h-6 w-6" />
            ) : (
              <AlertOctagon className="h-6 w-6" />
            )}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-xs font-mono text-muted-foreground">
              Skor RBF
            </span>
            <span className={`text-xl font-mono font-bold ${colorClass}`}>
              {score}
            </span>
          </div>
          <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
            <div className="absolute top-0 bottom-0 left-[55%] w-0.5 bg-slate-400 z-10 opacity-50 border-dashed border-l"></div>
            <div
              className={`h-full transition-all duration-1000 ${bgClass}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MathDetailModal({ details, distances, redFlags, installment }: any) {
  const renderRow = (label: string, data: any, display: any) => {
    if (!data) return null;
    return <AttributeRow label={label} detail={data} displayVal={display} />;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Calculator className="h-4 w-4" /> Bedah Perhitungan Lengkap
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Rincian Kalkulasi RBF</DialogTitle>
          <DialogDescription>
            Analisis jarak Euclidean per atribut.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="attributes" className="mt-4">
          <TabsList>
            <TabsTrigger value="attributes">1. Detail Atribut</TabsTrigger>
            <TabsTrigger value="veto">2. Kapasitas & Veto</TabsTrigger>
          </TabsList>

          <TabsContent value="attributes" className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Atribut</TableHead>
                  <TableHead>Nilai</TableHead>
                  <TableHead className="text-right">Jarak GOOD (d²)</TableHead>
                  <TableHead className="text-right">Jarak BAD (d²)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {renderRow(
                  "Durasi",
                  details.duration,
                  `${details.duration.val} Bln`
                )}
                {renderRow(
                  "Jumlah",
                  details.amount,
                  `Rp ${details.amount.val.toLocaleString("id-ID")}`
                )}
                {renderRow("Usia", details.age, `${details.age.val} Thn`)}
                {renderRow("Rekening", details.checking, details.checking.val)}
                {renderRow("History", details.history, details.history.val)}
                {renderRow("Tabungan", details.savings, details.savings.val)}
                {renderRow("Kerja", details.employment, details.employment.val)}
                {renderRow("Job Level", details.job, details.job?.val)}
                {renderRow("Tujuan", details.purpose, details.purpose?.val)}
                {renderRow("Property", details.property, details.property?.val)}
                {renderRow("Housing", details.housing, details.housing?.val)}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="veto" className="py-4 space-y-4">
            <div className="flex justify-between p-3 border rounded bg-slate-50 dark:bg-slate-900">
              <span className="font-medium">Estimasi Cicilan Pokok:</span>
              <span className="font-bold">
                Rp{" "}
                {installment
                  ? Math.round(installment).toLocaleString("id-ID")
                  : 0}{" "}
                / bln
              </span>
            </div>
            {redFlags && redFlags.length > 0 ? (
              <div className="p-4 bg-red-100 text-red-900 rounded">
                <h4 className="font-bold mb-2">Penalti Aktif!</h4>
                <ul className="list-disc pl-5">
                  {redFlags.map((flag: string, i: number) => (
                    <li key={i}>{flag}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="p-4 bg-green-100 text-green-900 rounded">
                Tidak ada Red Flag. Analisis berjalan normal.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function AttributeRow({ label, detail, displayVal }: any) {
  const isCloserToGood = detail.dGood < detail.dBad;
  return (
    <TableRow>
      <TableCell className="font-medium">{label}</TableCell>
      <TableCell className="max-w-[150px] truncate" title={displayVal}>
        {displayVal}
      </TableCell>
      <TableCell
        className={`text-right font-mono ${
          isCloserToGood ? "text-green-600 font-bold" : ""
        }`}
      >
        {detail.dGood.toFixed(4)}
      </TableCell>
      <TableCell
        className={`text-right font-mono ${
          !isCloserToGood ? "text-red-600 font-bold" : ""
        }`}
      >
        {detail.dBad.toFixed(4)}
      </TableCell>
    </TableRow>
  );
}

function FormLabelWithTooltip({
  label,
  icon,
  desc,
}: {
  label: string;
  icon: any;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <FormLabel className="flex items-center gap-2 text-sm">
        {icon} {label}
      </FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 rounded-full hover:bg-indigo-50 hover:text-indigo-600"
          >
            <HelpCircle className="h-3.5 w-3.5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 text-xs p-3 border-indigo-100 shadow-md">
          <p className="font-bold text-indigo-700 mb-1">{label}</p>
          {desc}
        </PopoverContent>
      </Popover>
    </div>
  );
}

// === FIX PENTING: SELECT FIELD YANG BENAR ===
// 1. Menggunakan value={field.value} (Controlled) BUKAN defaultValue
// 2. CSS white-space-normal agar teks panjang turun ke bawah
function SelectField({ form, name, label, options, placeholder }: any) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabelWithTooltip
            label={label}
            icon={<MousePointerClick className="h-4 w-4" />}
            desc="Pilih opsi yang paling sesuai dengan kondisi nasabah."
          />
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="h-auto min-h-[2.5rem] py-2 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-indigo-500 text-left">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.map((opt: any) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="whitespace-normal break-words max-w-[90vw] md:max-w-md my-1"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
