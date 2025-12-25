import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  minZoom?: number;
  maxZoom?: number;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
  minZoom = 50,
  maxZoom = 200
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onZoomOut}
        disabled={zoom <= minZoom}
        className="p-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg transition-colors"
        title="Уменьшить"
      >
        <ZoomOut size={20} />
      </button>

      <span className="px-4 py-2 bg-gray-100 rounded-lg font-semibold min-w-[80px] text-center">
        {zoom}%
      </span>

      <button
        onClick={onZoomIn}
        disabled={zoom >= maxZoom}
        className="p-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg transition-colors"
        title="Увеличить"
      >
        <ZoomIn size={20} />
      </button>

      <button
        onClick={onReset}
        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors ml-2"
        title="Сбросить масштаб"
      >
        <RotateCcw size={20} />
      </button>
    </div>
  );
};