import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddItem() {
  const [itemName, setItemName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    try {
      await axios.post(`/checklist/${id}/item`, { itemName });
      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Item checklist berhasil ditambahkan.",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate(`/checklists/${id}`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text:
          error?.response?.data?.message ||
          "Terjadi kesalahan saat menambahkan item.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4 border"
      >
        <h1 className="text-xl font-semibold text-gray-800 text-center">
          Tambahkan Catatan Baru
        </h1>
        <input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Tulis item checklist..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
