import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <div className="container py-10 max-w-2xl text-center">
      <h1 className="text-3xl font-bold mb-8">Tentang Proyek</h1>

      <div className="bg-card border rounded-xl p-8 shadow-sm mb-8">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src="/placeholder-avatar.jpg" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">Nama Anda</h2>
        <p className="text-muted-foreground mb-4">Mahasiswa Informatika</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Aplikasi ini dikembangkan sebagai bagian dari penelitian Skripsi/Tugas
          Akhir untuk menguji efektivitas algoritma RBF Network dengan
          pendekatan Cost-Sensitive Learning pada dataset risiko kredit Jerman.
        </p>
      </div>

      <div className="text-left space-y-4">
        <h3 className="font-semibold">Tech Stack:</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Next.js 14</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Shadcn UI</Badge>
          <Badge variant="secondary">Tailwind CSS</Badge>
          <Badge variant="secondary">WEKA Data Mining</Badge>
        </div>
      </div>
    </div>
  );
}
