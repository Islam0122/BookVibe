import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = 'Загрузка...' }) => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <Loader2 className="animate-spin h-16 w-16 text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};