// src/pages/ChecklistCreate.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createChecklist } from "../api/checklist";
import { isLoggedIn } from "../utils/auth";
import Navbar from "../components/Navbar";

export default function ChecklistCreate() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createChecklist({ name });
      navigate("/checklists");
    } catch (err) {
      setError(err.message || "Gagal membuat checklist");
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Buat Checklist Baru
          </h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <input
            type="text"
            placeholder="Nama Checklist"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            onClick={() => navigate("/checklists")}
            className="mt-3 w-full text-sm text-gray-500 hover:underline"
          >
            Kembali ke Daftar Checklist
          </button>
        </form>
      </div>
    </>
  );
}
