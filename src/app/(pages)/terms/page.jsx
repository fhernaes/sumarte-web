"use client";

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Términos de Servicio
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="prose max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Aceptación de los Términos</h2>
            <p className="text-gray-700 mb-4">
              Al acceder y utilizar el servicio de Sumarte, usted acepta estar sujeto a estos Términos de Servicio, 
              todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de las leyes locales aplicables.
            </p>
            <p className="text-gray-700">
              Si no está de acuerdo con alguno de estos términos, tiene prohibido usar o acceder a este sitio.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Uso de la Licencia</h2>
            <p className="text-gray-700 mb-4">
              Se le otorga el derecho no exclusivo, intransferible y revocable de acceder y utilizar Sumarte estrictamente 
              de acuerdo con estos términos de servicio.
            </p>
            <p className="text-gray-700">
              No podrá:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mt-2 mb-4">
              <li>Modificar o copiar los materiales</li>
              <li>Utilizar los materiales para ningún propósito comercial o para exhibición pública</li>
              <li>Intentar descompilar o realizar ingeniería inversa de cualquier software</li>
              <li>Eliminar los derechos de autor u otras notaciones de propiedad de los materiales</li>
              <li>Transferir los materiales a otra persona o "reflejar" los materiales en cualquier otro servidor</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cuentas de Usuario</h2>
            <p className="text-gray-700 mb-4">
              Al crear una cuenta con nosotros, usted garantiza que la información proporcionada es precisa, completa y actual 
              en todo momento. La información inexacta, incompleta u obsoleta puede dar lugar a la terminación inmediata de su 
              cuenta en nuestro servicio.
            </p>
            <p className="text-gray-700">
              Usted es responsable de mantener la confidencialidad de su cuenta y contraseña, incluyendo pero no limitado a la 
              restricción del acceso a su computadora y/o cuenta. Usted acepta aceptar la responsabilidad por todas las actividades 
              que ocurran bajo su cuenta y/o contraseña.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Contenido del Usuario</h2>
            <p className="text-gray-700 mb-4">
              Nuestro servicio le permite publicar, enlazar, almacenar, compartir y proporcionar otro tipo de información, 
              texto, gráficos, videos u otro material ("Contenido"). Usted es responsable del Contenido que publique en o a 
              través del servicio, incluyendo su legalidad, confiabilidad y adecuación.
            </p>
            <p className="text-gray-700">
              Al publicar Contenido en o a través del servicio, usted declara y garantiza que:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mt-2 mb-4">
              <li>El Contenido es suyo (usted es el propietario) o tiene el derecho de usarlo y otorgarnos los derechos y la licencia según lo previsto en estos Términos</li>
              <li>La publicación de su Contenido en o a través del servicio no viola la privacidad, los derechos de autor, los derechos de marca registrada, el contrato o cualquier otro derecho de ninguna persona o entidad</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Propiedad Intelectual</h2>
            <p className="text-gray-700 mb-4">
              El Servicio y su contenido, características y funcionalidad originales son y seguirán siendo propiedad exclusiva 
              de Sumarte y sus licenciantes. Nuestras marcas comerciales y de servicio pueden no ser utilizadas en relación con 
              ningún producto o servicio sin el consentimiento previo por escrito.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Enlaces a Otros Sitios Web</h2>
            <p className="text-gray-700 mb-4">
              Nuestro Servicio puede contener enlaces a sitios web o servicios de terceros que no son propiedad ni están 
              controlados por Sumarte.
            </p>
            <p className="text-gray-700">
              No tenemos control ni asumimos responsabilidad por el contenido, las políticas de privacidad o las prácticas 
              de sitios o servicios de terceros. Usted reconoce y acepta que Sumarte no será responsable, directa o indirectamente, 
              por cualquier daño o pérdida causada o supuestamente causada por o en relación con el uso o la dependencia de 
              dicho contenido, bienes o servicios disponibles en o a través de dichos sitios o servicios web.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Terminación</h2>
            <p className="text-gray-700 mb-4">
              Podemos terminar o suspender su cuenta de inmediato, sin previo aviso ni responsabilidad, por cualquier motivo, 
              incluyendo, sin limitación, si incumple los Términos.
            </p>
            <p className="text-gray-700">
              Tras la terminación, su derecho a utilizar el Servicio cesará inmediatamente. Si desea terminar su cuenta, 
              simplemente puede dejar de usar el Servicio.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitación de Responsabilidad</h2>
            <p className="text-gray-700 mb-4">
              En ningún caso Sumarte, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán 
              responsables por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo, sin limitación, 
              pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas intangibles, que resulten de:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
              <li>Su acceso o uso o incapacidad para acceder o utilizar el Servicio</li>
              <li>Cualquier conducta o contenido de terceros en el Servicio</li>
              <li>Cualquier contenido obtenido del Servicio</li>
              <li>Acceso no autorizado, uso o alteración de sus transmisiones o contenido</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Ley Aplicable</h2>
            <p className="text-gray-700 mb-4">
              Estos Términos se regirán e interpretarán de acuerdo con las leyes de [País], sin tener en cuenta sus disposiciones 
              sobre conflictos de leyes.
            </p>
            <p className="text-gray-700">
              Nuestra falta de hacer cumplir cualquier derecho o disposición de estos Términos no se considerará una renuncia a 
              esos derechos. Si alguna disposición de estos Términos se considera inválida o inaplicable por un tribunal, las 
              disposiciones restantes de los Términos permanecerán en vigor.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Cambios en los Términos</h2>
            <p className="text-gray-700 mb-4">
              Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en cualquier momento. 
              Si una revisión es importante, proporcionaremos un aviso con al menos 30 días de anticipación antes de que los nuevos 
              términos entren en vigencia.
            </p>
            <p className="text-gray-700">
              Al continuar accediendo o utilizando nuestro Servicio después de que esas revisiones entren en vigencia, usted acepta 
              estar sujeto a los términos revisados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contáctenos</h2>
            <p className="text-gray-700">
              Si tiene alguna pregunta sobre estos Términos, contáctenos:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mt-2">
              <li>Por correo electrónico: legal@sumarte.com</li>
              <li>Visitando esta página en nuestro sitio web: <Link href="/contacto" className="text-indigo-600 hover:underline">Contáctenos</Link></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
