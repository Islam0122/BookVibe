export const API_CONFIG = {
  BASE_URL: 'https://gutendex.com/books',
  TIMEOUT: 10000,
  ITEMS_PER_PAGE: 32,
};

export const LANGUAGE_NAMES: { [key: string]: string } = {
  'en': 'English',
  'fr': 'Français',
  'de': 'Deutsch',
  'es': 'Español',
  'it': 'Italiano',
  'ru': 'Русский',
  'pt': 'Português',
  'zh': '中文',
  'ja': '日本語',
  'ar': 'العربية',
  'nl': 'Nederlands',
  'pl': 'Polski',
  'sv': 'Svenska',
  'da': 'Dansk',
  'no': 'Norsk',
  'fi': 'Suomi',
  'cs': 'Čeština',
  'el': 'Ελληνικά',
  'he': 'עברית',
  'hi': 'हिन्दी',
};

export const ZOOM_CONFIG = {
  MIN: 50,
  MAX: 200,
  DEFAULT: 100,
  STEP: 25,
};

export const APP_CONFIG = {
  APP_NAME: 'BookVibe',
  APP_DESCRIPTION: 'Бесплатная библиотека электронных книг',
  COPYRIGHT: '© 2025 BookVibe',
  LIBRARY_NAME: 'Project Gutenberg',
  BOOKS_COUNT: '70,000+',
};

export const ERROR_MESSAGES = {
  FETCH_BOOKS: 'Ошибка при загрузке книг. Пожалуйста, попробуйте позже.',
  DOWNLOAD_BOOK: 'Ошибка при скачивании книги. Пожалуйста, попробуйте позже.',
  NETWORK_ERROR: 'Проблема с подключением к интернету.',
  NOT_FOUND: 'Книга не найдена.',
};

export const SUCCESS_MESSAGES = {
  DOWNLOAD_STARTED: 'Скачивание началось...',
};