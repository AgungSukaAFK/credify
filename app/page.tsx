import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Cpu, LineChart } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            🚀 Cost-Sensitive RBF Network Implementation
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Keputusan Kredit Cerdas dengan{" "}
            <span className="text-blue-600">Kecerdasan Buatan</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Sistem pendukung keputusan berbasis RBF Network yang dirancang untuk
            meminimalkan risiko finansial perbankan melalui pendekatan
            Cost-Sensitive Learning.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button asChild size="lg" className="h-12 px-8 text-lg">
              <Link href="/simulasi">
                Mulai Simulasi <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 text-lg"
            >
              <Link href="/edukasi">Pelajari Algoritma</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="container py-20 grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Cpu className="h-10 w-10 text-indigo-500" />}
          title="RBF Network Core"
          desc="Menggunakan fungsi aktivasi Gaussian untuk mendeteksi pola nasabah berdasarkan kedekatan data historis."
        />
        <FeatureCard
          icon={<ShieldCheck className="h-10 w-10 text-green-500" />}
          title="Cost-Sensitive"
          desc="Memberikan penalti 5x lipat pada risiko gagal bayar untuk melindungi modal bank secara agresif."
        />
        <FeatureCard
          icon={<LineChart className="h-10 w-10 text-orange-500" />}
          title="German Credit Data"
          desc="Dilatih menggunakan dataset standar industri dengan 1000 data riwayat kredit yang telah tervalidasi."
        />
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="flex flex-col items-center text-center p-6 border rounded-xl hover:shadow-lg transition-shadow">
      <div className="mb-4 p-3 bg-muted rounded-full">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{desc}</p>
    </div>
  );
}
