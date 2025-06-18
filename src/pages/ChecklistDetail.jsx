import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function ChecklistDetail() {
  const { id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`/checklist/${id}/item`).then((res) => setItems(res.data.data));
  }, [id]);

  const handleToggle = async (itemId) => {
    await axios.put(`/checklist/${id}/item/${itemId}`);
    setItems((prev) =>
      prev.map((item) =>
        item?.id === itemId
          ? { ...item, itemCompletionStatus: !item?.itemCompletionStatus }
          : item
      )
    );
  };

  const handleDelete = async (itemId) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus item ini?",
      text: "Item akan dihapus dari checklist.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      await axios.delete(`/checklist/${id}/item/${itemId}`);
      setItems(items.filter((item) => item?.id !== itemId));
      Swal.fire("Terhapus!", "Item checklist berhasil dihapus.", "success");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="text-sm mb-4">
        kembali ke{" "}
        <Link to="/checklists" className="text-blue-600 hover:underline">
          Daftar To Do
        </Link>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Detail Checklist</h1>
        <Link
          to={`/checklists/${id}/add-item`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Tambah Item
        </Link>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="text-center text-gray-500 italic mt-8">
            Belum ada item checklist. Tambahkan satu untuk memulai.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item?.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item?.itemCompletionStatus}
                  onChange={() => handleToggle(item?.id)}
                />
                <span
                  className={
                    item?.itemCompletionStatus
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }
                >
                  {item?.name}
                </span>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/checklists/${id}/items/${item?.id}/rename`}
                  className="text-blue-500 hover:underline"
                >
                  Ubah
                </Link>
                <button
                  onClick={() => handleDelete(item?.id)}
                  className="text-red-500 hover:underline"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
