import { NextResponse } from 'next/server';
import { authenticateRequest } from './middleware/auth';
import { applySecurityHeaders, applyCacheControlHeaders } from './middleware/security';
import { rateLimitRequest } from './middleware/ratelimit';

// Rutas que deben ser excluidas del procesamiento del middleware
const EXCLUDED_PATHS = [
  '/_next',
  '/static',
  '/favicon.ico',
  '/manifest.json',
  '/sitemap.xml',
  '/robots.txt',
  '/api/health',
];

// Rutas que deben ser cacheadas
const CACHED_PATHS = ['/api/public'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Omitir middleware para rutas excluidas
  if (EXCLUDED_PATHS.some(path => pathname.startsWith(path))) {
    return response;
  }

  try {
    // Aplicar límite de tasa
    const rateLimitResult = await rateLimitRequest(request);
    if (rateLimitResult instanceof Response) {
      return rateLimitResult;
    }

    // Manejar autenticación y protección de rutas
    const authResponse = await authenticateRequest(request);
    if (authResponse) {
      return authResponse;
    }

    // Aplicar headers de seguridad
    applySecurityHeaders(response);

    // Aplicar control de caché para rutas no sensibles
    if (CACHED_PATHS.some(path => pathname.startsWith(path))) {
      response.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    } else {
      applyCacheControlHeaders(response, pathname);
    }

    return response;
  } catch (error) {
    console.error('Error en el middleware:', error);
    
    // No exponer errores internos al cliente
    if (pathname.startsWith('/api/')) {
      return new Response(
        JSON.stringify({ error: 'Error interno del servidor' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Para rutas que no son API, redirigir a la página de error
    const url = request.nextUrl.clone();
    url.pathname = '/500';
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: [
    /*
     * Coincidir con todas las rutas excepto las que comienzan con:
     * - _next/static (archivos estáticos)
     * - _next/image (archivos de optimización de imágenes)
     * - favicon.ico (archivo de favicon)
     * - carpeta public
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
