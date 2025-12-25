import React from 'react';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  onLanguageChange: (language: string) => void;
  selectedLanguage: string;
}

const LANGUAGES = [
  { code: '', label: 'Все языки' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'it', label: 'Italiano' },
  { code: 'ru', label: 'Русский' },
  { code: 'pt', label: 'Português' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  onLanguageChange,
  selectedLanguage
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Filter size={20} />
          <span className="font-semibold">Фильтры:</span>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="language" className="text-sm text-gray-600">
            Язык:
          </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};