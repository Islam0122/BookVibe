import React, { useState, useEffect } from 'react';
import { BookCard } from '../components/BookCard';
import { SearchBar } from '../components/SearchBar';
import type { Book } from '../types/book.ts';
import { fetchBooks, searchBooks, downloadBook } from '../api/booksApi';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

interface BooksPageProps {
  onBookSelect: (book: Book) => void;
}

export const BooksPage: React.FC<BooksPageProps> = ({ onBookSelect }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const loadBooks = async (page: number, query: string = '') => {
    try {
      setLoading(true);
      setError(null);

      const result = query
        ? await searchBooks(query, page)
        : await fetchBooks(page);

      setBooks(result.books);
      setHasMore(result.hasMore);
      setTotal(result.total);
    } catch (err) {
      setError('Ошибка при загрузке книг. Пожалуйста, попробуйте позже.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks(1);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    loadBooks(1, query);
  };

  const handleRead = (book: Book) => {
    if (book.readUrl) {
      onBookSelect(book);
    }
  };

  const handleDownload = async (book: Book) => {
    if (book.downloadUrl) {
      try {
        await downloadBook(book.downloadUrl, book.title);
      } catch (err) {
        alert('Ошибка при скачивании книги');
      }
    }
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    loadBooks(nextPage, searchQuery);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    loadBooks(prevPage, searchQuery);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BookVibe
            </h1>
            <div className="text-sm text-gray-600">
              Project Gutenberg Library
            </div>
          </div>

          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="animate-spin h-16 w-16 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Загрузка книг...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Ошибка
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => loadBooks(currentPage, searchQuery)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Попробовать снова
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {searchQuery
                  ? `Результаты поиска: "${searchQuery}" (${total} книг)`
                  : `Все книги (${total} всего)`
                }
              </h2>
              <div className="text-gray-600">
                Страница {currentPage}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  onRead={handleRead}
                  onDownload={handleDownload}
                />
              ))}
            </div>

            {books.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Книги не найдены
                </h3>
                <p className="text-gray-600">
                  Попробуйте изменить поисковый запрос
                </p>
              </div>
            )}

            {books.length > 0 && (
              <div className="mt-12 flex justify-center items-center gap-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} />
                  Назад
                </button>

                <span className="text-gray-700 font-semibold">
                  Страница {currentPage}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={!hasMore}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Вперед
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </main>

    </div>
  );
};