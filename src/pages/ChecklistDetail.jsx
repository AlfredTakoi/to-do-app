import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getChecklist } from '../api/checklist';
import { deleteItem, toggleItemStatus } from '../api/item';
import Navbar from '../components/Navbar';
import { isLoggedIn } from '../utils/auth';

export default function ChecklistDetail() {
  const { id } = useParams();
  const [checklist, setChecklist] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchChecklist = async () => {
    try {
      const res = await getChecklist(id);
      setChecklist(res.data.data);
    } catch (err) {
      console.error('Gagal mengambil detail checklist');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (checklistId, itemId, itemCompletionStatus) => {
    try {
      await toggleItemStatus(checklistId, itemId, { itemCompletionStatus: !itemCompletionStatus });
      alert("Status item berhasil diupdate")
      fetchChecklist();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteItem = async (checklistId, itemId) => {
    if (!confirm('Yakin ingin menghapus Item ini?')) return;
    try {
      await deleteItem(checklistId, itemId);
      fetchChecklist();
      alert('Item berhasil dihapus');
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus item');
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    } else {
      fetchChecklist();
    }
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  if (!checklist) return <p className="p-6 text-center">Checklist Detail tidak ditemukan.</p>;

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-2xl mx-auto pt-20">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/checklists/`)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Kembali
            </button>
            <button
              onClick={() => navigate(`/checklists/${id}/items/new`)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              + Tambah Item
            </button>
          </div>
        </div>

        {checklist.length === 0 ? (
          <p>Belum ada item.</p>
        ) : (
          <ul className="space-y-3">
            {checklist.map((item) => (
              <li
                key={item.id}
                className={`p-3 rounded shadow flex justify-between items-center ${
                  item.itemCompletionStatus ? 'bg-green-100' : 'bg-white'
                }`}
              >
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={item.itemCompletionStatus}
                    onChange={() => handleToggleStatus(id, item.id, item.itemCompletionStatus)}
                  />
                  <span
                    className={`cursor-pointer ${
                      item.itemCompletionStatus ? 'line-through text-gray-500' : ''
                    }`}
                    // onClick={() => navigate(`/items/${item.id}`)}
                  >
                    {item.name}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`items/${item.id}/edit`)}
                    className="text-orange-500 text-sm hover:underline"
                  >
                    Ubah
                  </button>
                  <button
                    onClick={() => handleDeleteItem(id, item.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
