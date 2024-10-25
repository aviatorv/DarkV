import React from 'react';
import { Map as MapIcon, Satellite, Radio } from 'lucide-react';

interface MapStyleToggleProps {
  currentStyle: 'satellite' | 'streets';
  onStyleChange: (style: 'satellite' | 'streets') => void;
  showSAR: boolean;
  onSARToggle: () => void;
}

export default function MapStyleToggle({ 
  currentStyle, 
  onStyleChange, 
  showSAR, 
  onSARToggle 
}: MapStyleToggleProps) {
  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="bg-white rounded-lg shadow-lg p-2 space-y-2">
        <button
          className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${
            currentStyle === 'satellite' ? 'bg-gray-100' : 'hover:bg-gray-100'
          }`}
          onClick={() => onStyleChange('satellite')}
          title="Satellite View"
        >
          <Satellite className="w-5 h-5 text-gray-700" />
        </button>
        <button
          className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${
            currentStyle === 'streets' ? 'bg-gray-100' : 'hover:bg-gray-100'
          }`}
          onClick={() => onStyleChange('streets')}
          title="Street View"
        >
          <MapIcon className="w-5 h-5 text-gray-700" />
        </button>
        <button
          className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${
            showSAR ? 'bg-blue-100' : 'hover:bg-gray-100'
          }`}
          onClick={onSARToggle}
          title="Toggle SAR Imagery"
        >
          <Radio className={`w-5 h-5 ${showSAR ? 'text-blue-600' : 'text-gray-700'}`} />
        </button>
      </div>
    </div>
  );
}