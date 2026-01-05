import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-24 pb-32">
      {/* Background Gradients (Efek "Saba Batik") */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] z-[-1]">
        <div className="absolute top-[-10%] left-[20%] w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-[10%] right-[20%] w-72 h-72 bg-indigo-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Badge Kecil */}
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50/50 px-3 py-1 text-sm font-medium text-blue-800 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300 backdrop-blur-sm shadow-sm">
            <Shield className="mr-2 h-3.5 w-3.5" />
            <span>AI Risk Management System</span>
          </div>

          {/* Headline Besar */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
            Keputusan Kredit Cerdas dengan <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Cost-Sensitive AI
            </span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl leading-relaxed">
            Platform analisis kelayakan kredit menggunakan algoritma{" "}
            <strong>RBF Network</strong> yang dioptimalkan untuk melindungi
            modal bank dari risiko gagal bayar.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-2">
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base rounded-full shadow-lg shadow-blue-600/20 bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105"
            >
              <Link href="/simulasi">
                Mulai Simulasi <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base rounded-full bg-background/60 backdrop-blur-sm hover:bg-muted"
            >
              <Link href="/edukasi">Pelajari Metode</Link>
            </Button>
          </div>

          {/* Feature List Kecil */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground pt-4">
            <span className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" /> Akurasi
              Tinggi
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" /> German
              Credit Data
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" /> Proteksi
              Modal
            </span>
          </div>
        </div>

        {/* IMAGE / VISUAL SECTION (Mockup Dashboard) */}
        <div className="mt-16 relative mx-auto max-w-5xl">
          {/* Efek Glow di belakang gambar */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-20"></div>

          {/* Mockup Container */}
          <div className="relative rounded-xl border bg-background/80 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Header Mockup (Window Controls) */}
            <div className="border-b bg-muted/50 px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="ml-4 h-2 w-32 bg-muted-foreground/20 rounded-full" />
            </div>

            {/* Content Mockup (Preview Dashboard) */}
            <div className="p-6 md:p-10 grid gap-6 md:grid-cols-2 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
              {/* Kiri: Form Simulation Preview */}
              <div className="space-y-4">
                <div className="h-4 w-24 bg-blue-200 dark:bg-blue-900/50 rounded" />
                <div className="h-8 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="space-y-2">
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-2 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="h-10 bg-white dark:bg-slate-800 rounded border shadow-sm" />
                  <div className="h-10 bg-white dark:bg-slate-800 rounded border shadow-sm" />
                </div>
                <div className="h-10 w-full bg-blue-600 rounded shadow-md mt-2 opacity-90" />
              </div>

              {/* Kanan: Result Preview (Cost Sensitive) */}
              <div className="rounded-lg border bg-white dark:bg-slate-900 shadow-lg p-5 flex flex-col justify-center items-center text-center space-y-3 relative overflow-hidden">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
                <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600">
                  <Shield className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800 mx-auto rounded" />
                  <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 mx-auto rounded" />
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                  <div className="bg-indigo-500 h-full w-[80%]" />
                </div>
                <div className="text-[10px] text-muted-foreground pt-2">
                  Cost-Sensitive Model Prediction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
