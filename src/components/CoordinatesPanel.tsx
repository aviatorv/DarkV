import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CoordinatesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  onCoordinatesChange: (lat: number, lon: number) => void;
}

export default function CoordinatesPanel({
  isOpen,
  onClose,
  coordinates,
  onCoordinatesChange,
}: CoordinatesPanelProps) {
  const [lat, setLat] = useState(coordinates.latitude.toString());
  const [lon, setLon] = useState(coordinates.longitude.toString());

  useEffect(() => {
    setLat(coordinates.latitude.toString());
    setLon(coordinates.longitude.toString());
  }, [coordinates]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLat = parseFloat(lat);
    const newLon = parseFloat(lon);
    
    if (!isNaN(newLat) && !isNaN(newLon)) {
      onCoordinatesChange(newLat, newLon);
    }
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-80 z-20`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Coordinates</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Latitude
            </label>
            <input
              type="text"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Longitude
            </label>
            <input
              type="text"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Update Location
          </button>
        </form>
      </div>
    </div>
  );
}