import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Rutas públicas que no requieren autenticación
const publicPaths = ['/login', '/_next', '/favicon.ico', '/api/auth'];

// Verifica si la ruta es pública
function isPublicPath(path) {
  return publicPaths.some(publicPath => 
    path === publicPath || path.startsWith(`${publicPath}/`)
  );
}

// Verifica si la ruta es una API
function isApiRoute(path) {
  return path.startsWith('/api/');
}

// Maneja la autenticación y autorización
export async function authenticateRequest(request) {
  const { pathname } = new URL(request.url);
  
  // Omitir middleware para rutas públicas y archivos estáticos
  if (isPublicPath(pathname) || pathname.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg)$/)) {
    return NextResponse.next();
  }

  // Obtener el token de sesión de las cookies
  const token = await getToken({ req: request });
  
  // Manejar usuarios no autenticados
  if (!token) {
    // Para rutas de API, retornar 401
    if (isApiRoute(pathname)) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Para rutas web, redirigir al login con URL de retorno
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Manejar usuarios autenticados que intentan acceder a páginas de autenticación
  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Agregar información del usuario a los headers para rutas de API
  if (isApiRoute(pathname)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', token.sub);
    requestHeaders.set('x-user-email', token.email);
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}
