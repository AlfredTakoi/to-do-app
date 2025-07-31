// src/components/Navbar.jsx
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white fixed top-0 w-full  shadow-md px-6 py-3 flex justify-between items-center">
      <h1
        onClick={() => navigate('/checklists')}
        className="text-lg font-bold cursor-pointer"
      >
        📝 To-Do App
      </h1>

      <button
        onClick={handleLogout}
        className="text-sm text-red-600 hover:underline"
      >
        Logout
      </button>
    </nav>
  );
}
