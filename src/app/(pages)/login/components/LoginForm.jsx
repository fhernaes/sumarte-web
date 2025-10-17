'use client';

import { useForm } from 'react-hook-form';
import { useCallback, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { ErrorBanner } from './ErrorBanner';
import { memo, useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';

// ⚡ Componente memoizado
export const LoginForm = memo(function LoginForm({ safeCallbackUrl, serverError, setServerError }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const emailRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --------------------------
  // Autofocus real con cursor
  // --------------------------
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // --------------------------
  // Submit handler
  // --------------------------
  const router = useRouter();
  
  const onSubmit = useCallback(async (data) => {
    setIsSubmitting(true);
    setServerError('');
  
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: safeCallbackUrl
      });
  
      if (result?.error) throw new Error(result.error);
      if (result?.url) router.push(result.url);
    } catch (err) {
      setServerError(err.message || 'Ocurrió un error al iniciar sesión');
    } finally {
      setIsSubmitting(false);
    }
  }, [safeCallbackUrl, setServerError, router]);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ErrorBanner errorCode={serverError} />

      {/* Email */}
            <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
        </label>
        <input
            id="email"
            type="email"
            autoComplete="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...register('email', {
            required: 'El email es obligatorio',
            pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'El email debe tener un formato válido'
            }
            })}
            ref={(e) => {
            register('email').ref(e);
            emailRef.current = e;
            }}
        />
        {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
        </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          {...register('password', { required: 'La contraseña es obligatoria' })}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {isSubmitting ? 'Ingresando…' : 'Iniciar sesión'}
      </button>
    </form>
  );
});
