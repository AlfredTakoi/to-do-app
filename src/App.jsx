import Login from './pages/Login';
import Register from './pages/Register';
import ChecklistLists from './pages/Checklists';
import ChecklistCreate from './pages/ChecklistCreate';
import ChecklistDetail from './pages/ChecklistDetail';
import ItemCreate from './pages/ItemsCreate';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checklists" element={<ChecklistLists />} />
        <Route path="/checklists/new" element={<ChecklistCreate />} />
        <Route path="/checklists/:id" element={<ChecklistDetail />} />
        <Route path="/checklists/:id/items/new" element={<ItemCreate />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
