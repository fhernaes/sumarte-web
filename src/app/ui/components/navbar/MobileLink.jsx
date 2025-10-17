'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useCallback } from 'react';

/**
 * MobileLink - Componente de enlace optimizado para móviles
 * Maneja la navegación y acciones con manejo de eventos optimizado
 */
const MobileLink = ({
  href,
  children,
  onClick,
  currentPath,
  isButton = false,
  isPrimary = false,
}) => {
  const handleClick = useCallback((e) => {
    if (isButton) {
      e.preventDefault();
      signOut({ callbackUrl: '/' });
    }
    onClick?.();
  }, [isButton, onClick]);

  const isActive = currentPath === href;
  const baseClasses = 'block px-3 py-2 rounded-md text-base font-medium w-full text-left';
  
  if (isButton) {
    return (
      <button
        onClick={handleClick}
        className={`${baseClasses} ${
          isPrimary
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${baseClasses} ${
        isActive
          ? 'bg-indigo-50 text-indigo-700'
          : 'text-gray-700 hover:bg-gray-100'
      } ${isPrimary ? 'bg-indigo-600 text-white hover:bg-indigo-700' : ''}`}
      prefetch={true}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
};

export default MobileLink;
