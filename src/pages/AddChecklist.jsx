import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddChecklist() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await axios.post("/checklist", { name });
      setName("");

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Checklist berhasil dibuat.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/checklists");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text:
          error?.response?.data?.message ||
          "Terjadi kesalahan saat membuat checklist.",
      });
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg border border-gray-200">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Buat checklist..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Tambah
        </button>
      </form>
    </div>
  );
}
