import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

export function useReadingHistory() {
  return useLocalStorage<number[]>('reading-history', []);
}

export function useFavorites() {
  return useLocalStorage<number[]>('favorites', []);
}

export interface UserSettings {
  preferredLanguage: string;
  theme: 'light' | 'dark';
  fontSize: number;
}

export function useUserSettings() {
  return useLocalStorage<UserSettings>('user-settings', {
    preferredLanguage: '',
    theme: 'light',
    fontSize: 16,
  });
}