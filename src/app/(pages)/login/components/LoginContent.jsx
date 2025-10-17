'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { LoginForm } from './LoginForm';
import { getSafeCallbackUrl } from '@/lib/url'; // si lo tienes en utils

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const errorParam = searchParams.get('error');
  const safeCallbackUrl = getSafeCallbackUrl(callbackUrl);
  const [serverError, setServerError] = useState(errorParam || '');

  // 🚀 Prefetch del dashboard para navegación instantánea post-login
  useEffect(() => {
    router.prefetch('/dashboard');
  }, [router]);

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block mb-4">
          <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Sumarte
          </span>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Iniciar sesión</h1>
        <p className="text-gray-600 mt-2">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>

      {/* Formulario memoizado */}
      <LoginForm
        safeCallbackUrl={safeCallbackUrl}
        serverError={serverError}
        setServerError={setServerError}
      />

      {/* Links adicionales */}
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link
            href={`/register${safeCallbackUrl ? `?callbackUrl=${encodeURIComponent(safeCallbackUrl)}` : ''}`}
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Regístrate
          </Link>
        </p>
        <p className="mt-2">
          <Link
            href="/forgot-password"
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors text-sm"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
      </div>
    </div>
  );
}
