'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/app/ui/skeleton';
import Link from 'next/link';

// Carga perezosa de los iconos
const Bars3Icon = dynamic(
  () => import('@heroicons/react/24/outline').then(mod => mod.Bars3Icon),
  { ssr: false }
);

const XMarkIcon = dynamic(
  () => import('@heroicons/react/24/outline').then(mod => mod.XMarkIcon),
  { ssr: false }
);

const MobileMenu = ({ session, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  if (isLoading) {
    return <Skeleton className="h-6 w-6" />;
  }

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40">
          <div 
            className="fixed inset-0 bg-black/30"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={closeMenu}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;