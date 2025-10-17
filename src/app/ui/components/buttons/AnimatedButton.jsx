'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const AnimatedButton = forwardRef(({ 
  children, 
  className = '', 
  variant = 'primary',
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500',
    ghost: 'text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500',
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
});

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;
