// src/lib/hooks/useAuth.js
import { useRouter } from 'next/navigation';
import { signIn, signOut } from 'next-auth/react';

export function useAuth() {
  const router = useRouter();

  const login = async (credentials) => {
    const result = await signIn('credentials', {
      ...credentials,
      redirect: false
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  };

  const logout = async () => {
    await signOut({ redirect: false });
    router.refresh();
  };

  return { login, logout };
}