import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BrainCircuit,
  Scale,
  Database,
  Lock,
  Zap,
  BarChart3,
} from "lucide-react";

const features = [
  {
    title: "RBF Network Core",
    desc: "Menggunakan fungsi aktivasi Gaussian untuk mendeteksi kemiripan profil nasabah dengan pola historis secara akurat.",
    icon: BrainCircuit,
    color: "text-blue-500",
  },
  {
    title: "Cost-Sensitive Learning",
    desc: "Memberikan bobot penalti 5x lebih besar pada risiko kredit macet (False Negative) untuk melindungi modal bank.",
    icon: Scale,
    color: "text-indigo-500",
  },
  {
    title: "German Credit Dataset",
    desc: "Model dilatih menggunakan standar dataset industri yang telah tervalidasi dengan 20 atribut finansial.",
    icon: Database,
    color: "text-green-500",
  },
  {
    title: "Real-time Scoring",
    desc: "Kalkulasi skor kredit instan tanpa delay menggunakan arsitektur web modern yang ringan.",
    icon: Zap,
    color: "text-yellow-500",
  },
  {
    title: "Dual Model Comparison",
    desc: "Bandingkan hasil antara model Standar vs Cost-Sensitive untuk melihat perbedaan keputusan risiko.",
    icon: BarChart3,
    color: "text-purple-500",
  },
  {
    title: "Secure & Private",
    desc: "Data simulasi Anda diproses dengan aman. Mode tamu tersedia tanpa penyimpanan data.",
    icon: Lock,
    color: "text-red-500",
  },
];

export default function FeatureGrid() {
  return (
    <section className="container py-24 px-4 md:px-6">
      <div className="text-center mb-16 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Teknologi di Balik Credify
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Menggabungkan ketajaman statistik dan pembelajaran mesin modern.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <Card
            key={i}
            className="group relative overflow-hidden border-muted/50 bg-background/50 hover:bg-background transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div
              className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent ${feature.color.replace(
                "text-",
                "via-"
              )}-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
            />

            <CardHeader>
              <feature.icon className={`h-10 w-10 ${feature.color} mb-2`} />
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
