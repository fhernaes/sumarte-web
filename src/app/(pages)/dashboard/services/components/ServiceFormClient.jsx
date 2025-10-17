'use client';

import { useRouter } from 'next/navigation';
import { FiDollarSign, FiMapPin, FiTag, FiInfo, FiCheck } from 'react-icons/fi';
import { useState } from 'react';
import ImageUpload from '@/components/ui/ImageUpload';
import { useServiceForm } from '../hooks/useServiceForm';

export default function ServiceFormClient({ categories = [], cities = [] }) {
  const router = useRouter();
  const [images, setImages] = useState([]);
  
  const {
    formData,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit: originalHandleSubmit,
  } = useServiceForm();

  // Handle form submission with images
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // If you need to handle the images before submission, you can do it here
    // For example, upload them to a storage service and get the URLs
    if (images.length > 0) {
      // Here you would typically upload the images and get the URLs
      // For now, we'll just use the first image's preview URL
      formData.photo = images[0].preview;
    }
    
    // Call the original form submission
    await originalHandleSubmit(e);
  };

  const handleCancel = () => {
    if (window.confirm('¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.')) {
      router.push('/dashboard/services');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Crear Nuevo Servicio</h1>
      
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
          <p className="flex items-center">
            <FiX className="mr-2" />
            {submitError}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título del Servicio <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`block w-full px-4 py-2 border ${errors.title ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Ej: Clases de guitarra personalizadas"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className={`block w-full px-4 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Describe detalladamente tu servicio..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`block w-full px-4 py-2 border ${errors.category ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Precio ($) <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiDollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className={`block w-full pl-10 pr-4 py-2 border ${errors.price ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="0.00"
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              Ciudad <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`block w-full pl-10 pr-4 py-2 border ${errors.city ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
              >
                <option value="">Selecciona una ciudad</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
              )}
            </div>
          </div>

          {/* Available for Offers */}
          <div className="flex items-center pt-6">
            <div className="flex items-center h-5">
              <input
                id="available_for_offers"
                name="available_for_offers"
                type="checkbox"
                checked={formData.available_for_offers}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="available_for_offers" className="font-medium text-gray-700">
                Acepto ofertas por este servicio
              </label>
              <p className="text-gray-500">Los usuarios podrán hacerte ofertas por este servicio</p>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Imágenes del Servicio
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Sube hasta 2 imágenes (JPG, PNG o WEBP, máx. 5MB cada una)
          </p>
          
          <ImageUpload
            value={images}
            onChange={(newImages) => {
              setImages(newImages);
              // Update form data with the first image
              if (newImages.length > 0) {
                handleChange({
                  target: { 
                    name: 'photo', 
                    value: newImages[0].preview 
                  }
                });
              } else {
                handleChange({
                  target: { 
                    name: 'photo', 
                    value: '' 
                  }
                });
              }
            }}
            maxFiles={2}
            maxSize={5 * 1024 * 1024} // 5MB
            className="mb-4"
          />
          
          {errors.photo && (
            <p className="mt-1 text-sm text-red-600">{errors.photo}</p>
          )}
          {formData.photo && !errors.photo && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Vista previa:</p>
              <img 
                src={formData.photo} 
                alt="Vista previa" 
                className="h-32 w-32 object-cover rounded-md border border-gray-200"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22%23F3F4F6%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Arial%22%20font-size%3D%2210%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%20fill%3D%229CA3AF%22%3EImagen%20no%20disponible%3C%2Ftext%3E%3C%2Fsvg%3E';
                }}
              />
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creando...
              </>
            ) : (
              <>
                <FiCheck className="-ml-1 mr-2 h-4 w-4" />
                Crear Servicio
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
