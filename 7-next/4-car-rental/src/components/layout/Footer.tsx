import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-surface-container-high text-on-surface-variant mt-auto">
      {/* Upper Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg">
                M
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-primary font-headline">
                MORENT
              </span>
            </Link>
            <p className="text-sm text-outline max-w-sm leading-relaxed">
              Vizyonumuz, en prestijli araçları bürokrasisiz, anahtarsız ve şeffaf fiyatlandırmayla parmaklarınızın ucuna getirmektir. Türkiye genelinde havalimanı ve VIP vale teslimatı.
            </p>
            <div className="flex items-center gap-3 text-xs text-outline font-medium">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Filo Çevrimiçi & Aktif
              </span>
              <span>•</span>
              <span>İstanbul, İzmir, Ankara, Bodrum, Antalya</span>
            </div>
          </div>

          {/* Nav Column 1: Araçlar */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Araç Filosu
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/vehicles?category=Elektrikli" className="hover:text-primary transition-colors">
                  Elektrikli Araçlar
                </Link>
              </li>
              <li>
                <Link href="/vehicles?category=Spor" className="hover:text-primary transition-colors">
                  Spor & Coupe
                </Link>
              </li>
              <li>
                <Link href="/vehicles?category=SUV" className="hover:text-primary transition-colors">
                  Lüks SUV & 4x4
                </Link>
              </li>
              <li>
                <Link href="/vehicles?category=Sedan" className="hover:text-primary transition-colors">
                  Yönetici Sedanları
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Column 2: Şirket */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Morent Deneyimi
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/#why-morent" className="hover:text-primary transition-colors">
                  FastPass™ Nasıl Çalışır?
                </Link>
              </li>
              <li>
                <Link href="/#locations" className="hover:text-primary transition-colors">
                  Havalimanı & Vale Noktaları
                </Link>
              </li>
              <li>
                <Link href="/vehicles?popular=true" className="hover:text-primary transition-colors">
                  Haftanın Özel Fırsatları
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-primary transition-colors">
                  Kurumsal Üyelik
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Column 3: İletişim & Güvenlik */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Güvenlik & Destek
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li className="flex items-center gap-1.5 text-on-surface">
                <span className="material-symbols-outlined text-[16px] text-tertiary">support_agent</span>
                <span>0850 440 2026</span>
              </li>
              <li className="text-outline">destek@morent.com.tr</li>
              <li className="text-outline">7/24 VIP Yol Yardım</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer with Certifications */}
      <div className="border-t border-surface-container-high/80 py-6 bg-surface-container-low/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-outline">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-on-surface">© 2026 MORENT A.Ş.</span>
            <span>Tüm hakları saklıdır.</span>
          </div>

          {/* Security Certifications */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container text-on-surface font-semibold text-[11px]">
              <span className="material-symbols-outlined text-[14px] text-emerald-600">verified_user</span>
              <span>SOC 2 Type II</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container text-on-surface font-semibold text-[11px]">
              <span className="material-symbols-outlined text-[14px] text-primary">lock</span>
              <span>256-Bit SSL Şifreleme</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container text-on-surface font-semibold text-[11px]">
              <span className="material-symbols-outlined text-[14px] text-primary-container">shield</span>
              <span>ISO 27001 Sertifikalı</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
