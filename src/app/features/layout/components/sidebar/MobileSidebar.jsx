'use client';

import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { NavContent } from './NavContent';

export const MobileSidebar = ({ isOpen, onClose }) => (
  <Dialog
    as="div"
    open={isOpen}
    onClose={onClose}
    className="md:hidden relative z-50"
  >
    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
    <Dialog.Panel className="fixed top-0 left-0 h-full w-64 bg-white p-4 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-bold text-indigo-600">Sumarte</h1>
        <button 
          onClick={onClose}
          className="p-1 rounded-md text-gray-500 hover:bg-gray-100"
          aria-label="Cerrar menú"
        >
          <X size={24} />
        </button>
      </div>
      <NavContent onItemClick={onClose} />
    </Dialog.Panel>
  </Dialog>
);
