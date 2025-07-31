// src/pages/ItemCreate.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createItem } from '../api/item';
import Navbar from '../components/Navbar';

export default function ItemCreate() {
  const { id: checklistId } = useParams();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createItem(checklistId, { name });
      navigate(`/checklists/${checklistId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menambahkan item');
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
          <h2 className="text-xl font-bold mb-4 text-center">Tambah Item ke Checklist</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <input
            type="text"
            placeholder="Nama Item"
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
