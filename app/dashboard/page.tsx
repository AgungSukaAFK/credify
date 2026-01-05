"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  Loader2,
  History,
  CreditCard,
  Calendar,
  Banknote,
  AlertOctagon,
  CheckCircle2,
  LogOut,
  User as UserIcon,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// Komponen UI
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

// Interface Data (Sesuaikan dengan Table Supabase)
interface HistoryItem {
  id: number;
  created_at: string;
  input_data: {
    amount: number;
    duration: number;
    age: number;
    checking_status: string;
    // ... properti lain
  };
  score_standard: number;
  status_standard: string;
  score_cost_sensitive: number;
  status_cost_sensitive: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      // 1. Cek User Session
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        toast.error("Akses Ditolak", {
          description: "Silakan login terlebih dahulu.",
        });
        router.push("/login");
        return;
      }

      setUser(user);

      // 2. Ambil Data Riwayat dari Supabase
      const { data, error } = await supabase
        .from("history_simulasi")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetch history:", error);
        toast.error("Gagal memuat riwayat");
      } else {
        setHistory(data || []);
      }

      setLoading(false);
    };

    fetchData();
  }, [router]);

  // Fungsi Logout
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  // Format Tanggal Indonesia
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper Format Rupiah (Inline jika di utils belum ada)
  const toRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  if (loading) {
    return (
      <div className="container py-10 max-w-5xl mx-auto space-y-8">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10 max-w-6xl mx-auto px-4 min-h-screen">
      {/* HEADER: PROFIL USER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="text-2xl bg-blue-100 text-blue-700">
              {user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {user?.user_metadata?.full_name || "Pengguna"}
            </h1>
            <p className="text-muted-foreground">{user?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                <UserIcon className="w-3 h-3 mr-1" /> Nasabah Terdaftar
              </Badge>
              <Badge
                variant="outline"
                className="px-2 py-0.5 text-xs border-blue-200 bg-blue-50 text-blue-700"
              >
                {history.length} Simulasi Disimpan
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button asChild variant="default" className="shadow-sm">
            <Link href="/simulasi">
              <TrendingUp className="mr-2 h-4 w-4" /> Simulasi Baru
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-red-200 text-red-700 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" /> Keluar
          </Button>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* KONTEN: RIWAYAT SIMULASI */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <History className="h-6 w-6 text-blue-600" />
            Riwayat Analisis
          </h2>
        </div>

        {history.length === 0 ? (
          // Empty State
          <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
            <CreditCard className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Belum Ada Riwayat</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Anda belum melakukan simulasi kredit apapun. Mulai analisis
              sekarang untuk melihat prediksi AI.
            </p>
            <Button asChild>
              <Link href="/simulasi">Mulai Simulasi Pertama</Link>
            </Button>
          </div>
        ) : (
          // Grid List
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item) => (
              <HistoryCard
                key={item.id}
                item={item}
                toRupiah={toRupiah}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- Komponen Kartu Riwayat ---
function HistoryCard({ item, toRupiah, formatDate }: any) {
  const isApproved = item.status_cost_sensitive === "APPROVED";

  return (
    <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-transparent hover:border-t-blue-500 group">
      <CardHeader className="pb-3 bg-muted/20">
        <div className="flex justify-between items-start mb-1">
          <Badge
            variant="outline"
            className="bg-background font-normal text-muted-foreground"
          >
            #{item.id}
          </Badge>
          <span className="text-xs text-muted-foreground font-medium">
            {formatDate(item.created_at)}
          </span>
        </div>
        <CardTitle className="text-lg flex items-center gap-2">
          <Banknote className="h-5 w-5 text-green-600" />
          {toRupiah(item.input_data.amount)}
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Calendar className="h-3 w-3" /> Tenor {item.input_data.duration}{" "}
          Bulan
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Ringkasan Hasil */}
        <div className="space-y-3">
          {/* Cost Sensitive (Utama) */}
          <div className="flex justify-between items-center p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-300">
                Cost-Sensitive
              </span>
              <span className="text-sm font-semibold">
                {item.status_cost_sensitive}
              </span>
            </div>
            {isApproved ? (
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            ) : (
              <AlertOctagon className="h-5 w-5 text-red-600" />
            )}
          </div>

          {/* Standard (Info) */}
          <div className="flex justify-between items-center px-2">
            <span className="text-xs text-muted-foreground">
              Standard Model:
            </span>
            <Badge
              variant={
                item.status_standard === "APPROVED"
                  ? "secondary"
                  : "destructive"
              }
              className="text-[10px] h-5"
            >
              {item.status_standard}
            </Badge>
          </div>
        </div>

        <div className="pt-2">
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${isApproved ? "bg-green-500" : "bg-red-500"}`}
              style={{
                width: `${Math.min(
                  100,
                  (parseFloat(item.score_cost_sensitive) + 2) * 25
                )}%`,
              }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
            <span>Score: {item.score_cost_sensitive.toFixed(4)}</span>
            <span>{isApproved ? "Aman" : "Berisiko"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
