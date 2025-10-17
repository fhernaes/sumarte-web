'use client';

import { useCallback, useState, useRef } from 'react';
import { FiUpload, FiX, FiImage, FiCamera } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILES = 2;

export default function ImageUpload({ 
  value = [], 
  onChange,
  maxFiles = MAX_FILES,
  maxSize = MAX_FILE_SIZE,
  className = ''
}) {
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const newErrors = [];
    
    // Check total files won't exceed max
    if (value.length + acceptedFiles.length > maxFiles) {
      newErrors.push(`Solo puedes subir hasta ${maxFiles} imágenes`);
      setErrors(newErrors);
      return;
    }

    // Process accepted files
    const newImages = [];
    
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      
      reader.onload = () => {
        newImages.push({
          file,
          preview: URL.createObjectURL(file),
          name: file.name,
          size: file.size
        });
        
        if (newImages.length === acceptedFiles.length) {
          onChange([...value, ...newImages]);
        }
      };
      
      reader.readAsDataURL(file);
    });

    // Handle rejected files
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(({ file, errors }) => {
        errors.forEach(error => {
          if (error.code === 'file-too-large') {
            newErrors.push(`El archivo ${file.name} es demasiado grande (máx. ${maxSize / (1024 * 1024)}MB)`);
          } else if (error.code === 'file-invalid-type') {
            newErrors.push(`Formato no válido: ${file.name}. Solo se permiten JPG, PNG o WEBP`);
          } else {
            newErrors.push(`Error con el archivo ${file.name}: ${error.message}`);
          }
        });
      });
    }
    
    setErrors(newErrors);
  }, [value, maxFiles, maxSize, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxSize: maxSize,
    maxFiles: maxFiles - value.length,
    multiple: maxFiles > 1,
    disabled: value.length >= maxFiles
  });

  const removeImage = (index) => {
    const newImages = [...value];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    onChange(newImages);
    setErrors([]);
  };

  const openFileDialog = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
          {errors.map((error, i) => (
            <p key={i} className="text-sm flex items-center">
              <FiX className="mr-2 flex-shrink-0" />
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Image Previews */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        {value.map((image, index) => (
          <div key={index} className="relative group">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={image.preview}
                alt={`Vista previa ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              aria-label="Eliminar imagen"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        ))}

        {/* Upload Area */}
        {value.length < maxFiles && (
          <div 
            {...getRootProps({
              onClick: (e) => e.stopPropagation() // Prevent double triggering
            })} 
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <input 
              {...getInputProps({
                ref: fileInputRef,
                onClick: (e) => e.stopPropagation()
              })} 
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center h-full">
              <div className="bg-blue-100 p-3 rounded-full mb-2">
                <FiUpload className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-sm text-gray-600">
                {isDragActive ? (
                  'Suelta las imágenes aquí'
                ) : (
                  <>
                    <button 
                      type="button"
                      onClick={openFileDialog}
                      className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 px-1"
                    >
                      Sube una imagen
                    </button>
                    <span> o arrástrala aquí</span>
                  </>
                )}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG o WEBP (máx. {maxSize / (1024 * 1024)}MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Upload Button (for better mobile UX) */}
      {value.length === 0 && (
        <button
          type="button"
          onClick={openFileDialog}
          className="sm:hidden w-full mt-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiCamera className="inline-block mr-2 h-4 w-4" />
          Subir imágenes
        </button>
      )}
    </div>
  );
}

// Helper function to validate file size and type
const validateFile = (file, maxSize) => {
  if (file.size > maxSize) {
    return {
      code: 'file-too-large',
      message: `El archivo es demasiado grande (máx. ${maxSize / (1024 * 1024)}MB)`
    };
  }
  
  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    return {
      code: 'file-invalid-type',
      message: 'Formato de archivo no válido'
    };
  }
  
  return null;
};
