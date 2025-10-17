'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function AnimatedSection({ 
  children, 
  delay = 0,
  className = '',
  ...props 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

  if (hasAnimated) {
    return children;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay }}
      onViewportEnter={() => setIsVisible(true)}
      viewport={{ once: true, margin: "-100px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
