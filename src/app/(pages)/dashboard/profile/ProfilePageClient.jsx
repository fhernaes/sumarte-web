'use client';

import { useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useEditableForm } from './hooks/useEditableForm';
import ProfileHeader from './components/ProfileHeader';
import ProfileField from './components/ProfileField';
import ProfileActions from './components/ProfileActions';

const FIELD_CONFIG = {
  name: {
    type: 'text',
    icon: 'user',
    placeholder: 'Tu nombre completo',
    required: true,
  },
  email: {
    type: 'email',
    icon: 'mail',
    placeholder: 'tu@email.com',
    required: true,
    readOnly: true,
  },
  educational_level: {
    type: 'text',
    icon: 'award',
    placeholder: 'Ej: Universitario, Técnico, etc.',
  },
  institution: {
    type: 'text',
    icon: 'book',
    placeholder: 'Nombre de la institución',
  },
  degree: {
    type: 'text',
    icon: 'award',
    placeholder: 'Ej: Licenciatura en Música',
  },
  experience: {
    type: 'textarea',
    icon: 'briefcase',
    placeholder: 'Describe tu experiencia profesional...',
    rows: 3,
  },
  video_presentation: {
    type: 'url',
    icon: 'film',
    placeholder: 'https://youtube.com/ejemplo...',
  },
};

const FIELD_LABELS = {
  name: 'Nombre completo',
  email: 'Correo electrónico',
  educational_level: 'Nivel educativo',
  institution: 'Institución',
  degree: 'Título/Grado',
  experience: 'Experiencia',
  video_presentation: 'Video de presentación',
};

export default function ProfilePageClient({ initialData }) {
  const { data: session, update } = useSession();
  const {
    formData,
    isEditing,
    isSaving,
    handleChange,
    handleSubmit,
    toggleEdit,
  } = useEditableForm(initialData, async (formData) => {
    // Here you would typically save to your API
    console.log('Saving profile data:', formData);
    // Example:
    // const response = await fetch('/api/profile', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });
    // if (!response.ok) throw new Error('Failed to save profile');
    
    // Update the session with new data
    await update({
      ...session,
      user: {
        ...session.user,
        ...formData
      }
    });
  });

  const handleNameChange = useCallback((value) => {
    handleChange('name', value);
  }, [handleChange]);

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow overflow-hidden sm:rounded-lg max-w-4xl mx-auto">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Perfil de Usuario
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Información personal y detalles
        </p>
      </div>

      <div className="px-4 py-5 sm:p-0">
        <ProfileHeader
          name={formData.name}
          email={formData.email}
          avatar={formData.avatar}
          isEditing={isEditing}
          onNameChange={handleNameChange}
        />

        <dl className="divide-y divide-gray-200">
          {Object.entries(FIELD_CONFIG).map(([field, config]) => (
            <ProfileField
              key={field}
              label={FIELD_LABELS[field]}
              name={field}
              value={formData[field] || ''}
              type={config.type}
              icon={config.icon}
              placeholder={config.placeholder}
              readOnly={config.readOnly || !isEditing}
              required={config.required}
              rows={config.rows}
              onChange={(_, value) => handleChange(field, value)}
              isEditing={isEditing && !config.readOnly}
            />
          ))}
        </dl>
      </div>

      <ProfileActions
        isEditing={isEditing}
        isSaving={isSaving}
        onEdit={toggleEdit}
        onCancel={toggleEdit}
      />
    </form>
  );
}
