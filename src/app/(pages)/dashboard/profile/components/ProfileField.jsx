'use client';

import { FiUser, FiMail, FiAward, FiBook, FiBriefcase, FiFilm } from 'react-icons/fi';

const iconComponents = {
  user: FiUser,
  mail: FiMail,
  award: FiAward,
  book: FiBook,
  briefcase: FiBriefcase,
  film: FiFilm,
};

export default function ProfileField({
  label,
  name,
  value,
  type = 'text',
  icon = 'user',
  placeholder = '',
  readOnly = false,
  required = false,
  rows = 1,
  onChange,
  isEditing = false,
  className = '',
}) {
  const IconComponent = iconComponents[icon] || FiUser;
  
  return (
    <div className={`py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${className}`}>
      <dt className="text-sm font-medium text-gray-500 flex items-start">
        <IconComponent className="mr-2 h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
        {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {isEditing ? (
          type === 'textarea' ? (
            <textarea
              name={name}
              value={value || ''}
              onChange={(e) => onChange(name, e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows={rows}
              readOnly={readOnly}
              required={required}
            />
          ) : (
            <input
              type={type}
              name={name}
              value={value || ''}
              onChange={(e) => onChange(name, e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              readOnly={readOnly}
              required={required}
            />
          )
        ) : (
          <div className={!value ? 'text-gray-400' : ''}>
            {value || 'No especificado'}
            {type === 'url' && value && (
              <a 
                href={value} 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                (Abrir enlace)
              </a>
            )}
          </div>
        )}
      </dd>
    </div>
  );
}
