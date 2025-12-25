export const formatNumber = (num: number): string => {
  return num.toLocaleString('ru-RU');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getMainAuthor = (authors: { name: string }[]): string => {
  if (authors.length === 0) return 'Unknown Author';
  return authors[0].name;
};

export const getAuthorYear = (birthYear: number | null): number => {
  return birthYear || 1900;
};

export const getMainSubject = (subjects: string[]): string => {
  if (subjects.length === 0) return 'Uncategorized';
  return subjects[0].split('--')[0].trim();
};

export const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getFileExtension = (url: string): string => {
  const parts = url.split('.');
  return parts.length > 1 ? parts[parts.length - 1] : '';
};

export const getBookType = (formats: { [key: string]: string | undefined }): string => {
  if (formats['application/epub+zip']) return 'EPUB';
  if (formats['application/x-mobipocket-ebook']) return 'MOBI';
  if (formats['text/html']) return 'HTML';
  if (formats['text/plain; charset=us-ascii']) return 'TXT';
  return 'Other';
};

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const scrollToTop = (smooth: boolean = true): void => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
};

export const saveToLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};