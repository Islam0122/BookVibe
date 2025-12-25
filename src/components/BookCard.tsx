import React from 'react';
import { Download, BookOpen, Eye } from 'lucide-react';
import type { Book } from "../types/book";

interface BookCardProps {
  book: Book;
  onRead: (book: Book) => void;
  onDownload: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onRead, onDownload }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Изображение обложки */}
      <div className="relative h-72 bg-gradient-to-br from-orange-100 to-orange-50">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-contain p-4"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/400x500?text=No+Cover';
          }}
        />
      </div>

      {/* Контент карточки */}
      <div className="p-5 text-left">
        <h3 className="text-base font-semibold text-gray-900 mb-3 min-h-[3rem] line-clamp-2">
          {book.title}
        </h3>

        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="line-clamp-1">{book.author}</span>
        </div>

        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{book.year}</span>
        </div>

        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <Eye size={16} color="green" />
          <span>{book.views.toLocaleString()} Просмотров</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onRead(book)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <BookOpen size={18} />
            Читать
          </button>
          <button
            onClick={() => onDownload(book)}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <Download size={18} />
            Скачать
          </button>
        </div>
      </div>
    </div>
  );
};