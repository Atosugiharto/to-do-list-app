import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChecklistList from "./pages/ChecklistList";
import ChecklistDetail from "./pages/ChecklistDetail";
import AddChecklist from "./pages/AddChecklist";
import AddItem from "./pages/AddItem";
import ItemDetail from "./pages/ItemDetail";
import RenameItem from "./pages/RenameItem";
import Navbar from "./shared-components/Navbar";

export default function App() {
  const { token } = useAuth();

  return (
    <Router>
      {token && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {token ? (
          <>
            <Route path="/checklists" element={<ChecklistList />} />
            <Route path="/checklists/:id" element={<ChecklistDetail />} />
            <Route path="/checklists/new" element={<AddChecklist />} />
            <Route path="/checklists/:id/add-item" element={<AddItem />} />
            <Route
              path="/checklists/:id/items/:itemId"
              element={<ItemDetail />}
            />
            <Route
              path="/checklists/:id/items/:itemId/rename"
              element={<RenameItem />}
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}
