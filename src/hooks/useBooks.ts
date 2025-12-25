import { useState, useEffect, useCallback } from 'react';
import { Book } from '../types/book';
import { fetchBooks, searchBooks, fetchBooksByLanguage } from '../api/booksApi';

interface UseBooksResult {
  books: Book[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
  total: number;
  loadBooks: (page: number, query?: string, language?: string) => Promise<void>;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
}

export const useBooks = (initialPage: number = 1): UseBooksResult => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const loadBooks = useCallback(async (
    page: number,
    query?: string,
    language?: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      let result;

      if (query) {
        result = await searchBooks(query, page);
      } else if (language) {
        result = await fetchBooksByLanguage(language, page);
      } else {
        result = await fetchBooks(page);
      }

      setBooks(result.books);
      setHasMore(result.hasMore);
      setTotal(result.total);
    } catch (err) {
      setError('Ошибка при загрузке книг. Пожалуйста, попробуйте позже.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const nextPage = useCallback(() => {
    if (hasMore) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, hasMore]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    loadBooks(initialPage);
  }, []);

  return {
    books,
    loading,
    error,
    currentPage,
    hasMore,
    total,
    loadBooks,
    nextPage,
    prevPage,
    setPage,
  };
};