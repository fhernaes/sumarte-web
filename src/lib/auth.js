import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "tu@email.com"
        },
        password: {
          label: "Password",
          type: "password"
        },
      },
      async authorize(credentials) {
        console.log('Función authorize ejecutándose con credenciales:', credentials);
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son obligatorios");
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/alpha/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email.trim().toLowerCase(),
              password: credentials.password,
            }),
          });
          
          console.log('Respuesta de la API:', {
            status: res.status,
            statusText: res.statusText
          });
          
          const data = await res.json();
          
          if (res.ok && data?.token) {
            // Devolver un objeto de usuario que se incluirá en el token JWT
            return {
              id: data.userId || "user-id", // Asegúrate de que esto coincida con lo que espera tu aplicación
              name: credentials.email.split('@')[0], // Nombre por defecto basado en el email
              email: credentials.email,
              token: data.token,
            };
          }
          
          console.error('Error en la respuesta de la API:', data);
          throw new Error(data.message || "Credenciales inválidas");
          
        } catch (error) {
          console.error("Error en authorize:", error);
          throw new Error(error.message || "Error de conexión");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  jwt: {
    maxAge: 30, // 30 segundos
  },
    updateAge: 60 * 30, // Actualizar la sesión cada 30 minutos
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' 
        ? '__Secure-next-auth.session-token' 
        : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30, // 30 segundos de vida de la cookie
      },
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Actualizar el token con los datos del usuario
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.token || user.accessToken;
        
        // Establecer tiempo de expiración
        const expTimestamp = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hora
        token.exp = expTimestamp;
      }
      
      // Verificar si el token está a punto de expirar
      if (token?.exp && Date.now() >= token.exp * 1000) {
        console.log('El token ha expirado');
        // Aquí podrías implementar la lógica para refrescar el token
      }
      
      console.log('Token JWT actualizado:', { 
        id: token.id, 
        name: token.name, 
        email: token.email,
        hasToken: !!token.accessToken,
        exp: token.exp ? new Date(token.exp * 1000).toISOString() : null
      });
      
      return token;
    },
    async session({ session, token }) {
      // Enviar propiedades al cliente
      if (token) {
        // Asegurarse de que el objeto user existe
        if (!session.user) session.user = {};
        
        // Copiar propiedades del token a la sesión
        session.user.id = token.id || token.sub;
        session.user.name = token.name || token.email?.split('@')[0] || 'Usuario';
        session.user.email = token.email || '';
        session.accessToken = token.accessToken || token.token;
        
        // Asegurarse de que los campos requeridos por NextAuth estén presentes
        session.user.image = session.user.image || null;
        
        // Añadir expiración a la sesión
        if (token.exp) {
          session.expires = new Date(token.exp * 1000).toISOString();
        }
      }
      
      console.log('Sesión devuelta al cliente:', session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Si hay una URL de retorno, usarla
      if (url.startsWith(baseUrl)) return url;
      // Si es una URL relativa, convertirla a absoluta
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      return baseUrl;
    }
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
};
