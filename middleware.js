import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Configuración de rate limiting con Upstash Redis
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, '15 m'), // 100 peticiones por 15 minutos
  analytics: true,
  prefix: 'ratelimit_middleware',
});

// Configuración de headers de seguridad
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vercel-insights.com;
    style-src 'self' 'unsafe-inline' *.googleapis.com;
    img-src 'self' data: blob: https:;
    font-src 'self' data: *.gstatic.com;
    connect-src 'self' *.vercel-insights.com ${process.env.NEXT_PUBLIC_API_URL || ''};
    frame-ancestors 'none';
    form-action 'self';
    base-uri 'self';
    object-src 'none';
  `.replace(/\s+/g, ' ').trim(),
};

// Rutas protegidas que requieren autenticación
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
  '/billing',
  '/projects',
  '/team',
  '/analytics'
];

// Rutas de autenticación que no deberían ser accesibles si ya estás autenticado
const authRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password'
];

// Rutas públicas que no requieren autenticación
const publicRoutes = [
  '/',
  '/privacy',
  '/terms',
  '/api/health'
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  
  // 1. Aplicar headers de seguridad a todas las respuestas
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // 2. Aplicar rate limiting a rutas de API
  if (pathname.startsWith('/api/')) {
    const ip = request.ip ?? '127.0.0.1';
    const { success } = await ratelimit.limit(ip);
    
    if (!success) {
      return new NextResponse(
        JSON.stringify({ 
          success: false, 
          message: 'Demasiadas solicitudes. Por favor, intente de nuevo más tarde.' 
        }), 
        { 
          status: 429, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
  }

  // 3. Verificar autenticación para rutas protegidas
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`));

  // Si es una ruta de API pública o archivo estático, continuar
  if (
    pathname.startsWith('/_next/') || 
    pathname.startsWith('/api/auth/') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.jpeg') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.js') ||
    isPublicRoute
  ) {
    return response;
  }

  // Obtener token de autenticación
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Redirigir usuarios autenticados lejos de rutas de autenticación
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirigir usuarios no autenticados al login
  if (!token && isProtectedRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Protección adicional contra clickjacking para rutas protegidas
  if (isProtectedRoute) {
    response.headers.set('X-Frame-Options', 'DENY');
  }

  return response;
}

// Configuración de rutas que activan el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

// Función de utilidad para formatear errores
function errorResponse(message, status = 401) {
  return new NextResponse(
    JSON.stringify({ success: false, message }),
    { status, headers: { 'Content-Type': 'application/json' } }
  );
}
