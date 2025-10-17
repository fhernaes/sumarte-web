'use client';

import { FiEdit2, FiSave, FiX } from 'react-icons/fi';

export default function ProfileActions({ 
  isEditing, 
  isSaving, 
  onEdit, 
  onCancel 
}) {
  return (
    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
      <div className="flex justify-end space-x-2">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={onCancel}
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <FiX className="-ml-1 mr-2 h-4 w-4" />
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <FiSave className="-ml-1 mr-2 h-4 w-4" />
              {isSaving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiEdit2 className="-ml-1 mr-2 h-4 w-4" />
            Editar perfil
          </button>
        )}
      </div>
    </div>
  );
}
