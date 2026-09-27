'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all border border-surface-container-high bg-surface-container-lowest text-on-surface hover:bg-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        type="button"
      >
        <span className="material-symbols-outlined text-[16px]">chevron_left</span>
        <span className="hidden sm:inline">Önceki</span>
      </button>

      {/* Number Buttons */}
      {getPages().map((p, idx) => {
        if (p === '...') {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="px-2 py-1 text-xs text-outline select-none font-mono"
            >
              ...
            </span>
          );
        }

        const pageNum = Number(p);
        const isActive = pageNum === currentPage;

        return (
          <button
            key={`page-${pageNum}`}
            onClick={() => onPageChange(pageNum)}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center font-mono cursor-pointer ${
              isActive
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-lowest border border-surface-container-high text-on-surface hover:bg-surface-container-low'
            }`}
            type="button"
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all border border-surface-container-high bg-surface-container-lowest text-on-surface hover:bg-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        type="button"
      >
        <span className="hidden sm:inline">Sonraki</span>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
      </button>
    </div>
  );
}
