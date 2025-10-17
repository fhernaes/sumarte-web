'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export const NavLink = ({
  href,
  icon: Icon,
  label,
  isActive,
  onClick,
}) => (
  <motion.div
    initial={false}
    animate={{
      backgroundColor: isActive ? 'rgba(238, 242, 255, 0.7)' : 'transparent',
      borderLeft: isActive ? '4px solid #4f46e5' : '4px solid transparent',
    }}
    whileHover={{
      backgroundColor: 'rgba(238, 242, 255, 0.7)',
    }}
    transition={{
      duration: 0.15,
      ease: 'easeInOut',
    }}
    className="w-full rounded-lg overflow-hidden"
  >
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`w-full flex items-center px-4 py-3 text-sm font-medium
        ${isActive 
          ? 'text-indigo-700' 
          : 'text-gray-700 hover:text-gray-900'
        }`}
      onClick={onClick}
      prefetch={!isActive}
    >
      <Icon 
        className={`mr-3 h-5 w-5 flex-shrink-0 ${
          isActive ? 'text-indigo-500' : 'text-gray-500'
        }`} 
        aria-hidden="true"
      />
      <span className="truncate">{label}</span>
    </Link>
  </motion.div>
);
