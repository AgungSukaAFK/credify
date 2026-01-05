import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  BrainCircuit,
  Database,
  ShieldCheck,
  Code2,
  GraduationCap,
  Users,
  Layers,
  Zap,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Abstract Background Blurs */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] -z-10" />

        <div className="container max-w-5xl mx-auto px-4 text-center">
          <Badge
            variant="outline"
            className="mb-6 px-4 py-1.5 border-indigo-200 bg-indigo-50 text-indigo-700 rounded-full shadow-sm dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800"
          >
            <GraduationCap className="mr-2 h-3.5 w-3.5" />
            Final Project Research
          </Badge>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-6">
            Sistem Pendukung Keputusan <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Kelayakan Kredit
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Credify adalah implementasi algoritma <strong>RBF Network</strong>{" "}
            dengan pendekatan <strong>Cost-Sensitive Learning</strong> untuk
            meminimalisir risiko finansial pada proses pemberian kredit.
          </p>
        </div>
      </section>

      {/* --- MISSION GRID --- */}
      <section className="container max-w-6xl mx-auto px-4 -mt-16 relative z-10 mb-24">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<BrainCircuit className="h-8 w-8 text-indigo-600" />}
            title="Algoritma RBF"
            desc="Menggunakan Radial Basis Function Network untuk memetakan pola non-linear dari data nasabah yang kompleks."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-8 w-8 text-emerald-600" />}
            title="Cost-Sensitive"
            desc="Meminimalisir kerugian finansial dengan memberikan bobot penalti lebih besar pada kesalahan prediksi 'False Negative'."
          />
          <FeatureCard
            icon={<Database className="h-8 w-8 text-blue-600" />}
            title="German Dataset"
            desc="Dilatih menggunakan standar dataset kredit internasional (UCI Repository) yang mencakup atribut finansial dan demografis."
          />
        </div>
      </section>

      {/* --- BACKGROUND STORY --- */}
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Latar Belakang{" "}
                <span className="text-indigo-600">Penelitian</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Industri perbankan menghadapi tantangan besar dalam
                  menyeimbangkan antara pertumbuhan portofolio kredit dan
                  mitigasi risiko gagal bayar (NPL). Metode konvensional
                  seringkali kaku dan lambat.
                </p>
                <p>
                  Aplikasi ini dirancang untuk menjawab masalah tersebut dengan
                  pendekatan komputasi cerdas. Kami membandingkan performa model
                  standar dengan model *cost-sensitive* untuk membuktikan bahwa
                  penyesuaian bobot risiko dapat menyelamatkan aset bank secara
                  signifikan.
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <Badge variant="secondary">
                    <Zap className="h-3 w-3 mr-1" /> Fast Processing
                  </Badge>
                  <Badge variant="secondary">
                    <Layers className="h-3 w-3 mr-1" /> Multi-Layer Logic
                  </Badge>
                </div>
              </div>
              <div className="pt-4">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                >
                  <Link href="/edukasi">
                    Pelajari Cara Kerja <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* ILUSTRASI ARSITEKTUR (PENGGANTI STATISTIK) */}
            <div className="relative p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl"></div>
              <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Layers className="h-5 w-5 text-indigo-600" /> Arsitektur Sistem
              </h4>

              <div className="space-y-4 relative">
                {/* Alur Garis */}
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-300 dark:bg-slate-600 -z-10 border-l border-dashed"></div>

                <ArchitectureStep
                  step="1"
                  title="Input Layer"
                  desc="20 Atribut Nasabah (5C Credit)"
                  color="bg-slate-200 text-slate-700"
                />
                <ArchitectureStep
                  step="2"
                  title="Hidden Layer (RBF)"
                  desc="Clustering (K-Means) & Gaussian Activation"
                  color="bg-indigo-100 text-indigo-700"
                />
                <ArchitectureStep
                  step="3"
                  title="Cost Matrix"
                  desc="Penalti Risiko (5x bobot untuk Bad Credit)"
                  color="bg-amber-100 text-amber-700"
                />
                <ArchitectureStep
                  step="4"
                  title="Output Layer"
                  desc="Keputusan Kredit (Approved / Rejected)"
                  color="bg-emerald-100 text-emerald-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TIM PENGEMBANG (6 ANGGOTA) --- */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Tim Pengembang</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-16">
            Proyek ini dikembangkan dengan dedikasi tinggi oleh tim mahasiswa
            sebagai bagian dari tugas akhir / penelitian akademis.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Anggota 1 (Lead/Anda) */}
            <TeamCard
              name="M. Agung Maulana"
              role="Lead Developer / Researcher"
              initials="AM"
            />
            {/* Placeholder Anggota 2-6 (Silakan ganti namanya) */}
            <TeamCard name="Hafidz Fauzi" role="System Analyst" initials="HF" />
            <TeamCard name="Ucu Sukarya" role="UI/UX Designer" initials="US" />
            <TeamCard name="Fauliatunajah" role="Data Engineer" initials="FA" />
            <TeamCard name="Nuraisyah" role="Quality Assurance" initials="NA" />
            <TeamCard
              name="Ilham Syaputra"
              role="Technical Writer"
              initials="IS"
            />
          </div>

          {/* Tech Stack Footer */}
          <div className="mt-20 pt-10 border-t">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
              Powered By
            </h3>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <TechBadge label="Next.js 14" />
              <TechBadge label="TypeScript" />
              <TechBadge label="Supabase" />
              <TechBadge label="Shadcn UI" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- SUB COMPONENTS ---

function FeatureCard({ icon, title, desc }: any) {
  return (
    <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <CardContent className="p-6 space-y-4">
        <div className="p-3 bg-white dark:bg-slate-800 rounded-xl w-fit shadow-sm border border-slate-100 dark:border-slate-700">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm">{desc}</p>
      </CardContent>
    </Card>
  );
}

function ArchitectureStep({ step, title, desc, color }: any) {
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-lg border shadow-sm z-10 relative">
      <div
        className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm ${color}`}
      >
        {step}
      </div>
      <div className="text-left">
        <div className="font-bold text-sm text-slate-800 dark:text-slate-200">
          {title}
        </div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}

function TeamCard({ name, role, initials }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-4 text-left group">
      <div className="h-14 w-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
        {initials}
      </div>
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white">{name}</h4>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
}

function TechBadge({ label }: { label: string }) {
  return (
    <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-md font-medium text-slate-500 text-xs">
      {label}
    </div>
  );
}
