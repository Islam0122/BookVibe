export interface Author {
  name: string;
  birth_year: number | null;
  death_year: number | null;
}

export interface Formats {
  'text/html'?: string;
  'application/epub+zip'?: string;
  'application/x-mobipocket-ebook'?: string;
  'application/rdf+xml'?: string;
  'image/jpeg'?: string;
  'text/plain; charset=us-ascii'?: string;
  'application/octet-stream'?: string;
  [key: string]: string | undefined;
}

export interface GutendexBook {
  id: number;
  title: string;
  authors: Author[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean | null;
  media_type: string;
  formats: Formats;
  download_count: number;
}

export interface GutendexResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GutendexBook[];
}

export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  pages: number;
  views: number;
  year: number;
  language: string;
  downloadUrl?: string;
  readUrl?: string;
  subjects: string[];
  formats: Formats;
}