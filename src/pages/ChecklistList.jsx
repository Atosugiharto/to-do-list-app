import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function ChecklistList() {
  const [checklists, setChecklists] = useState([]);

  useEffect(() => {
    axios.get("/checklist").then((res) => setChecklists(res.data.data));
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Checklist ini akan dihapus secara permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      await axios.delete(`/checklist/${id}`);
      setChecklists(checklists.filter((c) => c.id !== id));

      Swal.fire("Terhapus!", "Checklist berhasil dihapus.", "success");
    }
  };

  return (
    <div className="p-4">
      <Link
        to="/checklists/new"
        className="block mb-4 text-blue-600 hover:underline"
      >
        + Buat Checklist
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {checklists?.map((c) => (
          <div
            key={c?.id}
            className="bg-yellow-100 p-4 rounded-lg shadow hover:shadow-md transition relative"
          >
            <Link to={`/checklists/${c?.id}`} className="block">
              <h2 className="font-semibold text-lg text-gray-800">
                {c?.name ? c?.name : "Untitled"}
              </h2>
            </Link>
            <button
              onClick={() => handleDelete(c?.id)}
              className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
