'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NAV_ITEMS, HELP_ITEMS } from '@/app/ui/components/layout/config';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => pathname === path || pathname.startsWith(path);

  const NavLink = ({ href, Icon, label }) => {
  const active = isActive(href);
  
  return (
    <motion.div
      initial={false}
      animate={{
        backgroundColor: active ? 'rgba(238, 242, 255, 0.7)' : 'transparent',
        borderLeft: active ? '4px solid #4f46e5' : '4px solid transparent',
      }}
      whileHover={{
        backgroundColor: 'rgba(238, 242, 255, 0.7)',
      }}
      transition={{
        duration: 0.15,
        ease: 'easeInOut',
      }}
      className="w-full rounded-lg overflow-hidden"
    >
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        className={`w-full flex items-center px-4 py-3 text-sm font-medium
          ${active 
            ? 'text-indigo-700' 
            : 'text-gray-700 hover:text-gray-900'
          }`}
        onClick={() => setMobileOpen(false)}
        prefetch={!active}
      >
        <Icon 
          className={`mr-3 h-5 w-5 flex-shrink-0 ${
            active ? 'text-indigo-500' : 'text-gray-500'
          }`} 
          aria-hidden="true"
        />
        <span className="truncate">{label}</span>
      </Link>
    </motion.div>
  );
};

  const NavContent = () => (
    <>
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-xl font-bold text-indigo-600">Sumarte</h1>
      </div>

      <nav className="space-y-1">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
          <NavLink key={href} href={href} Icon={Icon} label={label} />
        ))}
        <div className="pt-4 mt-4 border-t border-gray-200">
          {HELP_ITEMS.map(({ href, icon: Icon, label }) => (
            <NavLink key={href} href={href} Icon={Icon} label={label} />
          ))}
        </div>
      </nav>

      <div className="mt-8 pt-4 border-t border-gray-200">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* 🌐 Desktop */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 p-4 flex-col">
        <NavContent />
      </aside>

      {/* 📱 Mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menú de navegación"
          className="p-2 rounded-md bg-white shadow hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
      </div>

      <Dialog
        as="div"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        className="md:hidden relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <Dialog.Panel className="fixed top-0 left-0 h-full w-64 bg-white p-4 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg font-bold text-indigo-600">Sumarte</h1>
            <button onClick={() => setMobileOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <NavContent />
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
