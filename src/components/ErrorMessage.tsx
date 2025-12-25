import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="text-center py-16">
      <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        Ошибка
      </h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Попробовать снова
        </button>
      )}
    </div>
  );
};