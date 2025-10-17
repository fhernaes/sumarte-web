'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const FeatureCard = forwardRef(({ 
  icon: Icon, 
  title, 
  description, 
  className = '' 
}, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 mb-4">
        {Icon && <Icon className="w-6 h-6" />}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
});

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard;
