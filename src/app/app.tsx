import { Routes, Route } from "react-router-dom";
import DefaultRoute from "core/utils/defaultRoute";
import ProtectedRoute from "core/utils/protectedRoute";
import Login from "app/views/login";
import Dashboard from "app/views/dashboard";
import Sales from "app/views/sales";

function App() {
  return (
    <Routes>
      <Route element={<DefaultRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vendas" element={<Sales />} />
      </Route>
    </Routes>
  );
}

export default App;
