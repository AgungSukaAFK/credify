import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EducationPage() {
  return (
    <div className="container py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Bagaimana AI Bekerja?</h1>

      <Tabs defaultValue="konsep" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="konsep">Konsep Dasar</TabsTrigger>
          <TabsTrigger value="matematis">Alur Matematis</TabsTrigger>
          <TabsTrigger value="perbandingan">RBF vs Cost-Sensitive</TabsTrigger>
        </TabsList>

        <TabsContent value="konsep" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Radial Basis Function (RBF)
              </h2>
              <p className="text-muted-foreground mb-4">
                Bayangkan AI ini seperti seorang petugas bank senior yang
                memiliki ingatan kuat tentang 4 tipe nasabah (Klaster).
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Sistem tidak melihat data sebagai angka acak.</li>
                <li>
                  Sistem mengukur <strong>"Seberapa mirip"</strong> nasabah baru
                  dengan nasabah lama yang macet atau lancar.
                </li>
                <li>
                  Jika nasabah baru mirip dengan klaster "Macet", sistem akan
                  langsung menolak.
                </li>
              </ul>
            </div>
            <div className="bg-muted p-6 rounded-xl flex items-center justify-center h-64">
              {/* Anda bisa masukkan gambar diagram RBF di sini nanti */}
              <span className="text-sm font-mono text-muted-foreground">
                Ilustrasi Diagram Neural Network
              </span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="matematis">
          <Card>
            <CardHeader>
              <CardTitle>Tahapan Perhitungan Sistem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Step number="1" title="Normalisasi Data">
                Semua input (Gaji, Umur, Durasi) diubah ke skala 0 sampai 1 agar
                adil.
                <code className="block bg-muted p-2 mt-2 rounded text-xs">
                  x_norm = (x - min) / (max - min)
                </code>
              </Step>
              <Step number="2" title="Jarak Euclidean">
                Menghitung jarak antara data nasabah dengan 4 titik pusat
                klaster (Center).
              </Step>
              <Step number="3" title="Fungsi Aktivasi Gaussian">
                Mengubah jarak menjadi skor kemiripan (0 s.d 1). Semakin dekat
                jarak, nilai mendekati 1.
              </Step>
              <Step number="4" title="Keputusan Akhir">
                Skor total dihitung berdasarkan bobot. Jika Skor {">"} 0.2, maka
                "Accepted".
              </Step>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="perbandingan">
          <div className="grid gap-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle>Model Standar</CardTitle>
              </CardHeader>
              <CardContent>
                Hanya peduli pada akurasi. Salah memprediksi nasabah macet
                dianggap sama buruknya dengan salah menolak nasabah baik.
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle>Model Cost-Sensitive (Pilihan Kita)</CardTitle>
              </CardHeader>
              <CardContent>
                Lebih "Paranoid". Kesalahan menerima nasabah macet diberi
                denda/biaya 5x lipat. Hasilnya: Model lebih sering menolak
                nasabah meragukan demi keamanan modal bank.
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Step({ number, title, children }: any) {
  return (
    <div className="flex gap-4">
      <div className="flex-none w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <div className="text-sm text-muted-foreground mt-1">{children}</div>
      </div>
    </div>
  );
}
