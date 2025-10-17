import { NextResponse } from 'next/server';

// Headers de seguridad comunes para todas las respuestas
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

// Aplicar headers de seguridad a la respuesta
export function applySecurityHeaders(response) {
  securityHeaders.forEach(({ key, value }) => {
    response.headers.set(key, value);
  });
  return response;
}

// Configuración de CSP (Política de Seguridad de Contenido) para diferentes rutas
export function getCSPHeaders(pathname) {
  const isDev = process.env.NODE_ENV !== 'production';
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self' https: wss:",
    "frame-src 'self'",
    `form-action 'self'`,
  ];

  // Agregar configuraciones específicas para desarrollo
  if (isDev) {
    csp.push("connect-src 'self' ws: wss: http://localhost:* https://localhost:*");
  }

  return {
    'Content-Security-Policy': csp.join('; '),
  };
}

// Aplicar headers de control de caché para rutas sensibles
export function applyCacheControlHeaders(response, pathname) {
  const sensitivePaths = ['/dashboard', '/api/private'];
  if (sensitivePaths.some(path => pathname.startsWith(path))) {
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    response.headers.set('Pragma', 'no-cache');
  }
  return response;
}
