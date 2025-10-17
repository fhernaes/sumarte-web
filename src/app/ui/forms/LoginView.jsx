// src/components/auth/LoginForm/LoginView.jsx
import { Button } from '@/app/ui/components/buttons/Button';
import { Input } from '@/app/ui/components/inputs/Input';
import { Label } from '@/app/ui/components/labels/Label';
import { Loader2 } from 'lucide-react';

export function LoginView({
  register,
  errors,
  onSubmit,
  isSubmitting,
  serverError
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {serverError && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {serverError}
        </div>
      )}

      <div>
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Contraseña</Label>
          <a
            href="/auth/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          disabled={isSubmitting}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
          {...register('password')}
        />
        {errors.password && (
          <p id="password-error" className="mt-1 text-sm text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Iniciando sesión...
          </>
        ) : (
          'Iniciar sesión'
        )}
      </Button>
    </form>
  );
}