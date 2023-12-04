import { Routes, Route, Navigate } from "react-router-dom";
import DefaultRoute from "core/utils/defaultRoute";
import ProtectedRoute from "core/utils/protectedRoute";
import Login from "app/views/login";
import Dashboard from "app/views/dashboard";
import Sales from "app/views/sales";
import SingOn from "./views/singOn";
import EditUser from "./views/editUser";

function App() {
  return (
    <Routes>
      <Route element={<DefaultRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<SingOn />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vendas" element={<Sales />} />
        <Route path="/editarUsuario" element={<EditUser />} />
      </Route>
      <Route path="/*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
