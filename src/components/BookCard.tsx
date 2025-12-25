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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative h-64 bg-gradient-to-br from-purple-100 to-blue-100">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/400x500?text=No+Cover';
          }}
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          {book.language}
        </div>

        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <Eye size={14} />
          {book.views.toLocaleString()}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2 min-h-[3.5rem]">
          {book.title}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-1">{book.author}</p>

        {/* Темы/Категории */}
        {book.subjects.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {book.subjects.slice(0, 2).map((subject, index) => (
              <span
                key={index}
                className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
              >
                {subject.split('--')[0].trim()}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>{book.year}</span>
          <span>{book.views} загрузок</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onRead(book)}
            disabled={!book.readUrl}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <BookOpen size={18} />
            Читать
          </button>
          <button
            onClick={() => onDownload(book)}
            disabled={!book.downloadUrl}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Download size={18} />
            Скачать
          </button>
        </div>
      </div>
    </div>
  );
};