import type { GutendexResponse, GutendexBook, Book } from '../types/book';

const BASE_URL = 'https://gutendex.com/books';

export const transformGutendexBook = (book: GutendexBook): Book => {
  const authorName = book.authors.length > 0
    ? book.authors[0].name
    : 'Unknown Author';

  const authorYear = book.authors.length > 0 && book.authors[0].birth_year
    ? book.authors[0].birth_year
    : 1900;

  const cover = book.formats['image/jpeg'] ||
                'https://via.placeholder.com/400x500?text=No+Cover';

  const readUrl = book.formats['text/html'] ||
                  book.formats['text/plain; charset=us-ascii'] ||
                  '';

  const downloadUrl = book.formats['application/epub+zip'] ||
                      book.formats['application/x-mobipocket-ebook'] ||
                      book.formats['text/plain; charset=us-ascii'] ||
                      '';

  const languageMap: { [key: string]: string } = {
    'en': 'English',
    'fr': 'Français',
    'de': 'Deutsch',
    'es': 'Español',
    'it': 'Italiano',
    'ru': 'Русский',
    'pt': 'Português',
    'zh': '中文',
    'ja': '日本語'
  };

  const language = book.languages.length > 0
    ? languageMap[book.languages[0]] || book.languages[0]
    : 'Unknown';

  return {
    id: book.id,
    title: book.title,
    author: authorName,
    cover,
    pages: 0,
    views: book.download_count,
    year: authorYear,
    language,
    downloadUrl,
    readUrl,
    subjects: book.subjects,
    formats: book.formats
  };
};

export const fetchBooks = async (page: number = 1): Promise<{ books: Book[], hasMore: boolean, total: number }> => {
  try {
    const response = await fetch(`${BASE_URL}?page=${page}`);

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const data: GutendexResponse = await response.json();

    const books = data.results.map(transformGutendexBook);

    return {
      books,
      hasMore: data.next !== null,
      total: data.count
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const searchBooks = async (
  query: string,
  page: number = 1
): Promise<{ books: Book[], hasMore: boolean, total: number }> => {
  try {
    const response = await fetch(`${BASE_URL}?search=${encodeURIComponent(query)}&page=${page}`);

    if (!response.ok) {
      throw new Error('Failed to search books');
    }

    const data: GutendexResponse = await response.json();

    const books = data.results.map(transformGutendexBook);

    return {
      books,
      hasMore: data.next !== null,
      total: data.count
    };
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

export const fetchBookById = async (id: number): Promise<Book | null> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch book');
    }

    const data: GutendexBook = await response.json();

    return transformGutendexBook(data);
  } catch (error) {
    console.error('Error fetching book:', error);
    return null;
  }
};

export const fetchBooksByLanguage = async (
  language: string,
  page: number = 1
): Promise<{ books: Book[], hasMore: boolean, total: number }> => {
  try {
    const response = await fetch(`${BASE_URL}?languages=${language}&page=${page}`);

    if (!response.ok) {
      throw new Error('Failed to fetch books by language');
    }

    const data: GutendexResponse = await response.json();

    const books = data.results.map(transformGutendexBook);

    return {
      books,
      hasMore: data.next !== null,
      total: data.count
    };
  } catch (error) {
    console.error('Error fetching books by language:', error);
    throw error;
  }
};

export const fetchBooksByTopic = async (
  topic: string,
  page: number = 1
): Promise<{ books: Book[], hasMore: boolean, total: number }> => {
  try {
    const response = await fetch(`${BASE_URL}?topic=${encodeURIComponent(topic)}&page=${page}`);

    if (!response.ok) {
      throw new Error('Failed to fetch books by topic');
    }

    const data: GutendexResponse = await response.json();

    const books = data.results.map(transformGutendexBook);

    return {
      books,
      hasMore: data.next !== null,
      total: data.count
    };
  } catch (error) {
    console.error('Error fetching books by topic:', error);
    throw error;
  }
};

export const downloadBook = async (downloadUrl: string, title: string): Promise<void> => {
  try {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${title}.epub`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading book:', error);
    throw error;
  }
};

export const fetchPopularBooks = async (page: number = 1): Promise<{ books: Book[], hasMore: boolean, total: number }> => {
  try {
    const response = await fetch(`${BASE_URL}?page=${page}`);

    if (!response.ok) {
      throw new Error('Failed to fetch popular books');
    }

    const data: GutendexResponse = await response.json();

    const books = data.results
      .map(transformGutendexBook)
      .sort((a, b) => b.views - a.views);

    return {
      books,
      hasMore: data.next !== null,
      total: data.count
    };
  } catch (error) {
    console.error('Error fetching popular books:', error);
    throw error;
  }
};
