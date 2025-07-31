import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItem, updateItem } from "../api/item";
import Navbar from "../components/Navbar";
import { isLoggedIn } from '../utils/auth';

export default function ItemEdit() {
  const { checklistId, itemId } = useParams();
  const [itemName, setItemName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchItem = async () => {
    try {
      const res = await getItem(checklistId, itemId);
      const item = res.data.data;
      if (item) {
        setItemName(item.name);
      } else {
        setError("Item tidak ditemukan");
      }
    } catch (err) {
      setError("Gagal mengambil data item");
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login")
    } else {
      fetchItem();
    }
  }, [checklistId, itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateItem(checklistId, itemId, { itemName: itemName });
      navigate(`/checklists/${checklistId}`);
    } catch (err) {
      setError(err.message || "Gagal menambahkan item");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
        >
          <h2 className="text-xl font-bold mb-4 text-center">
            Tambah Item ke Checklist
          </h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <input
            type="text"
            placeholder="Nama Item"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={() => navigate(`/checklists/${checklistId}`)}
            className="mt-3 w-full text-sm text-gray-500 hover:underline"
          >
            Kembali ke Checklist
          </button>
        </form>
      </div>
    </>
  );
}
