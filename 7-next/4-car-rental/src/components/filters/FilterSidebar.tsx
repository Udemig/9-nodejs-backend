'use client';

import React from 'react';

interface FilterSidebarProps {
  selectedCategories: string[];
  onToggleCategory: (cat: string) => void;
  selectedCapacities: number[];
  onToggleCapacity: (cap: number) => void;
  selectedTransmissions: string[];
  onToggleTransmission: (trans: string) => void;
  selectedFuelTypes: string[];
  onToggleFuelType: (fuel: string) => void;
  maxPrice: number;
  onChangeMaxPrice: (price: number) => void;
  onlyAvailable: boolean;
  onToggleOnlyAvailable: () => void;
  onClearAll: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const CATEGORIES = [
  { id: 'Spor', label: 'Spor & Coupe', count: 12 },
  { id: 'Elektrikli', label: 'Elektrikli & Hibrit', count: 11 },
  { id: 'SUV', label: 'Lüks SUV & 4x4', count: 12 },
  { id: 'Sedan', label: 'Yönetici Sedan', count: 8 },
  { id: 'Hatchback', label: 'Kompakt Hatchback', count: 5 },
  { id: 'Van', label: 'VIP Minibüs / Van', count: 4 },
];

const CAPACITIES = [
  { value: 2, label: '2 Kişilik' },
  { value: 4, label: '4 Kişilik' },
  { value: 5, label: '5 Kişilik' },
  { value: 7, label: '7+ Kişilik' },
];

const TRANSMISSIONS = [
  { id: 'Otomatik', label: 'Otomatik' },
  { id: 'PDK', label: 'PDK Çift Kavrama' },
  { id: 'Tek Vites', label: 'Tek Vites (Elektrik)' },
  { id: 'Manuel', label: 'Manuel' },
];

const FUEL_TYPES = [
  { id: 'Elektrik', label: '100% Elektrik' },
  { id: 'Hibrit', label: 'Hibrit' },
  { id: 'Benzin', label: 'Benzin' },
  { id: 'Dizel', label: 'Dizel' },
];

export default function FilterSidebar({
  selectedCategories,
  onToggleCategory,
  selectedCapacities,
  onToggleCapacity,
  selectedTransmissions,
  onToggleTransmission,
  selectedFuelTypes,
  onToggleFuelType,
  maxPrice,
  onChangeMaxPrice,
  onlyAvailable,
  onToggleOnlyAvailable,
  onClearAll,
  isMobileOpen,
  onCloseMobile,
}: FilterSidebarProps) {
  const content = (
    <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-5 space-y-6 border border-surface-container-high/60">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">tune</span>
          <h2 className="font-bold text-on-surface font-headline text-base">Filtreler</h2>
        </div>
        <button
          onClick={onClearAll}
          className="text-xs text-primary hover:text-primary-container font-bold cursor-pointer"
          type="button"
        >
          Temizle
        </button>
      </div>

      {/* Instant Availability Toggle */}
      <div className="p-3 bg-surface-container-low rounded-xl">
        <label className="flex items-center justify-between cursor-pointer select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-on-surface">Yalnızca Müsait Araçlar</span>
          </div>
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={onToggleOnlyAvailable}
            className="w-4 h-4 rounded accent-primary-container cursor-pointer"
          />
        </label>
      </div>

      {/* Vehicle Category Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
            Araç Kategorisi
          </h3>
          <span className="text-[11px] text-outline font-medium">
            {selectedCategories.length > 0 ? `${selectedCategories.length} seçili` : 'Tümü'}
          </span>
        </div>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => {
            const isChecked = selectedCategories.includes(cat.id);
            return (
              <label
                key={cat.id}
                className="flex items-center justify-between group cursor-pointer select-none"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleCategory(cat.id)}
                    className="w-4 h-4 rounded accent-primary cursor-pointer"
                  />
                  <span
                    className={`text-xs transition-colors ${
                      isChecked ? 'font-bold text-on-surface' : 'text-on-surface-variant group-hover:text-on-surface'
                    }`}
                  >
                    {cat.label}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isChecked
                      ? 'bg-primary text-on-primary font-bold'
                      : 'bg-surface-container-low text-outline'
                  }`}
                >
                  {cat.count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Seating Capacity Filter */}
      <div className="space-y-3 pt-3 border-t border-surface-container-high/60">
        <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
          Yolcu Kapasitesi
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {CAPACITIES.map((cap) => {
            const isChecked = selectedCapacities.includes(cap.value);
            return (
              <button
                key={cap.value}
                type="button"
                onClick={() => onToggleCapacity(cap.value)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 cursor-pointer ${
                  isChecked
                    ? 'bg-primary-container text-on-primary border-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant border-transparent hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">airline_seat_recline_normal</span>
                <span>{cap.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Price Range Slider */}
      <div className="space-y-3 pt-3 border-t border-surface-container-high/60">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
            Maksimum Günlük Fiyat
          </h3>
          <span className="text-xs font-bold text-primary font-headline">
            ₺{maxPrice.toLocaleString('tr-TR')} / gün
          </span>
        </div>
        <input
          type="range"
          min="3000"
          max="60000"
          step="1000"
          value={maxPrice}
          onChange={(e) => onChangeMaxPrice(Number(e.target.value))}
          className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex items-center justify-between text-[11px] text-outline font-mono">
          <span>₺3.000</span>
          <span>₺30.000</span>
          <span>₺60.000</span>
        </div>
      </div>

      {/* Transmission Filter */}
      <div className="space-y-3 pt-3 border-t border-surface-container-high/60">
        <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
          Vites Tipi
        </h3>
        <div className="space-y-2">
          {TRANSMISSIONS.map((t) => {
            const isChecked = selectedTransmissions.includes(t.id);
            return (
              <label
                key={t.id}
                className="flex items-center gap-2.5 text-xs text-on-surface-variant cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleTransmission(t.id)}
                  className="w-4 h-4 rounded accent-primary cursor-pointer"
                />
                <span className={isChecked ? 'font-bold text-on-surface' : ''}>
                  {t.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Fuel Type Filter */}
      <div className="space-y-3 pt-3 border-t border-surface-container-high/60">
        <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
          Yakıt Türü
        </h3>
        <div className="space-y-2">
          {FUEL_TYPES.map((f) => {
            const isChecked = selectedFuelTypes.includes(f.id);
            return (
              <label
                key={f.id}
                className="flex items-center gap-2.5 text-xs text-on-surface-variant cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleFuelType(f.id)}
                  className="w-4 h-4 rounded accent-primary cursor-pointer"
                />
                <span className={isChecked ? 'font-bold text-on-surface' : ''}>
                  {f.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:col-span-3 space-y-4 sticky top-28">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-inverse-surface/60 backdrop-blur-sm"
            onClick={onCloseMobile}
          ></div>
          <div className="relative ml-auto w-full max-w-xs h-full bg-background overflow-y-auto p-4 shadow-2xl z-10">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-container-high">
              <span className="font-bold text-sm text-on-surface font-headline">Filtreleri Özelleştir</span>
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-lg hover:bg-surface-container-low text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
