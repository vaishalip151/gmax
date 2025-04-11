import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<User, 'id'>) => void;
  initialData?: User | null;
}

const ModalForm: React.FC<Props> = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        role: initialData.role,
      });
    } else {
      setFormData({ name: '', email: '', role: '' });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded w-96">
        <h2 className="text-lg font-bold mb-3">{initialData ? 'Edit' : 'Create'} User</h2>
        <input
          className="border p-2 w-full mb-2"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          className="border p-2 w-full mb-2"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="border p-2 w-full mb-4"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-1 border rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-1 bg-blue-600 text-white rounded">
            {initialData ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;