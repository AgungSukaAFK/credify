"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image dari next/image
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  History,
  User as UserIcon,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Cek Auth
  React.useEffect(() => {
    const supabase = createClient();
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success("Berhasil Logout");
    router.push("/login");
    router.refresh();
  };

  // Daftar Menu Utama
  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/simulasi", label: "Simulasi AI" },
    { href: "/edukasi", label: "Cara Kerja" },
    { href: "/about", label: "Tentang" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto relative flex h-16 items-center justify-between px-4">
        {/* --- 1. LOGO (KIRI) --- */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tight transition-opacity hover:opacity-80 z-20"
        >
          {/* Ganti CreditCard icon dengan Image */}
          <div className="relative w-24 h-16">
            <Image
              src="/logo.webp"
              alt="Credify Logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* --- 2. DESKTOP MENU (TENGAH - ABSOLUTE CENTER) --- */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-primary hover:bg-muted/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* --- 3. USER ACTIONS & MOBILE TOGGLE (KANAN) --- */}
        <div className="flex items-center gap-3 z-20">
          {loading ? (
            <div className="h-9 w-9 bg-muted animate-pulse rounded-full" />
          ) : user ? (
            // User Dropdown
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full ring-2 ring-transparent hover:ring-primary/20"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.user_metadata.avatar_url} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.user_metadata.full_name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  <History className="mr-2 h-4 w-4" /> Riwayat
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Tombol Login (Desktop Only, di Mobile masuk menu)
            <Button
              asChild
              variant="default"
              size="sm"
              className="hidden sm:flex rounded-full px-5"
            >
              <Link href="/login">Masuk</Link>
            </Button>
          )}

          {/* HAMBURGER MENU (MOBILE ONLY) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* --- 4. MOBILE MENU OVERLAY --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b shadow-lg animate-in slide-in-from-top-5 duration-200">
          <div className="container flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                }`}
              >
                {/* Ikon opsional agar lebih cantik */}
                {link.href === "/" && <LayoutDashboard className="h-4 w-4" />}
                {link.href === "/simulasi" && (
                  <ShieldCheck className="h-4 w-4" />
                )}
                {link.href === "/edukasi" && <History className="h-4 w-4" />}
                {link.href === "/about" && <UserIcon className="h-4 w-4" />}
                {link.label}
              </Link>
            ))}

            {/* Tombol Login di Mobile Menu (Jika belum login) */}
            {!user && (
              <div className="pt-2 mt-2 border-t">
                <Button
                  asChild
                  className="w-full justify-start"
                  variant="ghost"
                >
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserIcon className="mr-2 h-4 w-4" /> Masuk Akun
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
