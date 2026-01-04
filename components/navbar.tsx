"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const routes = [
    { href: "/", label: "Beranda" },
    { href: "/simulasi", label: "Simulasi AI" },
    { href: "/edukasi", label: "Cara Kerja" },
    { href: "/about", label: "Tentang" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold tracking-tight">
            CreditGuard.ai
          </span>
        </div>

        <div className="hidden md:flex gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                pathname === route.href
                  ? "text-blue-600"
                  : "text-muted-foreground"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant={pathname === "/simulasi" ? "secondary" : "default"}
          >
            <Link href="/simulasi">Coba Sekarang</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
