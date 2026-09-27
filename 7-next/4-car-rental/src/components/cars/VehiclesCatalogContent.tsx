'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ICar, PaginationMeta } from '@/lib/types';
import CarCard from '@/components/cars/CarCard';
import FilterSidebar from '@/components/filters/FilterSidebar';
import SearchAndSortBar from '@/components/filters/SearchAndSortBar';
import Pagination from '@/components/filters/Pagination';

interface VehiclesCatalogContentProps {
  initialCars?: ICar[];
  initialPagination?: PaginationMeta;
}

export default function VehiclesCatalogContent({
  initialCars = [],
  initialPagination,
}: VehiclesCatalogContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL state initialization
  const initialCategory = searchParams.get('category')?.split(',').filter(Boolean) || [];
  const initialSearch = searchParams.get('search') || '';
  const initialSort = searchParams.get('sort') || 'popular';
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const initialTransmission = searchParams.get('transmission')?.split(',').filter(Boolean) || [];
  const initialFuelType = searchParams.get('fuelType')?.split(',').filter(Boolean) || [];
  const initialCapacity = searchParams.get('capacity')?.split(',').map(Number).filter(Boolean) || [];
  const DEFAULT_MAX_PRICE = 60000;
  const initialMaxPrice = Number(searchParams.get('maxPrice')) || DEFAULT_MAX_PRICE;
  const initialOnlyAvailable = searchParams.get('available') === 'true';

  // Component State - initialized with server-fetched data for instant display & SEO
  const [cars, setCars] = useState<ICar[]>(initialCars);
  const [pagination, setPagination] = useState<PaginationMeta>(
    initialPagination || {
      totalCars: initialCars.length,
      totalPages: 1,
      currentPage: 1,
      limit: 9,
      hasNextPage: false,
      hasPrevPage: false,
    }
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isInitialMount = useRef(true);

  // Filters State
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory);
  const [selectedCapacities, setSelectedCapacities] = useState<number[]>(initialCapacity);
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>(initialTransmission);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>(initialFuelType);
  const [maxPrice, setMaxPrice] = useState<number>(initialMaxPrice);
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(initialOnlyAvailable);

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState(initialSort);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Synchronize state with URL parameters
  const updateUrlParams = useCallback(() => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    if (selectedCategories.length > 0) params.set('category', selectedCategories.join(','));
    if (selectedCapacities.length > 0) params.set('capacity', selectedCapacities.join(','));
    if (selectedTransmissions.length > 0) params.set('transmission', selectedTransmissions.join(','));
    if (selectedFuelTypes.length > 0) params.set('fuelType', selectedFuelTypes.join(','));
    if (maxPrice < DEFAULT_MAX_PRICE) params.set('maxPrice', maxPrice.toString());
    if (onlyAvailable) params.set('available', 'true');
    if (sortBy !== 'popular') params.set('sort', sortBy);
    if (currentPage > 1) params.set('page', currentPage.toString());

    const queryString = params.toString();
    router.replace(`/vehicles${queryString ? `?${queryString}` : ''}`, { scroll: false });
  }, [
    searchQuery,
    selectedCategories,
    selectedCapacities,
    selectedTransmissions,
    selectedFuelTypes,
    maxPrice,
    onlyAvailable,
    sortBy,
    currentPage,
    router,
    DEFAULT_MAX_PRICE,
  ]);

  // Fetch cars from API
  const fetchCars = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.set('search', searchQuery.trim());
      if (selectedCategories.length > 0) params.set('category', selectedCategories.join(','));
      if (selectedCapacities.length > 0) params.set('capacity', selectedCapacities.join(','));
      if (selectedTransmissions.length > 0) params.set('transmission', selectedTransmissions.join(','));
      if (selectedFuelTypes.length > 0) params.set('fuelType', selectedFuelTypes.join(','));
      if (maxPrice < DEFAULT_MAX_PRICE) params.set('maxPrice', maxPrice.toString());
      if (onlyAvailable) params.set('available', 'true');
      params.set('sort', sortBy);
      params.set('page', currentPage.toString());
      params.set('limit', '9');

      const res = await fetch(`/api/cars?${params.toString()}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Araçlar yüklenirken bir hata oluştu');
      }

      setCars(data.cars || []);
      setPagination(
        data.pagination || {
          totalCars: data.cars?.length || 0,
          totalPages: 1,
          currentPage: 1,
          limit: 9,
          hasNextPage: false,
          hasPrevPage: false,
        }
      );
    } catch (err: unknown) {
      console.error('Fetch vehicles error:', err);
      setError(err instanceof Error ? err.message : 'Araçlar listelenemedi');
    } finally {
      setLoading(false);
    }
  }, [
    searchQuery,
    selectedCategories,
    selectedCapacities,
    selectedTransmissions,
    selectedFuelTypes,
    maxPrice,
    onlyAvailable,
    sortBy,
    currentPage,
  ]);

  // Trigger fetch and URL update on filter changes after initial mount
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    fetchCars();
    updateUrlParams();
  }, [fetchCars, updateUrlParams]);

  // Filter Toggle Handlers
  const handleToggleCategory = (cat: string) => {
    setCurrentPage(1);
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleToggleCapacity = (cap: number) => {
    setCurrentPage(1);
    setSelectedCapacities((prev) =>
      prev.includes(cap) ? prev.filter((c) => c !== cap) : [...prev, cap]
    );
  };

  const handleToggleTransmission = (t: string) => {
    setCurrentPage(1);
    setSelectedTransmissions((prev) =>
      prev.includes(t) ? prev.filter((item) => item !== t) : [...prev, t]
    );
  };

  const handleToggleFuelType = (f: string) => {
    setCurrentPage(1);
    setSelectedFuelTypes((prev) =>
      prev.includes(f) ? prev.filter((item) => item !== f) : [...prev, f]
    );
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedCapacities([]);
    setSelectedTransmissions([]);
    setSelectedFuelTypes([]);
    setMaxPrice(DEFAULT_MAX_PRICE);
    setOnlyAvailable(false);
    setSearchQuery('');
    setSortBy('popular');
    setCurrentPage(1);
  };

  const activeFilterCount =
    selectedCategories.length +
    selectedCapacities.length +
    selectedTransmissions.length +
    selectedFuelTypes.length +
    (maxPrice < DEFAULT_MAX_PRICE ? 1 : 0) +
    (onlyAvailable ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 md:py-8 space-y-6">
      {/* Top Breadcrumb & Catalog Title */}
      <section className="space-y-3">
        <nav className="flex items-center gap-2 text-xs font-semibold text-outline">
          <Link href="/" className="hover:text-primary transition-colors">
            Ana Sayfa
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-on-surface">Araç Filosu</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-primary text-xs font-bold uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-primary animate-ping"></span>
              Canlı Filo Envanteri
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight font-headline">
              Seçkin Filomuzdaki Lüks Araçları Keşfedin
            </h1>
            <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed">
              Titizlikle bakımı yapılmış spor otomobiller, prestijli yönetici sedanları ve son teknoloji elektrikli araçlar.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-surface-container-lowest shadow-sm rounded-xl px-3.5 py-2.5 border border-surface-container-high">
              <span className="material-symbols-outlined text-emerald-600 text-[20px]">
                verified
              </span>
              <div className="text-left">
                <p className="text-[10px] text-outline uppercase font-semibold leading-none">
                  Ekspertiz
                </p>
                <p className="text-xs font-bold text-on-surface mt-0.5">120-Nokta Kontrollü</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-lowest shadow-sm rounded-xl px-3.5 py-2.5 border border-surface-container-high">
              <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
              <div className="text-left">
                <p className="text-[10px] text-outline uppercase font-semibold leading-none">
                  Teslimat
                </p>
                <p className="text-xs font-bold text-on-surface mt-0.5">Temassız FastPass™</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Browsing Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Filter Sidebar */}
        <FilterSidebar
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
          selectedCapacities={selectedCapacities}
          onToggleCapacity={handleToggleCapacity}
          selectedTransmissions={selectedTransmissions}
          onToggleTransmission={handleToggleTransmission}
          selectedFuelTypes={selectedFuelTypes}
          onToggleFuelType={handleToggleFuelType}
          maxPrice={maxPrice}
          onChangeMaxPrice={(p) => {
            setCurrentPage(1);
            setMaxPrice(p);
          }}
          onlyAvailable={onlyAvailable}
          onToggleOnlyAvailable={() => {
            setCurrentPage(1);
            setOnlyAvailable((prev) => !prev);
          }}
          onClearAll={handleClearAll}
          isMobileOpen={mobileFiltersOpen}
          onCloseMobile={() => setMobileFiltersOpen(false)}
        />

        {/* Right Column: Fleet Grid & Controls */}
        <main className="lg:col-span-9 space-y-5">
          {/* Search, Sort, View Controls Bar */}
          <SearchAndSortBar
            searchQuery={searchQuery}
            onSearchChange={(q) => {
              setCurrentPage(1);
              setSearchQuery(q);
            }}
            sortBy={sortBy}
            onSortChange={(s) => {
              setCurrentPage(1);
              setSortBy(s);
            }}
            totalCars={pagination.totalCars}
            currentCount={cars.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onOpenMobileFilters={() => setMobileFiltersOpen(true)}
            activeFilterCount={activeFilterCount}
          />

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-error-container text-on-error-container text-xs font-medium flex items-center justify-between">
              <span>{error}</span>
              <button
                type="button"
                onClick={() => fetchCars()}
                className="underline font-bold cursor-pointer ml-4"
              >
                Yeniden Dene
              </button>
            </div>
          )}

          {/* Vehicles Cards Grid / List */}
          {loading ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'
                  : 'space-y-4'
              }
            >
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-lowest rounded-2xl p-5 border border-surface-container-high animate-pulse space-y-4 shadow-sm"
                >
                  <div className="h-4 bg-surface-container-high rounded w-1/3"></div>
                  <div className="h-6 bg-surface-container-high rounded w-3/4"></div>
                  <div className="h-44 bg-surface-container-low rounded-xl"></div>
                  <div className="grid grid-cols-4 gap-1.5">
                    <div className="h-10 bg-surface-container-low rounded-lg"></div>
                    <div className="h-10 bg-surface-container-low rounded-lg"></div>
                    <div className="h-10 bg-surface-container-low rounded-lg"></div>
                    <div className="h-10 bg-surface-container-low rounded-lg"></div>
                  </div>
                  <div className="h-10 bg-surface-container-high rounded-xl mt-3"></div>
                </div>
              ))}
            </div>
          ) : cars.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-surface-container-high space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mx-auto text-outline">
                <span className="material-symbols-outlined text-[32px]">no_crash</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-on-surface font-headline">
                  Kriterlerinize Uygun Araç Bulunamadı
                </h3>
                <p className="text-xs text-outline max-w-md mx-auto">
                  Arama kelimesini değiştirmeyi veya seçili filtreleri temizlemeyi deneyin.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClearAll}
                className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-all cursor-pointer shadow"
              >
                Tüm Filtreleri Temizle
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'
                  : 'space-y-4'
              }
            >
              {cars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          )}

          {/* Numbered Pagination Bar */}
          {pagination.totalPages > 1 && (
            <div className="pt-6">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
