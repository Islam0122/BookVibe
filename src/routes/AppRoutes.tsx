import React, { useState } from 'react';
import { BooksPage } from '../pages/BooksPage';
import { BookDetailPage } from '../pages/BookDetailPage';
import { Book } from '../types/book';

export const AppRoutes: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseBook = () => {
    setSelectedBook(null);
  };

  return (
    <>
      {selectedBook ? (
        <BookDetailPage book={selectedBook} onClose={handleCloseBook} />
      ) : (
        <BooksPage onBookSelect={handleBookSelect} />
      )}
    </>
  );
};