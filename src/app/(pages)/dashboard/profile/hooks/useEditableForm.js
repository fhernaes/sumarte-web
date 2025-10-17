import { useState, useCallback, useEffect } from 'react';

export function useEditableForm(initialData, onSave) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);

  // Update form data when initialData changes
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    if (e) e.preventDefault();
    try {
      setIsSaving(true);
      await onSave(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  }, [formData, onSave]);

  const toggleEdit = useCallback(() => {
    setIsEditing(prev => {
      // Reset form if canceling edit
      if (prev) {
        setFormData(initialData);
      }
      return !prev;
    });
  }, [initialData]);

  return {
    formData,
    isEditing,
    isSaving,
    handleChange,
    handleSubmit,
    toggleEdit,
  };
}
