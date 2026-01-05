import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar"; // Pastikan import ini ada
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Credify - Analisis Kredit AI",
  description:
    "Platform simulasi kredit berbasis RBF Network & Cost-Sensitive Learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* Navbar dipasang di sini agar muncul di SEMUA halaman */}
        <Navbar />

        <main className="min-h-screen bg-background selection:bg-indigo-100 selection:text-indigo-900">
          {children}
        </main>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
