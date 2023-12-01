import { Routes, Route } from "react-router-dom";
import DefaultRoute from "../core/utils/defaultRoute";
import ProtectedRoute from "../core/utils/protectedRoute";
import Login from "./views/login";
import Home from "./views/home";

function App() {
  return (
    <Routes>
      <Route element={<DefaultRoute />}>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
