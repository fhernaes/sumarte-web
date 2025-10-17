import { FiMusic, FiHeadphones, FiMic } from 'react-icons/fi';
import { AnimatedSection } from './AnimatedSection';

const serviceCategories = [
  { 
    icon: FiMusic, 
    title: 'Clases de Música', 
    description: 'Aprende a tocar tu instrumento favorito con profesores certificados',
    count: '1,245'
  },
  { 
    icon: FiHeadphones, 
    title: 'Musicoterapia', 
    description: 'Terapias con sonido para bienestar y desarrollo personal',
    count: '342'
  },
  { 
    icon: FiMic, 
    title: 'Musicalización', 
    description: 'Música original para tus proyectos audiovisuales',
    count: '876'
  },
  { 
    icon: FiMusic, 
    title: 'Partituras y Arreglos', 
    description: 'Servicios profesionales de transcripción y arreglos musicales',
    count: '523'
  },
];

export async function ServiceCategories() {
  // In a real app, you would fetch this data
  const categories = serviceCategories;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <AnimatedSection key={category.title} delay={index * 0.1}>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <category.icon className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-xl mb-2">{category.title}</h3>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <p className="text-sm text-indigo-600 font-medium">
              {category.count} servicios disponibles
            </p>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
