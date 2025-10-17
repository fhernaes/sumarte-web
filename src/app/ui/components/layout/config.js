import { FiHome, FiUser, FiBriefcase, FiSettings, FiBell, FiHelpCircle } from 'react-icons/fi';

export const NAV_ITEMS = [
  { href: '/dashboard', icon: FiHome, label: 'Inicio' },
  { href: '/dashboard/profile', icon: FiUser, label: 'Mi Perfil' },
  { href: '/dashboard/services', icon: FiBriefcase, label: 'Mis Servicios' },
  { href: '/dashboard/settings', icon: FiSettings, label: 'Configuración' },
];

export const HELP_ITEMS = [
  { href: '/dashboard/notifications', icon: FiBell, label: 'Notificaciones' },
  { href: '/help', icon: FiHelpCircle, label: 'Ayuda y Soporte' },
];
