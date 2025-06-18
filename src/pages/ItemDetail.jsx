import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { useParams } from 'react-router-dom';

export default function ItemDetail() {
  const { id, itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`/checklist/${id}/item/${itemId}`).then((res) => setItem(res.data.data));
  }, [id, itemId]);

  if (!item) return <div className="text-center mt-10 text-gray-600">Memuat...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border">
        <h1 className="text-xl font-bold mb-4">Detail Item</h1>
        <div className="space-y-2">
          <p><strong>Nama:</strong> <span className="text-gray-700">{item.itemName}</span></p>
          <p><strong>Status:</strong> <span className={item.itemCompletionStatus ? 'text-green-600' : 'text-yellow-600'}>{item.itemCompletionStatus ? 'Selesai' : 'Belum selesai'}</span></p>
        </div>
      </div>
    </div>
  );
}