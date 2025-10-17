import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Inicializar limitador de tasa con Upstash Redis
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 peticiones por minuto por IP
  analytics: true,
  prefix: 'ratelimit:middleware',
});

// Configuración de límite de tasa para diferentes rutas
const rateLimitConfig = {
  '/api/auth': {
    limit: 10, // 10 peticiones por minuto para endpoints de autenticación
    window: '1 m',
  },
  '/api': {
    limit: 100, // 100 peticiones por minuto para otros endpoints de API
    window: '1 m',
  },
  default: {
    limit: 1000, // 1000 peticiones por minuto para el resto de rutas
    window: '1 m',
  },
};

export async function rateLimitRequest(request) {
  const ip = request.ip ?? '127.0.0.1';
  const pathname = new URL(request.url).pathname;
  
  // Encontrar la configuración de límite para la ruta actual
  const { limit, window } = Object.entries(rateLimitConfig).reduce((acc, [path, config]) => {
    if (pathname.startsWith(path)) {
      return { limit: config.limit, window: config.window };
    }
    return acc;
  }, rateLimitConfig.default);

  // Crear una nueva instancia de ratelimit con la configuración específica
  const customRatelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(limit, window),
    analytics: true,
    prefix: `ratelimit:${pathname}`,
  });

  const { success, limit: limitValue, remaining, reset } = await customRatelimit.limit(ip);
  
  // Establecer headers de límite de tasa para todas las respuestas
  const headers = new Headers();
  headers.set('X-RateLimit-Limit', limitValue.toString());
  headers.set('X-RateLimit-Remaining', remaining.toString());
  headers.set('X-RateLimit-Reset', reset.toString());

  if (!success) {
    return new Response(JSON.stringify({ error: 'Demasiadas solicitudes' }), {
      status: 429,
      headers: {
        ...Object.fromEntries(headers.entries()),
        'Content-Type': 'application/json',
      },
    });
  }

  return { headers };
}
