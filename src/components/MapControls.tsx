import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export default function MapControls({ onZoomIn, onZoomOut }: MapControlsProps) {
  return (
    <div className="absolute right-4 bottom-4 z-10">
      <div className="bg-white rounded-lg shadow-lg">
        <button
          onClick={onZoomIn}
          className="p-2 hover:bg-gray-100 rounded-t-lg transition-colors border-b border-gray-200"
          aria-label="Zoom in"
        >
          <Plus className="h-6 w-6 text-gray-700" />
        </button>
        <button
          onClick={onZoomOut}
          className="p-2 hover:bg-gray-100 rounded-b-lg transition-colors"
          aria-label="Zoom out"
        >
          <Minus className="h-6 w-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}