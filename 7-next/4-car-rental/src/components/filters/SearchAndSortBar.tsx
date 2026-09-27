'use client';

import React from 'react';

interface SearchAndSortBarProps {
  totalCars: number;
  currentCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onOpenMobileFilters: () => void;
  activeFilterCount: number;
}

export default function SearchAndSortBar({
  totalCars,
  currentCount,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onOpenMobileFilters,
  activeFilterCount,
}: SearchAndSortBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-sm border border-surface-container-high/60">
      {/* Left: Search input & Available Count */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 max-w-md">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Marka veya model ile ara..."
            className="w-full h-10 pl-9 pr-8 bg-surface-container-low rounded-xl text-xs sm:text-sm text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-xs text-outline shrink-0">
          <span className="font-bold text-on-surface font-mono">{currentCount}</span>
          <span>/</span>
          <span className="font-bold text-on-surface font-mono">{totalCars}</span>
          <span>araç</span>
        </div>
      </div>

      {/* Right: Mobile Filter Button, Sort Dropdown & View Mode Switcher */}
      <div className="flex items-center gap-2.5 justify-between sm:justify-end">
        {/* Mobile Filter Trigger Button */}
        <button
          onClick={onOpenMobileFilters}
          className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-surface-container-low hover:bg-surface-container rounded-xl text-xs font-bold text-on-surface transition-colors cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px] text-primary">tune</span>
          <span>Filtreler</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[10px] flex items-center justify-center font-bold font-mono">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 bg-surface-container-low rounded-xl px-3 py-2">
          <span className="material-symbols-outlined text-outline text-[18px]">swap_vert</span>
          <label className="text-xs text-outline hidden md:inline">Sırala:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-transparent text-xs font-bold text-on-surface focus:outline-none cursor-pointer"
          >
            <option value="popular">Öne Çıkanlar (Varsayılan)</option>
            <option value="price_asc">Fiyat: Düşükten Yükseğe</option>
            <option value="price_desc">Fiyat: Yüksekten Düşüğe</option>
            <option value="rating">En Yüksek Müşteri Puanı</option>
            <option value="newest">En Yeni Model Araçlar</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-surface-container-low p-1 rounded-xl shrink-0">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-outline hover:text-on-surface'
            }`}
            title="Izgara Görünümü"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">grid_view</span>
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === 'list'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-outline hover:text-on-surface'
            }`}
            title="Liste Görünümü"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">view_list</span>
          </button>
        </div>
      </div>
    </div>
  );
}
