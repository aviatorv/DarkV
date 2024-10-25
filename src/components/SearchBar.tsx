import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Menu } from 'lucide-react';

interface SearchBarProps {
  onMenuClick: () => void;
}

export default function SearchBar({ onMenuClick }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement geocoding logic here
  };

  return (
    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
      <button
        onClick={onMenuClick}
        className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle coordinates panel"
      >
        <Menu className="h-6 w-6 text-gray-700" />
      </button>

      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search location..."
            className="pl-10 pr-4 py-2 rounded-lg shadow-lg border-0 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </form>
    </div>
  );
}