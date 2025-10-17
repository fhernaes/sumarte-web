'use client';

import { DashboardStats } from './DashboardStats';

export function DashboardOverview() {
  const stats = [
    { 
      name: 'Servicios Activos', 
      value: '12', 
      change: '+2.5%', 
      changeType: 'positive' 
    },
    { 
      name: 'Vistas del Perfil', 
      value: '1,234', 
      change: '+12.3%', 
      changeType: 'positive' 
    },
    { 
      name: 'Mensajes', 
      value: '24', 
      change: '-4.5%', 
      changeType: 'negative' 
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Resumen General</h2>
      <DashboardStats stats={stats} />
    </div>
  );
}
