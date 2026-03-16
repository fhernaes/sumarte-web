# Sumarte Web

Una plataforma web para conectar profesionales de la música con estudiantes y clientes de todo el mundo. Los profesionales pueden registrarse, compartir su conocimiento y ofrecer servicios musicales.
## ⚠️ Estatus del proyecto

Este proyecto es funcional pero **se encuentra en desarrollo activo**.  
Algunas partes del código aún no están completamente testeadas y pueden cambiar en futuras versiones.
## Características

- **Registro de Profesionales**: Los músicos y profesionales de la música pueden registrarse en la plataforma.
- **Dashboard Personal**: Panel de control para gestionar perfil, servicios y actividades recientes.
- **Autenticación Segura**: Integración con NextAuth para login y registro seguro.
- **Interfaz Moderna**: Construida con React, Next.js y Tailwind CSS para una experiencia de usuario fluida.
- **Animaciones**: Animaciones suaves con Framer Motion.
- **Validación de Formularios**: Validación robusta con React Hook Form y Zod.
- **Rate Limiting**: Protección contra abuso con Upstash Rate Limit.
- **Responsive Design**: Diseño adaptable para dispositivos móviles y desktop.

## Tecnologías Utilizadas

- **Framework**: Next.js 15
- **Frontend**: React 19, Tailwind CSS
- **Autenticación**: NextAuth.js
- **Base de Datos**: (No especificada en el código, posiblemente externa)
- **Animaciones**: Framer Motion
- **Validación**: Zod, React Hook Form
- **Rate Limiting**: Upstash Redis
- **Iconos**: Heroicons, Lucide React, React Icons
- **Otras**: Headless UI, React Dropzone

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/sumarte-web.git
   cd sumarte-web
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env.local` en la raíz del proyecto y agrega las variables necesarias (por ejemplo, para NextAuth, base de datos, etc.).

4. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```

   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia el servidor de producción
- `npm run lint`: Ejecuta ESLint para verificar el código

## Estructura del Proyecto

```
src/
├── app/                    # Páginas y layouts de Next.js App Router
│   ├── (pages)/           # Rutas agrupadas
│   │   ├── dashboard/     # Dashboard del usuario
│   │   ├── login/         # Página de login
│   │   ├── register/      # Página de registro
│   │   └── ...
│   ├── api/               # API routes
│   └── globals.css        # Estilos globales
├── components/            # Componentes reutilizables
├── features/              # Componentes específicos de features
├── lib/                   # Utilidades y hooks
├── middleware/            # Middleware de Next.js
└── ui/                    # Componentes de UI
```

