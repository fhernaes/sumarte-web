// src/components/SessionWrapper.jsx
'use client';

import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';

/**
 * SessionWrapper - Componente cliente que proporciona el contexto de sesión
 * 
 * Este componente envuelve la aplicación para proporcionar acceso al estado de autenticación
 * a cualquier componente hijo que lo necesite, sin convertir todo el árbol en componentes de cliente.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos
 * @param {Object} [props.session] - Sesión del usuario (opcional, para hidratación inicial)
 * @returns {JSX.Element} Proveedor de contexto de sesión
 */
export function SessionWrapper({ children, session: initialSession }) {
  const [mounted, setMounted] = useState(false);

  // Evitar hidratación no coincidente entre servidor y cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Evitar renderizar contenido hasta que el componente esté montado
  if (!mounted) {
    return null;
  }

  return (
    <SessionProvider 
      session={initialSession}
      // Opciones adicionales de configuración de NextAuth
      refetchInterval={5 * 60} // Revalidar sesión cada 5 minutos
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
}