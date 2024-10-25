import React from 'react';
import { Menu } from 'lucide-react';

interface SidebarProps {
  onMenuClick: () => void;
}

export default function Sidebar({ onMenuClick }: SidebarProps) {
  return (
    <button
      onClick={onMenuClick}
      className="absolute left-4 top-20 z-10 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
      aria-label="Toggle coordinates panel"
    >
      <Menu className="h-6 w-6 text-gray-700" />
    </button>
  );
}