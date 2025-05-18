import ExtratoCard from "../components/ExtratoCard/Extratocard";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import BalancedCardComponent from "../components/BalancedCard/balancedCard";
import "./layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <div>
          <Sidebar />
        </div>
        <div className="layout-content-inner">
          <BalancedCardComponent />
          {children}</div>
        <div><ExtratoCard /></div>
      </div>
    </div>
  );
}
