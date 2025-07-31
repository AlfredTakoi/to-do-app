// src/pages/ChecklistList.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChecklists, deleteChecklist } from '../api/checklist';
import { isLoggedIn } from '../utils/auth';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function ChecklistLists() {
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getChecklists();
      setChecklists(res.data.data);
    } catch (err) {
      console.error('Gagal mengambil data checklist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    } else {
      fetchData();
    }
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus checklist ini?')) return;
    try {
      await deleteChecklist(id);
      setChecklists(checklists.filter((c) => c.id !== id));
      alert('Item berhasil dihapus');
    } catch (err) {
      alert('Gagal menghapus checklist');
    }
  };

  return (
    <>
      <Navbar/>
      <div className="min-h-screen p-6 bg-gray-100 pt-20">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Daftar Checklist</h1>
            <button
              onClick={() => navigate('/checklists/new')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              + Checklist Baru
            </button>
          </div>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : checklists.length === 0 ? (
            <p>Tidak ada checklist.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {checklists.map((checklist) => (
                <div
                  key={checklist.id}
                  className="bg-white p-4 rounded shadow flex justify-between items-center"
                >
                  <Link
                    to={`/checklists/${checklist.id}`}
                    state={{ name: checklist.name }}
                  >
                    {checklist.name}
                  </Link>
                  <button
                    onClick={() => handleDelete(checklist.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
