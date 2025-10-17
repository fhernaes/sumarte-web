import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useServiceForm(initialData = {}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    photo: '',
    category: '',
    price: '',
    city: '',
    available_for_offers: false,
    ...initialData
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateField = (name, value) => {
    switch (name) {
      case 'title':
      case 'description':
      case 'category':
      case 'city':
        return value.trim() ? '' : 'Este campo es obligatorio';
      case 'price':
        if (isNaN(value) || parseFloat(value) < 0) {
          return 'El precio debe ser un número mayor o igual a 0';
        }
        return '';
      case 'photo':
        if (value && !isValidUrl(value)) {
          return 'Por favor ingresa una URL válida';
        }
        return '';
      default:
        return '';
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      const error = validateField(name, fieldValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price) || 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el servicio');
      }

      // Redirect to services list or show success message
      router.push('/dashboard/services');
      router.refresh();
      
    } catch (error) {
      console.error('Error creating service:', error);
      setSubmitError(error.message || 'Ocurrió un error al crear el servicio');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit,
  };
}
