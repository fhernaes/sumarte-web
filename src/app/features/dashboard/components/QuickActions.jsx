'use client';

import { FiUser, FiPlus, FiLock } from 'react-icons/fi';
import Link from 'next/link';

const actions = [
  {
    title: 'Completar perfil',
    description: 'Añade información personal y profesional',
    icon: FiUser,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    href: '/dashboard/profile'
  },
  {
    title: 'Publicar servicio',
    description: 'Ofrece un nuevo servicio a la comunidad',
    icon: FiPlus,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    href: '/dashboard/services/new'
  },
  {
    title: 'Seguridad',
    description: 'Actualiza tu contraseña y seguridad',
    icon: FiLock,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    href: '/dashboard/settings/security'
  }
];

export function QuickActions() {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Acciones rápidas</h3>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md p-3 ${action.iconBg}`}>
                    <Icon className={`h-6 w-6 ${action.iconColor}`} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900">{action.title}</h4>
                    <p className="mt-1 text-sm text-gray-500">{action.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
