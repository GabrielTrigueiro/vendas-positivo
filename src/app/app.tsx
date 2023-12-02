import { Routes, Route } from "react-router-dom";
import DefaultRoute from "../core/utils/defaultRoute";
import ProtectedRoute from "../core/utils/protectedRoute";
import Login from "./views/login";
import Dashboard from "./views/dashboard";

function App() {
  return (
    <Routes>
      <Route element={<DefaultRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
