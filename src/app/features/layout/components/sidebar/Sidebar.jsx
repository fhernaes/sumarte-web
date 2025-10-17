'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { NavContent } from './NavContent';
import { MobileSidebar } from './MobileSidebar';

export const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 p-4 flex-col">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-xl font-bold text-indigo-600">Sumarte</h1>
        </div>
        <NavContent />
      </aside>

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menú de navegación"
          className="p-2 rounded-md bg-white shadow hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={mobileOpen} 
        onClose={() => setMobileOpen(false)} 
      />
    </>
  );
};

export default Sidebar;
