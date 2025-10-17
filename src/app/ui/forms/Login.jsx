// src/components/auth/LoginForm/LoginForm.jsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/schemas/auth.schema';
import { useAuth } from '@/lib/hooks/useAuth';
import { useFormSubmit } from '@/lib/hooks/useFormSubmit';
import { LoginView } from './LoginView';

export function LoginForm() {
  const { login } = useAuth();
  const { handleSubmit, isPending, formError } = useFormSubmit(
    loginSchema,
    login
  );

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const {
    register,
    formState: { errors }
  } = form;

  return (
    <LoginView
      register={register}
      errors={errors}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
      serverError={formError}
    />
  );
}
