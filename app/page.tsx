"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Database,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-background to-background dark:from-indigo-950/30 dark:to-background">
        <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center space-y-8">
          {/* Badge */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-sm border-indigo-200 bg-indigo-50 text-indigo-700 rounded-full shadow-sm dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800"
            >
              <Zap className="mr-2 h-3.5 w-3.5 fill-indigo-500 text-indigo-500" />
              AI-Powered Credit Analysis v1.0
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-7xl max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700">
            Keputusan Kredit Cerdas dengan <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Artificial Intelligence
            </span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Platform analisis risiko kredit menggunakan algoritma{" "}
            <strong>RBF Network</strong> dan{" "}
            <strong>Cost-Sensitive Learning</strong> untuk melindungi modal dan
            meningkatkan akurasi.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base rounded-full shadow-lg shadow-indigo-500/25 transition-transform hover:scale-105"
            >
              <Link href="/simulasi">
                Mulai Simulasi <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base rounded-full bg-background/60 backdrop-blur-sm border-indigo-100 hover:bg-indigo-50 dark:border-indigo-900 dark:hover:bg-indigo-950/50"
            >
              <Link href="/edukasi">Pelajari Metodenya</Link>
            </Button>
          </div>

          {/* MOCKUP VISUAL (GAMBAR) */}
          <div className="w-full max-w-5xl mt-16 relative animate-in fade-in zoom-in-95 duration-1000 delay-300">
            {/* Decorative Blur behind image */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-xl opacity-20"></div>

            {/* The "Image" (CSS Mockup) */}
            <div className="relative rounded-xl border bg-background shadow-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] flex flex-col">
              {/* Mockup Header */}
              <div className="h-10 bg-muted/50 border-b flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="ml-4 h-5 w-64 bg-muted-foreground/10 rounded-md"></div>
              </div>
              {/* Mockup Content */}
              <div className="flex-1 p-6 grid grid-cols-12 gap-6 bg-slate-50/50 dark:bg-slate-950/50">
                {/* Sidebar Mockup */}
                <div className="hidden md:block col-span-3 space-y-3">
                  <div className="h-8 w-full bg-indigo-100 dark:bg-indigo-900/30 rounded-lg"></div>
                  <div className="h-8 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                  <div className="h-8 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                </div>
                {/* Main Content Mockup */}
                <div className="col-span-12 md:col-span-9 grid gap-6 md:grid-cols-2">
                  <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm p-5 space-y-4">
                    <div className="flex justify-between">
                      <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
                      <div className="h-4 w-4 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                    </div>
                    <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded overflow-hidden">
                      <div className="h-full w-2/3 bg-indigo-500"></div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm p-5 flex flex-col justify-center items-center text-center space-y-3">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                    <div className="h-6 w-16 bg-green-100 text-green-700 text-xs flex items-center justify-center rounded-full font-bold">
                      APPROVED
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Teknologi Credify
            </h2>
            <p className="text-muted-foreground">
              Kombinasi data historis dan algoritma cerdas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ShieldCheck className="h-10 w-10 text-indigo-600" />}
              title="Cost-Sensitive"
              desc="Meminimalkan kerugian finansial dengan memberi bobot lebih pada risiko kredit macet."
            />
            <FeatureCard
              icon={<Database className="h-10 w-10 text-blue-600" />}
              title="German Credit Data"
              desc="Dilatih menggunakan dataset standar industri yang terpercaya dan tervalidasi."
            />
            <FeatureCard
              icon={<TrendingUp className="h-10 w-10 text-purple-600" />}
              title="Analisis Real-Time"
              desc="Dapatkan hasil scoring instan dengan perbandingan model ganda (Dual Model)."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <Card className="border-none shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardContent className="pt-6 text-center flex flex-col items-center space-y-4">
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-full">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{desc}</p>
      </CardContent>
    </Card>
  );
}
