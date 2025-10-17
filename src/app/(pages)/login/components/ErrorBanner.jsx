// import memo
import { memo } from 'react';
// 📌 Mensajes de error legibles centralizados
import { getErrorMessage } from '@/lib/errorMessages';
// ⚡ Componente memoizado para evitar renders innecesarios
export const ErrorBanner = memo(function ErrorBanner({ errorCode }) {
  if (!errorCode) return null;

  return (
    <div
      className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-md"
      role="alert"
      aria-live="assertive"
    >
      <p className="font-medium">Error</p>
      <p className="text-sm">{getErrorMessage(errorCode)}</p>
    </div>
  );
});
