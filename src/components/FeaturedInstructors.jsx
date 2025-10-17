'use client';

import { FiMusic } from 'react-icons/fi';
import { AnimatedSection } from './AnimatedSection';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

const featuredInstructors = [
  { 
    id: 1, 
    name: 'María González', 
    specialty: 'Piano y Teoría Musical', 
    experience: '10+ años enseñando',
    rating: '4.9',
    students: '250+ estudiantes'
  },
  { 
    id: 2, 
    name: 'Carlos Méndez', 
    specialty: 'Guitarra Clásica y Eléctrica', 
    experience: '8 años enseñando',
    rating: '4.8',
    students: '180+ estudiantes'
  },
  { 
    id: 3, 
    name: 'Sofía Ramírez', 
    specialty: 'Musicoterapia y Sonoterapia', 
    experience: '6 años de experiencia',
    rating: '5.0',
    sessions: '500+ sesiones'
  },
];

export function FeaturedInstructors() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Nuestros Profesionales</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conoce a nuestros instructores y terapeutas altamente calificados
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredInstructors.map((instructor, index) => (
            <AnimatedSection key={instructor.id} delay={index * 0.1}>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <FiMusic className="w-16 h-16 text-white/30" />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{instructor.name}</h3>
                  <p className="text-indigo-600 font-medium mb-3">{instructor.specialty}</p>
                  <div className="space-y-2 text-gray-600 flex-1">
                    <p className="flex items-center">
                      <span className="font-medium">Experiencia:</span>
                      <span className="ml-2">{instructor.experience}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="font-medium">Calificación:</span>
                      <span className="ml-2 flex items-center">
                        <span className="text-yellow-400 mr-1">★</span> {instructor.rating}/5
                      </span>
                    </p>
                    <p className="flex items-center">
                      <span className="font-medium">
                        {instructor.students ? 'Estudiantes:' : 'Sesiones:'}
                      </span>
                      <span className="ml-2">
                        {instructor.students || instructor.sessions}
                      </span>
                    </p>
                  </div>
                  <button className="mt-4 w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium py-2 px-4 rounded-lg transition-colors">
                    Ver perfil
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/profesionales" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Ver todos los profesionales <FiChevronRight className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
