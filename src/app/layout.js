// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./ui/components/navbar/Navbar";
import { SessionWrapper } from "./ui/components/SessionWrapper";

// Metadata para SEO
export const metadata = {
  title: "Sumarte | Plataforma de Gestión Integral",
  description: "Solución todo en uno para la gestión eficiente de tu negocio",
  keywords: ["gestión", "productividad", "negocios", "plataforma", "herramientas"],
  authors: [{ name: 'Sumarte' }],
  openGraph: {
    title: 'Sumarte | Plataforma de Gestión Integral',
    description: 'Solución todo en uno para la gestión eficiente de tu negocio',
    url: 'https://tudominio.com',
    siteName: 'Sumarte',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sumarte | Plataforma de Gestión Integral',
    description: 'Solución todo en uno para la gestión eficiente de tu negocio',
    creator: '@sumarte',
  },
};

// Optimización de fuentes con next/font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

/**
 * RootLayout - Componente de servidor que sirve como el layout raíz de la aplicación
 * 
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos
 * @param {Object} props.session - Sesión del usuario (proporcionada por NextAuth)
 * @returns {JSX.Element} Layout raíz de la aplicación
 */
export default function RootLayout({ children, session }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <head>
        <meta name="theme-color" content="#4f46e5" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      
      <body className="min-h-screen bg-gray-50">
        
        {/* 
          El SessionWrapper es un Client Component que envuelve la aplicación
          para proporcionar el contexto de autenticación a los componentes que lo necesiten
        */}
        <SessionWrapper session={session}>
          <Navbar /> 
          <main className="pt-16 md:pt-20">
            {children}
          </main>
          {/* 
            Footer opcional podría ir aquí
            <Footer />
          */}
        </SessionWrapper>
      </body>
    </html>
  );
}