import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import LoginContent from './components/LoginContent';
import ErrorFallback from './components/ErrorFallback';

export const metadata = {
  title: 'Iniciar Sesión | Sumarte',
  description: 'Accede a tu cuenta de Sumarte para gestionar tu perfil y más.',
  robots: 'noindex, nofollow'
};

/**
 * Página de Login con manejo robusto de errores
 */
export default async function LoginPage() {
  let session = null;
  let errorMessage = null;

  try {
    session = await getServerSession(authOptions);
    if (session) redirect('/dashboard');
  } catch (error) {
    console.error('[LoginPage] Error al verificar sesión', {
      message: error.message,
      stack: error.stack
    });

    errorMessage = 'Hubo un problema al conectar con el servidor de autenticación. Inténtalo más tarde.';
  }

  if (errorMessage) {
    return <ErrorFallback message={errorMessage} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 w-full">
      <div className="w-full max-w-md">
        <LoginContent />
      </div>
    </div>
  );
}


