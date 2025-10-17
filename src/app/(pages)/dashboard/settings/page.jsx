'use client';

import { useState } from 'react';
import { MainContent } from '@/app/ui/components/layout/MainContent';
import { FiUser, FiLock, FiBell, FiCreditCard, FiGlobe, FiMoon, FiSun } from 'react-icons/fi';
import Link from 'next/link';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    newsletter: false,
  });

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const settingsSections = [
    {
      id: 'profile',
      title: 'Perfil',
      description: 'Actualiza tu información personal y preferencias',
      icon: FiUser,
      href: '/dashboard/settings/profile'
    },
    {
      id: 'security',
      title: 'Seguridad',
      description: 'Cambia tu contraseña y configura la autenticación',
      icon: FiLock,
      href: '/dashboard/settings/security'
    },
    {
      id: 'notifications',
      title: 'Notificaciones',
      description: 'Configura cómo recibes las notificaciones',
      icon: FiBell,
      href: '/dashboard/settings/notifications'
    },
    {
      id: 'billing',
      title: 'Facturación',
      description: 'Administra tu suscripción y métodos de pago',
      icon: FiCreditCard,
      href: '/dashboard/settings/billing'
    },
    {
      id: 'language',
      title: 'Idioma y región',
      description: 'Elige tu idioma y configuración regional',
      icon: FiGlobe,
      href: '/dashboard/settings/language'
    }
  ];

  return (
    <MainContent title="Configuración">
      <div className="space-y-6">
        {/* Configuración de apariencia */}
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Apariencia</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personaliza la apariencia de la aplicación</p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-medium text-gray-900">Modo oscuro</h4>
                <p className="text-sm text-gray-500">Activa el modo oscuro para una mejor experiencia visual en condiciones de poca luz.</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                type="button"
                className={`${
                  darkMode ? 'bg-indigo-600' : 'bg-gray-200'
                } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                role="switch"
                aria-checked={darkMode}
              >
                <span className="sr-only">Usar modo oscuro</span>
                <span
                  className={`${
                    darkMode ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                >
                  <span
                    className={`${
                      darkMode ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
                    } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                    aria-hidden="true"
                  >
                    <FiSun className="h-3 w-3 text-gray-400" />
                  </span>
                  <span
                    className={`${
                      darkMode ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
                    } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                    aria-hidden="true"
                  >
                    <FiMoon className="h-3 w-3 text-indigo-600" />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Configuración de notificaciones */}
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Notificaciones</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Configura cómo recibes las notificaciones</p>
          </div>
          <div className="px-4 py-5 sm:p-6 space-y-4">
            {[
              { id: 'email', label: 'Correo electrónico', description: 'Recibe notificaciones por correo electrónico' },
              { id: 'push', label: 'Notificaciones push', description: 'Recibe notificaciones en tu dispositivo' },
              { id: 'newsletter', label: 'Boletín informativo', description: 'Recibe ofertas y actualizaciones por correo electrónico' },
            ].map(({ id, label, description }) => (
              <div key={id} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={id}
                    name={id}
                    type="checkbox"
                    checked={notifications[id]}
                    onChange={() => handleNotificationChange(id)}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={id} className="font-medium text-gray-700">
                    {label}
                  </label>
                  <p className="text-gray-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Otras configuraciones */}
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Otras configuraciones</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Configuraciones adicionales de tu cuenta</p>
          </div>
          <div className="divide-y divide-gray-200">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.id} href={section.href} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 rounded-md p-2 bg-indigo-100 text-indigo-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-base font-medium text-gray-900">{section.title}</h4>
                        <p className="text-sm text-gray-500">{section.description}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Acciones de cuenta */}
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Acciones de cuenta</h3>
          </div>
          <div className="px-4 py-5 sm:p-6 space-y-4">
            <div>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Eliminar cuenta
              </button>
              <p className="mt-2 text-sm text-gray-500">
                Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, ten en cuenta que esta acción no se puede deshacer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainContent>
  );
};

export default SettingsPage;
