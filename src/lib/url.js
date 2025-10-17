// Lista blanca de URLs seguras
const ALLOWED_CALLBACK_URLS = ['/dashboard', '/profile', '/'];

/**
 * Valida que la URL de callback sea segura.
 * Devuelve '/dashboard' si la URL no es válida o no está en la lista blanca.
 *
 * @param {string} url - URL de callback que viene de query params
 * @returns {string} URL segura para redirección
 */
export function getSafeCallbackUrl(url) {
  try {
    if (!url) return '/dashboard';

    const { pathname } = new URL(url, window.location.origin);

    return ALLOWED_CALLBACK_URLS.includes(pathname)
      ? pathname
      : '/dashboard';
  } catch {
    return '/dashboard';
  }
}
