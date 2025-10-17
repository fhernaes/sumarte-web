'use client';

import { RegisterView } from './View';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/schemas/auth.schema';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function RegisterContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setServerError('');

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/alpha/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        // Puedes mapear errores de backend a campos específicos
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, message]) => {
            setFormError(field, { type: 'server', message });
          });
        }
        setServerError(result.message || 'Error en el registro');
        return;
      }

      // Redirigir a dashboard o página de verificación
      router.push('/verification-sent');
    } catch (error) {
      console.error('Error inesperado:', error);
      setServerError('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RegisterView
      register={register}
      errors={errors}
      serverError={serverError}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
