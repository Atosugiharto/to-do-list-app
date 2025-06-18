import { useState } from 'react';
import axios from '../api/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';

export default function RenameItem() {
  const { id, itemId } = useParams();
  const [itemName, setItemName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemName.trim()) return;
    await axios.put(`/checklist/${id}/item/rename/${itemId}`, { itemName });
    navigate(`/checklists/${id}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4 border">
        <h1 className="text-xl font-semibold text-center text-gray-800">Ubah Nama Checklist</h1>
        <input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Nama baru..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
