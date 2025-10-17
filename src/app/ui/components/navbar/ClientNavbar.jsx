'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@/app/ui/skeleton';
import { UserProfileButton } from '@/app/features/layout/components/UserProfileButton';
import Link from 'next/link';

// Carga perezosa de componentes
const DesktopMenu = dynamic(() => import('./DesktopMenu'), { 
  loading: () => <Skeleton className="h-8 w-48" />,
  ssr: false 
});

const MobileMenu = dynamic(() => import('./MobileMenu'), { 
  loading: () => null,
  ssr: false 
});

export function ClientNavbar() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  return (
    <header className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center" aria-label="Inicio">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Sumarte
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Menú de escritorio - Solo navegación */}
            <div className="hidden md:block">
              <Suspense fallback={<Skeleton className="h-8 w-48" />}>
                <DesktopMenu />
              </Suspense>
            </div>

            {/* Controles de autenticación */}
            <div className="flex items-center space-x-4">
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : session ? (
                <UserProfileButton user={session.user} />
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                    prefetch={true}
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                    prefetch={true}
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>

            {/* Menú móvil */}
            <div className="md:hidden">
              <Suspense fallback={null}>
                <MobileMenu session={session} isLoading={isLoading} />
              </Suspense>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default ClientNavbar;