import { useState, useCallback } from 'react';
import { debounce } from '../utils/helpers';

interface UseSearchResult {
  query: string;
  setQuery: (query: string) => void;
  debouncedQuery: string;
  clearQuery: () => void;
}

export const useSearch = (delay: number = 500): UseSearchResult => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const debouncedSetQuery = useCallback(
    debounce((value: string) => {
      setDebouncedQuery(value);
    }, delay),
    [delay]
  );

  const handleSetQuery = useCallback((value: string) => {
    setQuery(value);
    debouncedSetQuery(value);
  }, [debouncedSetQuery]);

  const clearQuery = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
  }, []);

  return {
    query,
    setQuery: handleSetQuery,
    debouncedQuery,
    clearQuery,
  };
};