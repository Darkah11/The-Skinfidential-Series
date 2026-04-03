"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Logic for [3 left] ... [2 right]
    // We want 3 buttons that "follow" the current page
    let leftStart = Math.max(1, currentPage - 1);
    let leftEnd = leftStart + 2;

    // Adjust if we're at the very end
    if (leftEnd >= totalPages - 1) {
      leftEnd = totalPages;
      leftStart = Math.max(1, leftEnd - 4); // Show 5 buttons at the end
      return Array.from({ length: leftEnd - leftStart + 1 }, (_, i) => leftStart + i);
    }

    // If we're at the beginning
    if (leftStart <= 2) {
      leftStart = 1;
      leftEnd = 3;
    }

    const leftPages = Array.from(
      { length: leftEnd - leftStart + 1 },
      (_, i) => leftStart + i
    );
    const rightPages = [totalPages - 1, totalPages];

    // Since we already handled the "close to end" case above, 
    // there should always be a gap here.
    return [...leftPages, "...", ...rightPages];
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <span className="px-2 text-gray-400">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`flex items-center justify-center w-10 h-10 rounded-xl font-medium transition-all ${
                currentPage === page
                  ? "bg-primary-100 text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-primary-100 hover:text-primary-100"
              }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
