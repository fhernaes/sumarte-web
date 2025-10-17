// src/app/ui/components/inputs/Input.jsx
'use client';

export function Input({ 
  label, 
  error, 
  className = '', 
  ...props 
}) {
  const inputId = crypto.randomUUID(); // Alternativa a useId() sin importar React
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        className={`
          w-full px-4 py-2 border rounded-md 
          focus:outline-none focus:ring-2 focus:ring-indigo-300
          transition
          ${error 
            ? 'border-red-500 focus:ring-red-200' 
            : 'border-gray-300 focus:border-indigo-500'
          }
          ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      
      {error && (
        <p 
          id={`${inputId}-error`} 
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}