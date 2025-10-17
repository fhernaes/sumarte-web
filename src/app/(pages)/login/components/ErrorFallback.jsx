// app/components/ErrorFallback.jsx
'use client';

/**
 * Componente de UI para mostrar errores controlados
 *
 * @param {Object} props
 * @param {string} props.message - Mensaje amigable para el usuario
 * @param {() => void} [props.onRetry] - Acción opcional para reintentar
 */
export default function ErrorFallback({ message, onRetry }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-4 w-full">
      <div className="w-full max-w-md text-center bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
        <p className="text-gray-700 mb-4">{message}</p>

        {onRetry ? (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Reintentar
          </button>
        ) : (
          <a
            href="/"
            className="inline-block px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
          >
            Volver al inicio
          </a>
        )}
      </div>
    </div>
  );
}
