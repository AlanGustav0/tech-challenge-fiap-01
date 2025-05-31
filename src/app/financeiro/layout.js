'use client';

import ExtratoCard from "../components/ExtratoCard/Extratocard";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import BalancedCardComponent from "../components/BalancedCard/balancedCard";
import "./layout.css";
import { usePathname } from "next/navigation";


export default function Layout({ children }) {
  const url = usePathname();

  const id = parseInt(url.split('=')[1]);

  return (
    <div className="layout-container">
      <Navbar id={id}/>
      <div className="layout-content">
        <div>
          <Sidebar id={id}/>
        </div>
        <div className="layout-content-inner">
          <BalancedCardComponent id={id}/>
          {children}
        </div>
        <div>
          <ExtratoCard id={id} />
        </div>
      </div>
    </div>
  );
}
