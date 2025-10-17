'use client';

import { FiUser as FiAvatar } from 'react-icons/fi';
import Image from 'next/image';

export default function ProfileHeader({ 
  name, 
  email, 
  avatar, 
  isEditing, 
  onNameChange 
}) {
  return (
    <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
          {avatar ? (
            <Image
              src={avatar.startsWith('data:') ? avatar : `data:image/jpeg;base64,${avatar}`}
              alt="Avatar"
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          ) : (
            <FiAvatar className="h-8 w-8 text-indigo-600" />
          )}
        </div>
        <div className="min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={name || ''}
              onChange={(e) => onNameChange(e.target.value)}
              className="text-xl font-bold text-gray-900 bg-gray-50 border border-gray-300 rounded-md px-3 py-1 w-full"
              placeholder="Tu nombre"
              required
            />
          ) : (
            <h1 className="text-xl font-bold text-gray-900 truncate">
              {name || 'Usuario'}
            </h1>
          )}
          <p className="text-sm text-gray-500 truncate">{email}</p>
        </div>
      </div>
    </div>
  );
}
