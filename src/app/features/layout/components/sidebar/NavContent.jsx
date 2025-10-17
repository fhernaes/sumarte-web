'use client';

import { usePathname } from 'next/navigation';
import { NAV_ITEMS, HELP_ITEMS } from '@/app/ui/components/layout/config';
import { NavSection } from './NavSection';
import { signOut } from 'next-auth/react';

export const NavContent = ({ onItemClick = () => {} }) => {
  const pathname = usePathname();
  
  const isActive = (path) => {
    if (!pathname) return false;
    // Manejar rutas anidadas
    if (path !== '/' && pathname.startsWith(path)) return true;
    // Coincidencia exacta para la ruta raíz
    return pathname === path;
  };

  return (
    <>
      <NavSection 
        items={NAV_ITEMS}
        isActive={isActive}
        onItemClick={onItemClick}
      />
      
      <div className="mt-8 pt-4 border-t border-gray-200">
        <NavSection 
          items={HELP_ITEMS}
          isActive={isActive}
          onItemClick={onItemClick}
        />
        
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </>
  );
};