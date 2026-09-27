import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getVehicles, VehicleFilterParams } from '@/lib/vehicles';
import VehiclesCatalogContent from '@/components/cars/VehiclesCatalogContent';

export const metadata: Metadata = {
  title: 'Lüks Araç Filosu | Morent',
  description:
    'En seçkin sedan, SUV, spor ve elektrikli araçları en uygun fiyatlarla inceleyin ve hemen kiralayın. %100 model garantisi ve temassız teslimat.',
};

interface VehiclesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * VehiclesPage - React Server Component
 * Pre-fetches vehicle catalog on the server based on URL query parameters.
 * Eliminates client-side fetch delays and ensures full SEO search engine indexing.
 */
export default async function VehiclesPage({ searchParams }: VehiclesPageProps) {
  const resolvedParams = await searchParams;

  // Normalize search parameters for direct server DB query
  const filterParams: VehicleFilterParams = {};
  for (const [key, value] of Object.entries(resolvedParams)) {
    if (typeof value === 'string') {
      filterParams[key as keyof VehicleFilterParams] = value;
    } else if (Array.isArray(value)) {
      filterParams[key as keyof VehicleFilterParams] = value.join(',');
    }
  }

  const { cars, pagination } = await getVehicles(filterParams);

  return (
    <Suspense>
      <VehiclesCatalogContent initialCars={cars} initialPagination={pagination} />
    </Suspense>
  );
}
