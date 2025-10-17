"use client";

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Política de Privacidad
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="prose max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introducción</h2>
            <p className="text-gray-700 mb-4">
              En Sumarte, valoramos y respetamos su privacidad. Esta Política de Privacidad explica cómo recopilamos, 
              utilizamos, divulgamos y salvaguardamos su información cuando utiliza nuestro sitio web y servicios.
            </p>
            <p className="text-gray-700">
              Al acceder o utilizar nuestro servicio, usted acepta la recopilación y el uso de información de acuerdo con esta política.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Información que Recopilamos</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">2.1 Información Personal</h3>
            <p className="text-gray-700 mb-4">
              Podemos recopilar información que lo identifique personalmente, como su nombre, dirección de correo electrónico, 
              número de teléfono y otra información de contacto cuando se registra en nuestro servicio.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">2.2 Datos de Uso</h3>
            <p className="text-gray-700 mb-4">
              Recopilamos información sobre cómo se accede y utiliza nuestro servicio. Estos Datos de Uso pueden incluir 
              información como la dirección del Protocolo de Internet de su computadora, tipo de navegador, versión del navegador, 
              las páginas que visita, la hora y fecha de su visita, el tiempo que pasa en esas páginas y otros datos de diagnóstico.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Uso de la Información</h2>
            <p className="text-gray-700 mb-4">
              Utilizamos la información recopilada para diversos fines:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
              <li>Proporcionar y mantener nuestro servicio</li>
              <li>Notificarle sobre cambios en nuestro servicio</li>
              <li>Permitirle participar en funciones interactivas de nuestro servicio cuando elija hacerlo</li>
              <li>Proporcionar atención al cliente y soporte</li>
              <li>Proporcionar análisis o información valiosa para que podamos mejorar nuestro servicio</li>
              <li>Monitorear el uso de nuestro servicio</li>
              <li>Detectar, prevenir y abordar problemas técnicos</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Transferencia de Datos</h2>
            <p className="text-gray-700 mb-4">
              Su información, incluidos los Datos Personales, puede transferirse y mantenerse en computadoras ubicadas fuera de su 
              estado, provincia, país u otra jurisdicción gubernamental donde las leyes de protección de datos pueden diferir de las de su jurisdicción.
            </p>
            <p className="text-gray-700">
              Su consentimiento a esta Política de Privacidad seguido de su envío de dicha información representa su acuerdo con dicha transferencia.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Divulgación de Datos</h2>
            <p className="text-gray-700 mb-4">
              Podemos divulgar su información personal en las siguientes situaciones:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
              <li>A proveedores de servicios para monitorear y analizar el uso de nuestro servicio</li>
              <li>Para cumplir con una obligación legal</li>
              <li>Para proteger y defender los derechos o la propiedad de Sumarte</li>
              <li>Para prevenir o investigar posibles irregularidades en relación con el servicio</li>
              <li>Para proteger la seguridad personal de los usuarios del servicio o del público</li>
              <li>Para protegerse contra la responsabilidad legal</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Seguridad de los Datos</h2>
            <p className="text-gray-700 mb-4">
              La seguridad de sus datos es importante para nosotros, pero recuerde que ningún método de transmisión por Internet o 
              método de almacenamiento electrónico es 100% seguro. Si bien nos esforzamos por utilizar medios comercialmente aceptables 
              para proteger sus datos personales, no podemos garantizar su seguridad absoluta.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Sus Derechos de Protección de Datos</h2>
            <p className="text-gray-700 mb-4">
              Dependiendo de su ubicación, puede tener ciertos derechos con respecto a su información personal, que incluyen:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
              <li>El derecho a acceder, actualizar o eliminar la información que tenemos sobre usted</li>
              <li>El derecho de rectificación</li>
              <li>El derecho a oponerse</li>
              <li>El derecho a la portabilidad de los datos</li>
              <li>El derecho a retirar el consentimiento</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies y Tecnologías Similares</h2>
            <p className="text-gray-700 mb-4">
              Utilizamos cookies y tecnologías de seguimiento similares para rastrear la actividad en nuestro servicio y 
              mantener cierta información. Puede indicar a su navegador que rechace todas las cookies o que le indique cuándo 
              se envía una cookie. Sin embargo, si no acepta las cookies, es posible que no pueda utilizar algunas partes de nuestro servicio.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cambios en esta Política de Privacidad</h2>
            <p className="text-gray-700 mb-4">
              Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le notificaremos de cualquier cambio publicando 
              la nueva Política de Privacidad en esta página.
            </p>
            <p className="text-gray-700">
              Se le recomienda revisar esta Política de Privacidad periódicamente para cualquier cambio. Los cambios a esta 
              Política de Privacidad son efectivos cuando se publican en esta página.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contáctenos</h2>
            <p className="text-gray-700">
              Si tiene alguna pregunta sobre esta Política de Privacidad, contáctenos:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mt-2">
              <li>Por correo electrónico: privacidad@sumarte.com</li>
              <li>Visitando esta página en nuestro sitio web: <Link href="/contacto" className="text-indigo-600 hover:underline">Contáctenos</Link></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
