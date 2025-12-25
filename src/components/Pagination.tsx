import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  hasMore: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  hasMore,
  onPrevious,
  onNext
}) => {
  return (
    <div className="mt-12 flex justify-center items-center gap-4">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors"
      >
        <ChevronLeft size={20} />
        Назад
      </button>

      <span className="text-gray-700 font-semibold px-4">
        Страница {currentPage}
      </span>

      <button
        onClick={onNext}
        disabled={!hasMore}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors"
      >
        Вперед
        <ChevronRight size={20} />
      </button>
    </div>
  );
};