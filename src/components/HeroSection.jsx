'use client';

import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { OptimizedImage } from './OptimizedImage';
import { useState } from 'react';
import Link from 'next/link';

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="relative bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
      <OptimizedImage  
        alt="Música" 
        className="absolute inset-0 w-full h-full opacity-20"
        withOverlay={false}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl text-indigo-50 font-bold mb-6"
          >
            Educación Musical de Excelencia
          </motion.h1>
          
          <div className="max-w-2xl mx-auto">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-4 border border-transparent rounded-full bg-white/10 backdrop-blur-sm text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
          placeholder="Busca clases, profesores, terapeutas o servicios..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button 
          className="absolute right-1.5 top-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
          aria-label="Buscar"
        >
          Buscar
        </button>
      </div>
      
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <span className="text-sm text-indigo-200">Populares:</span>
        {['Clases de piano', 'Musicoterapia', 'Composición', 'Arreglos musicales'].map((tag) => (
          <button 
            key={tag}
            type="button"
            onClick={() => onChange(tag)}
            className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
