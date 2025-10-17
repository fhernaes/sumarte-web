import Link from 'next/link';

export function CtaSection() {
  return (
    <div className="bg-indigo-700">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">¿Eres un profesional de la música?</h2>
        <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
          Únete a nuestra plataforma y comparte tu conocimiento con estudiantes y clientes de todo el mundo.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/registro" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-indigo-700 bg-white hover:bg-indigo-50 transition-colors"
          >
            Regístrate como profesional
          </Link>
          <Link 
            href="/como-funciona" 
            className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-indigo-600 transition-colors"
          >
            Ver requisitos
          </Link>
        </div>
      </div>
    </div>
  );
}
