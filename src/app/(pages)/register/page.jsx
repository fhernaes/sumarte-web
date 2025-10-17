import { RegisterContent } from './Content';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Registro - Sumarte',
  description: 'Crea una cuenta para acceder a todas las funcionalidades',
};

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  
  // Si el usuario ya está autenticado, redirigir al dashboard
  if (session) {
    redirect('/dashboard');
  }

  return <RegisterContent />;
}