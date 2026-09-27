import React, { Suspense } from 'react';
import Link from 'next/link';
import BookingHub from '@/components/home/BookingHub';
import PopularFleet, { PopularFleetSkeleton } from '@/components/home/PopularFleet';
import { buildImaginCarUrl } from '@/lib/car-images';

export default function Home() {
  const heroCarImage = buildImaginCarUrl('Porsche', 'Taycan', '01', 2024);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-inverse-surface pt-12 pb-16 lg:pb-24">
        {/* Atmospheric Ambient Lighting & Scrim */}
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-primary-container blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-[32rem] h-[32rem] rounded-full bg-tertiary blur-3xl opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-4 lg:pt-8">
            {/* Hero Narrative */}
            <div className="lg:col-span-7 flex flex-col space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/10 backdrop-blur-md w-fit border border-surface-container-lowest/10">
                <span className="flex h-2 w-2 rounded-full bg-tertiary-fixed animate-ping"></span>
                <span className="text-tertiary-fixed text-xs font-bold uppercase tracking-wider">
                  Kişiselleştirilmiş Lüks Mobilite
                </span>
                <span className="text-inverse-on-surface/40 text-xs">•</span>
                <span className="text-inverse-on-surface/80 text-xs font-medium">
                  2026 Filosu Canlı
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-surface-container-lowest leading-tight tracking-tight font-headline">
                Olağanüstü Araçları Kiralamanın En Ayrıcalıklı Yolu
              </h1>

              <p className="text-inverse-on-surface/80 text-base sm:text-lg max-w-xl leading-relaxed">
                Zahmetsiz lüks, temassız anında teslimat ve sıfır gizli ücret. Yönetici sedanlarından elektrikli hiper-SUV&apos;lara kadar hayalinizdeki aracı dilediğiniz yerde sürün.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/vehicles"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-primary-container text-on-primary font-bold text-sm shadow-xl shadow-primary/30 hover:bg-primary transition-all group cursor-pointer"
                >
                  <span>Tüm Araçları Keşfet (140+)</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>

                <a
                  href="#fleet"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-surface-container-lowest/10 text-surface-container-lowest font-semibold text-sm backdrop-blur-md hover:bg-surface-container-lowest/20 transition-all cursor-pointer border border-surface-container-lowest/10"
                >
                  <span
                    className="material-symbols-outlined text-tertiary-fixed text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_circle
                  </span>
                  <span>Popüler Modelleri Gör</span>
                </a>
              </div>
            </div>

            {/* Hero Automotive Showcase Visual */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-surface-container-highest/10 border border-surface-container-lowest/10 flex items-center justify-center p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroCarImage}
                  alt="Porsche Taycan 4S Electric"
                  className="w-full h-full object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-transparent to-transparent opacity-70 pointer-events-none"></div>

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-surface-container-lowest/15 backdrop-blur-xl border border-surface-container-lowest/20 flex items-center justify-between text-surface-container-lowest">
                  <div className="flex flex-col">
                    <span className="font-bold text-base leading-tight font-headline">
                      Porsche Taycan 4S
                    </span>
                    <span className="text-tertiary-fixed text-xs font-medium">
                      Yüksek Voltajlı AWD Performans
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg sm:text-xl font-extrabold leading-tight font-mono">
                      ₺14.500
                    </span>
                    <span className="text-inverse-on-surface/70 text-xs ml-1">/ gün</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Modular Booking Hub */}
          <BookingHub />

          {/* Trust Badges Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 text-surface-container-lowest/90">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary-container text-[26px]">
                verified
              </span>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold leading-tight font-headline">
                  4.9 / 5.0 Değerlendirme
                </span>
                <span className="text-[11px] text-inverse-on-surface/60">
                  28,000+ Doğrulanmış Sürüş
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary-fixed text-[26px]">
                price_check
              </span>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold leading-tight font-headline">
                  Sıfır Gizli Ücret
                </span>
                <span className="text-[11px] text-inverse-on-surface/60">
                  Vergiler ve standart kasko dahil
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary-fixed-dim text-[26px]">
                phone_android
              </span>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold leading-tight font-headline">
                  Dijital Anahtar
                </span>
                <span className="text-[11px] text-inverse-on-surface/60">
                  Anında %100 temassız teslimat
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary-fixed text-[26px]">
                schedule
              </span>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold leading-tight font-headline">
                  Esnek İptal Hakkı
                </span>
                <span className="text-[11px] text-inverse-on-surface/60">
                  24 saate kadar ücretsiz iptal
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR FLEET SECTION */}
      <Suspense fallback={<PopularFleetSkeleton />}>
        <PopularFleet />
      </Suspense>

      {/* 3. PROMOTIONAL & EXPERIENCE HIGHLIGHT BANNERS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Banner 1: Havalimanı Karşılama */}
          <div className="relative rounded-2xl overflow-hidden bg-inverse-surface text-inverse-on-surface p-6 sm:p-8 flex flex-col justify-between min-h-[340px] shadow-xl border border-surface-container-high/20">
            <div className="absolute inset-0 bg-gradient-to-r from-inverse-surface via-inverse-surface/90 to-transparent z-0"></div>
            <div className="relative z-10 space-y-3 max-w-md">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-primary-container text-on-primary uppercase tracking-wider inline-block">
                VIP Terminal Servisi
              </span>
              <h3 className="text-2xl font-bold text-surface-container-lowest font-headline leading-tight">
                Özel Havalimanı Karşılama & Vale Teslimatı
              </h3>
              <p className="text-inverse-on-surface/80 text-sm leading-relaxed">
                Uzun servis kuyruklarını ve kontuar bekleme sürelerini geride bırakın. Uçuş numaranıza entegre akıllı sistemimizle, aracınız tam indiğiniz anda kapıda hazır.
              </p>
            </div>
            <div className="relative z-10 pt-6 flex flex-wrap items-center gap-4 border-t border-inverse-on-surface/10 mt-4">
              <div className="flex items-center gap-2 text-xs font-medium text-surface-container-lowest">
                <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
                  flight
                </span>
                <span>Canlı Uçuş Senkronizasyonu</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-surface-container-lowest">
                <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
                  key
                </span>
                <span>Doğrudan Vale & Anahtar Teslimi</span>
              </div>
            </div>
          </div>

          {/* Banner 2: Clean Drive & Elektrik Kulübü */}
          <div className="relative rounded-2xl overflow-hidden bg-tertiary text-on-tertiary p-6 sm:p-8 flex flex-col justify-between min-h-[340px] shadow-xl border border-tertiary-container/30">
            <div className="absolute inset-0 bg-gradient-to-r from-tertiary via-tertiary/90 to-transparent z-0"></div>
            <div className="relative z-10 space-y-3 max-w-md">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-tertiary-fixed text-on-tertiary-fixed uppercase tracking-wider inline-block">
                Morent Clean Drive
              </span>
              <h3 className="text-2xl font-bold text-surface-container-lowest font-headline leading-tight">
                Morent Elektrik Kulübü ile Sınırsız Süperşarj
              </h3>
              <p className="text-inverse-on-surface/90 text-sm leading-relaxed">
                Tesla Supercharger, ZES ve Trugo istasyonlarında sıfır şarj masrafı. Uzun süreli kiralamalarda özel mobil wallbox kitiyle %100 yeşil ve kesintisiz sürüş keyfi.
              </p>
            </div>
            <div className="relative z-10 pt-6 flex items-center justify-between border-t border-on-tertiary/10 mt-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-tertiary-fixed">
                <span className="material-symbols-outlined text-[20px]">energy_savings_leaf</span>
                <span>%100 Karbon Nötr Sürüş</span>
              </div>
              <Link
                href="/vehicles?fuelType=Elektrik"
                className="px-4 py-2 rounded-xl bg-surface-container-lowest text-tertiary text-xs sm:text-sm font-bold shadow hover:bg-surface-container-low transition-colors"
              >
                Elektrikli Filoyu İncele
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUE PROPOSITION: WHY CHOOSE MORENT */}
      <section className="w-full bg-surface-container-low py-16 sm:py-20 border-y border-surface-container-high/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 pb-12">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              Ayrıcalıklı Standart
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-background font-headline tracking-tight">
              Sürtünmesiz Mobilite İçin Yeniden Tasarlandı
            </h2>
            <p className="text-sm text-on-surface-variant">
              Geleneksel araç kiralamanın tüm yıpratıcı aşamalarını eledik: evrak kalabalığı, sürpriz ücretler ve belirsizlik geride kaldı.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container-high/60 flex flex-col space-y-3">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[26px]">receipt_long</span>
              </div>
              <h3 className="text-base font-bold text-on-surface font-headline pt-1">
                Şeffaf ve Net Fiyat
              </h3>
              <p className="text-xs leading-relaxed text-on-surface-variant">
                Gördüğünüz fiyat ödeyeceğiniz son fiyattır. Temel sigorta, otoyol bandrolü ve yerel vergiler baştan net bir şekilde hesaplanır.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container-high/60 flex flex-col space-y-3">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[26px]">directions_car</span>
              </div>
              <h3 className="text-base font-bold text-on-surface font-headline pt-1">
                %100 Model Garantisi
              </h3>
              <p className="text-xs leading-relaxed text-on-surface-variant">
                &quot;Veya benzeri&quot; muğlaklığına yer yok. Seçtiğiniz kasa, renk ve donanım paketi neyse tam olarak o aracı teslim alırsınız.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container-high/60 flex flex-col space-y-3">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[26px]">nfc</span>
              </div>
              <h3 className="text-base font-bold text-on-surface font-headline pt-1">
                Anında Dijital Kilit
              </h3>
              <p className="text-xs leading-relaxed text-on-surface-variant">
                Aracınızın park alanına yürüyün. Telefonunuzdaki dijital anahtar ile kapıları Bluetooth üzerinden anında açarak yolunuza devam edin.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container-high/60 flex flex-col space-y-3">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[26px]">support_agent</span>
              </div>
              <h3 className="text-base font-bold text-on-surface font-headline pt-1">
                7/24 VIP Asistan
              </h3>
              <p className="text-xs leading-relaxed text-on-surface-variant">
                Uygulama üzerinden 30 saniye içinde gerçek müşteri temsilcinize bağlanın. Türkiye genelinde öncelikli acil yol yardım güvencesi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS & PRESS RECOGNITION */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10">
          <div className="space-y-1.5">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              Doğrulanmış Sürücü Hikayeleri
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-background font-headline tracking-tight">
              28,000+ Sürücünün Tercihi
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-secondary-container">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <span className="text-sm font-bold text-on-surface font-mono">4.94 Ortalama Puan</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container-high/60 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex text-secondary-container">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-on-surface leading-relaxed italic">
                &quot;Morent iş seyahatlerimi tamamen değiştirdi. Uçaktan inip hiç sıra beklemeden tertemiz bir Porsche Taycan&apos;a geçmek kritik toplantım öncesi inanılmaz rahatlık sağladı.&quot;
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center font-bold text-primary text-sm">
                ER
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">Elena Rostova</span>
                <span className="text-[11px] text-outline">Porsche Taycan 4S • İstanbul VIP</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container-high/60 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex text-secondary-container">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-on-surface leading-relaxed italic">
                &quot;Model garantisi çok önemli bir detay. Başka firmalarda hep sürpriz muadil araç verilirken Morent seçtiğim BMW M4 Competition&apos;ı birebir hazır tutmuştu.&quot;
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center font-bold text-secondary text-sm">
                MV
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">Marcus Vance</span>
                <span className="text-[11px] text-outline">BMW M4 Competition • Maslak</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container-high/60 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex text-secondary-container">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-on-surface leading-relaxed italic">
                &quot;Bodrum tatili için Range Rover Velar kiraladık. Araç kusursuz temizlikteydi, çocuk koltuğu monte edilmiş şekilde karşılandık. Dijital iade 30 saniye sürdü.&quot;
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-tertiary-container/10 flex items-center justify-center font-bold text-tertiary text-sm">
                SD
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">Selin Demir</span>
                <span className="text-[11px] text-outline">Range Rover Velar • Bodrum Marina</span>
              </div>
            </div>
          </div>
        </div>

        {/* Press Logos */}
        <div className="pt-12 flex flex-wrap items-center justify-around gap-6 opacity-60 grayscale hover:grayscale-0 transition-all text-xs font-extrabold tracking-widest text-on-surface-variant font-headline">
          <span>BLOOMBERG</span>
          <span>FORBES AUTOS</span>
          <span>WIRED</span>
          <span>TOP GEAR</span>
          <span>FAST COMPANY</span>
        </div>
      </section>

      {/* 6. MOBILE APP & FINAL CTA BANNER */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative rounded-3xl bg-primary-container text-on-primary overflow-hidden shadow-2xl p-8 sm:p-12">
          {/* Ambient rings */}
          <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-on-primary/10 text-surface-container-lowest text-xs font-medium backdrop-blur-md">
                <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">
                  lock_open
                </span>
                <span>Anahtarsız Dijital Mobilite</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-surface-container-lowest leading-tight font-headline">
                Yolculuğunuzun Tüm Kontrolünü Cebinize Taşıyın
              </h2>

              <p className="text-on-primary-container text-sm sm:text-base max-w-xl leading-relaxed">
                60 saniyede rezervasyon yapın, şifrelenmiş dijital anahtarla kapıları açın, şarj durumunu anlık kontrol edin ve seyahatinizi dilediğiniz gibi uzatın.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-all shadow-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[28px] text-on-surface">
                    download
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase font-bold text-outline leading-none">
                      İndirin
                    </span>
                    <span className="text-xs sm:text-sm font-bold leading-tight">
                      Apple App Store
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-all shadow-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[28px] text-on-surface">
                    play_arrow
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase font-bold text-outline leading-none">
                      Edinin
                    </span>
                    <span className="text-xs sm:text-sm font-bold leading-tight">
                      Google Play
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Phone App UI Mockup Graphic */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-64 sm:w-72 aspect-[9/18] rounded-3xl p-3 bg-inverse-surface shadow-2xl flex flex-col justify-between border-4 border-inverse-on-surface/20">
                <div className="w-full h-full bg-surface-container-lowest rounded-2xl p-4 flex flex-col justify-between text-on-surface">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-container-high/60">
                    <span className="text-xs font-bold font-mono">09:41</span>
                    <div className="flex items-center gap-1 text-primary">
                      <span className="material-symbols-outlined text-[16px]">
                        battery_charging_full
                      </span>
                      <span className="text-[10px] font-bold">100%</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-outline uppercase tracking-wider">
                      Aktif Rezervasyon
                    </span>
                    <h4 className="text-sm font-bold leading-tight font-headline">
                      Porsche Taycan 4S
                    </h4>
                    <span className="text-[11px] text-tertiary font-bold">
                      Batarya: %98 (440 km)
                    </span>
                  </div>

                  {/* Digital Car in app */}
                  <div className="w-full h-28 rounded-xl bg-surface-container-low flex items-center justify-center relative overflow-hidden p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={heroCarImage}
                      alt="Porsche Taycan in App"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Unlock Digital Button */}
                  <div className="space-y-2">
                    <div className="w-full py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center justify-center gap-1.5 shadow-md">
                      <span className="material-symbols-outlined text-[16px]">lock_open</span>
                      <span>Kaydırarak Kilidi Aç</span>
                    </div>
                    <div className="flex items-center justify-around text-outline text-[10px] pt-1">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">ac_unit</span> Klima
                        21°
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">volume_up</span> Korna
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
