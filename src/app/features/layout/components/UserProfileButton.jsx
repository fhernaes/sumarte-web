'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import Link from 'next/link';

export function UserProfileButton({ user }) {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span className="sr-only">Abrir menú de usuario</span>
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <span className="ml-2 text-sm font-medium text-gray-700">{user?.name || 'Usuario'}</span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/dashboard/profile"
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } group flex items-center px-4 py-2 text-sm text-gray-700`}
                >
                  <FiUser className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                  Mi Perfil
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/dashboard/settings"
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } group flex items-center px-4 py-2 text-sm text-gray-700`}
                >
                  <FiSettings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                  Configuración
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } w-full text-left group flex items-center px-4 py-2 text-sm text-red-600`}
                >
                  <FiLogOut className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500" />
                  Cerrar sesión
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
