import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Crear una nueva instancia de Ratelimit
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow( 5, '1 m'), // 5 peticiones por minuto
  analytics: true,
  prefix: 'ratelimit_middleware',
});

export { ratelimit };
