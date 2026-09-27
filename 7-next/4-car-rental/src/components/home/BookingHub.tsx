'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LOCATIONS = [
  'İstanbul Havalimanı (IST) - VIP Vale',
  'Sabiha Gökçen Havalimanı (SAW) - Hızlı Teslim',
  'İstanbul, Beşiktaş / Bebek Ofisi',
  'İstanbul, Maslak Finans Merkezi',
  'İzmir, Çeşme / Alaçatı Teslimat',
  'Muğla, Bodrum Marina / Yalıkavak',
  'Ankara, Çankaya VIP Noktası',
  'Antalya, Lara Havalimanı Karşılama',
];

const CATEGORY_TABS = [
  { id: '', label: 'Tüm Araçlar' },
  { id: 'Sedan', label: 'Sedan' },
  { id: 'SUV', label: 'Lüks SUV & 4x4' },
  { id: 'Spor', label: 'Yüksek Spor' },
  { id: 'Elektrikli', label: '100% Elektrikli', isElectric: true },
];

export default function BookingHub() {
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState('');
  const [sameLocation, setSameLocation] = useState(true);
  const [pickupLocation, setPickupLocation] = useState(LOCATIONS[0]);
  const [pickupDate, setPickupDate] = useState('2026-10-01');
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnDate, setReturnDate] = useState('2026-10-04');
  const [returnTime, setReturnTime] = useState('16:00');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeCategory) params.set('category', activeCategory);
    router.push(`/vehicles?${params.toString()}`);
  };

  return (
    <div className="mt-8 sm:mt-12 p-4 sm:p-6 lg:p-8 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-2xl shadow-2xl text-on-surface border border-surface-container-high/60 relative z-20">
      {/* Quick Category Selectors */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-surface-container-high/60">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id || 'all'}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-primary-container text-on-primary shadow-md'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {tab.isElectric && (
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    bolt
                  </span>
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-on-surface-variant">
          <input
            type="checkbox"
            checked={sameLocation}
            onChange={(e) => setSameLocation(e.target.checked)}
            className="w-4 h-4 rounded accent-primary cursor-pointer"
          />
          <span>Aynı lokasyonda teslim et</span>
        </label>
      </div>

      {/* Booking Form Grid */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 items-center pt-5">
        {/* Pick-up Location */}
        <div className="lg:col-span-4 p-3 bg-surface-container-low rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary-container shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">location_on</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-outline">
              Alış Lokasyonu
            </label>
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="bg-transparent text-xs sm:text-sm text-on-surface font-semibold focus:outline-none cursor-pointer truncate"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc} className="bg-surface-container-lowest text-on-surface">
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pick-up Date & Time */}
        <div className="lg:col-span-3 p-3 bg-surface-container-low rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary-container shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-outline">
              Alış Tarihi & Saati
            </label>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface">
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer w-28 text-xs font-mono"
              />
              <span className="text-outline">•</span>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Return Date & Time */}
        <div className="lg:col-span-3 p-3 bg-surface-container-low rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary-container shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">event_repeat</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-outline">
              İade Tarihi & Saati
            </label>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface">
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer w-28 text-xs font-mono"
              />
              <span className="text-outline">•</span>
              <input
                type="time"
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Submit CTA */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            className="w-full h-14 rounded-xl bg-primary-container hover:bg-primary text-on-primary text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
            <span>Araçları Bul</span>
          </button>
        </div>
      </form>
    </div>
  );
}
