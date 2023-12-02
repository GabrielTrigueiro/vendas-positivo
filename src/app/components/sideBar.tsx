import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/vendas">Vendas</Link>
    </div>
  );
}

export default SideBar;
