// src/lib/hooks/useFormSubmit.js
import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function useFormSubmit(schema, onSubmit) {
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (data, options = {}) => {
    try {
      setFormError('');
      
      // Validar con el esquema
      const validatedData = schema.parse(data);
      
      await startTransition(async () => {
        const result = await onSubmit(validatedData);
        
        if (result?.error) {
          throw new Error(result.error);
        }
        
        // Redirigir después de un envío exitoso
        const redirectTo = options.redirectTo || searchParams.get('callbackUrl') || '/dashboard';
        router.push(redirectTo);
      });
    } catch (error) {
      setFormError(error.message || 'Ha ocurrido un error inesperado');
      console.error('Form submission error:', error);
    }
  };

  return { handleSubmit, isPending, formError };
}