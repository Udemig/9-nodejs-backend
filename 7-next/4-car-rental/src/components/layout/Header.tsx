"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close user menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/vehicles?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/vehicles");
    }
  };

  const navLinks = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Araç Filosu", href: "/vehicles" },
    { name: "Öne Çıkanlar", href: "/vehicles?popular=true" },
    { name: "Neden Morent?", href: "/#why-morent" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(15,23,42,0.06)] border-b border-surface-container-high/40">
      {/* Top Notification Announcement Bar */}
      <div className="bg-inverse-surface text-inverse-on-surface px-4 sm:px-6 py-1.5 flex items-center justify-between text-xs font-medium">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-2">
          <div className="flex items-center gap-2 truncate">
            <span className="flex h-2 w-2 rounded-full bg-tertiary-fixed animate-pulse shrink-0"></span>
            <span className="truncate">
              ⚡ Özel Fırsat: Tüm lüks elektrikli araçlarda %20 indirim. Kod:{" "}
              <strong className="text-primary-fixed tracking-wider">ELEC20</strong>
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-6 text-inverse-on-surface/80 shrink-0">
            <span>7/24 VIP Concierge Desteği</span>
            <span className="h-3 w-px bg-outline-variant/30"></span>
            <span className="text-surface-container-lowest font-medium">
              İstanbul Havalimanı & Bodrum Vale
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo & Desktop Search */}
        <div className="flex items-center gap-4 xl:gap-8 shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-primary-container text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              M
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-primary font-headline">
              MORENT
            </span>
          </Link>

          {/* Search Box - visible on >= xl screens (1280px) to prevent pushing right action buttons at 1024px-1200px */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden xl:flex items-center bg-surface-container-low rounded-xl px-3.5 py-2 w-72 lg:w-80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-primary-container transition-all"
          >
            <span className="material-symbols-outlined text-outline text-[20px] mr-2 select-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Marka, model veya kategori ara..."
              className="bg-transparent w-full text-sm text-on-surface placeholder:text-outline focus:outline-none"
            />
            <kbd className="ml-auto bg-surface-container-highest/60 text-outline text-[11px] px-1.5 py-0.5 rounded font-mono font-medium select-none">
              ↵
            </kbd>
          </form>
        </div>

        {/* Center: Navigation Links - compact spacing on lg screens (1024px - 1279px) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href.split("?")[0]);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-2 text-xs xl:text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions & Auth Area - Always visible, never cut off */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Currency Pill - visible on xl screens to save space on 1024px-1200px */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant bg-surface-container-low">
            <span className="material-symbols-outlined text-[16px]">payments</span>
            <span>TRY (₺)</span>
          </div>

          <div className="h-6 w-px bg-surface-container-highest hidden xl:block"></div>

          {/* Authentication State Handling */}
          {status === "loading" ? (
            <div className="w-24 h-9 rounded-lg bg-surface-container animate-pulse"></div>
          ) : session?.user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-surface-container-low transition-colors group cursor-pointer"
                type="button"
              >
                <div className="relative">
                  {session.user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      referrerPolicy="no-referrer"
                      className="w-8 sm:w-9 h-8 sm:h-9 rounded-full object-cover ring-2 ring-surface-container-high group-hover:ring-primary transition-all"
                    />
                  ) : (
                    <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-primary-container text-on-primary font-bold text-xs sm:text-sm flex items-center justify-center ring-2 ring-surface-container-high group-hover:ring-primary transition-all">
                      {session.user.name ? session.user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-container-lowest"></span>
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-on-surface leading-tight group-hover:text-primary transition-colors max-w-[120px] truncate">
                    {session.user.name || "Morent Üyesi"}
                  </span>
                  <span className="text-[10px] font-medium text-outline leading-tight">
                    FastPass™ Aktif
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-on-surface transition-colors text-[18px]">
                  expand_more
                </span>
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container-high/60 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2.5 border-b border-surface-container-high">
                    <p className="text-xs font-bold text-on-surface truncate">
                      {session.user.name}
                    </p>
                    <p className="text-[11px] text-outline truncate">{session.user.email}</p>
                  </div>
                  <Link
                    href="/vehicles"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">directions_car</span>
                    <span>Araç Kirala</span>
                  </Link>
                  <Link
                    href="/orders"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                    <span>Siparişlerim</span>
                  </Link>
                  <Link
                    href="/#why-morent"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    <span>FastPass Avantajları</span>
                  </Link>
                  <div className="border-t border-surface-container-high my-1"></div>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-error hover:bg-error-container/20 transition-colors text-left cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    <span>Çıkış Yap</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <Link
                href="/login"
                className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors whitespace-nowrap"
              >
                Giriş Yap
              </Link>
              <Link
                href="/register"
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-primary text-on-primary text-xs sm:text-sm font-bold hover:bg-primary-container transition-colors shadow-sm whitespace-nowrap"
              >
                Kayıt Ol
              </Link>
            </div>
          )}

          {/* Mobile / Tablet Menu Button (shown below lg: < 1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
            type="button"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer (visible on < 1024px when toggled) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-b border-surface-container-high px-4 py-4 space-y-3 shadow-lg">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-surface-container-low rounded-xl px-3 py-2"
          >
            <span className="material-symbols-outlined text-outline text-[18px] mr-2">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Araç ara..."
              className="bg-transparent w-full text-xs text-on-surface focus:outline-none"
            />
          </form>
          <div className="flex flex-col space-y-1 pt-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
