'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Skeleton } from '@/app/ui/skeleton';

const NavItem = ({ href, children, currentPath }) => {
  const isActive = currentPath === href || 
                  (href !== '/' && currentPath.startsWith(href));

  return (
    <Link
      href={href}
      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? 'text-indigo-600 bg-indigo-50'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
};

const DesktopMenu = ({ isLoading }) => {
  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
    );
  }

};

export default DesktopMenu;