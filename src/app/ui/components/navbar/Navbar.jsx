// src/app/ui/components/navbar/Navbar.jsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Skeleton } from '@/app/ui/skeleton';

// Componente de carga
const LoadingSkeleton = () => (
  <header className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
      <Skeleton className="h-8 w-32" />
      <div className="hidden md:flex space-x-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
      <Skeleton className="md:hidden h-8 w-8" />
    </nav>
  </header>
);

// Carga dinámica del componente ClientNavbar
const ClientNavbar = dynamic(
  () => import('./ClientNavbar'),
  { 
    loading: () => <LoadingSkeleton />,
    ssr: false
  }
);

/**
 * Navbar - Barra de navegación principal
 * 
 * Este es un componente que maneja la carga del Navbar del cliente
 * con carga perezosa y estados de carga optimizados.
 */
export function Navbar() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ClientNavbar />
    </Suspense>
  );
}