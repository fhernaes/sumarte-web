// 📌 Mapeo centralizado de códigos de error → mensajes legibles
export const errorMessages = {
    CredentialsSignin: 'Credenciales inválidas. Por favor, inténtalo de nuevo.',
    SessionExpired: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
    AccessDenied: 'No tienes permiso para acceder a esta página.',
    OAuthSignin: 'Error al iniciar sesión con el proveedor seleccionado.',
    OAuthCallback: 'Error al procesar la autenticación con el proveedor.',
    OAuthCreateAccount: 'No se pudo crear el usuario. Por favor, inténtalo de nuevo.',
    EmailCreateAccount: 'No se pudo crear el usuario. El correo ya está en uso.',
    Callback: 'Error al iniciar sesión. Por favor, inténtalo de nuevo.',
    OAuthAccountNotLinked: 'Esta cuenta ya está vinculada a otro método de inicio de sesión.',
    EmailSignin: 'Error al enviar el correo de verificación.',
    default: 'Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.'
  };
  
  export const getErrorMessage = (code) =>
    errorMessages[code] || errorMessages.default;
  