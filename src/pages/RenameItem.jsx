import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

export default function RenameItem() {
  const { id, itemId } = useParams();
  const [itemName, setItemName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/checklist/${id}/item/${itemId}`).then((res) => {
      setItemName(res.data.data.itemName);
    });
  }, [id, itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemName.trim()) return;
    await axios.put(`/checklist/${id}/item/rename/${itemId}`, { itemName });
    navigate(`/checklists/${id}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4 border"
      >
        <h1 className="text-xl font-semibold text-center text-gray-800">
          Ubah Nama Item
        </h1>

        <input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Nama baru..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Kembali
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
