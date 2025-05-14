import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import "./layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <div>
          <Sidebar />
        </div>
        <div>{children}</div>
        <div>Componente lateral direita </div>
      </div>
    </div>
  );
}
