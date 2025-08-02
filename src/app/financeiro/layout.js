'use client';

import ExtratoCard from "../components/ExtratoCard/Extratocard";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import BalancedCardComponent from "../components/BalancedCard/balancedCard";
import "./layout.css";
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { updateUser } from "../redux/userSlice";
import { getUserById } from "../financeiro/util-services";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const url = usePathname();
  const id = parseInt(url.split('=')[1]);


  useEffect(() => {
    getUserById(id).then((data) => {
      if (data)
        dispatch(updateUser({ name: data.userName, email: data.email, id: data.id }));
    });
  }, [id]);

  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <div>
          <Sidebar />
        </div>
        <div>
          <div className="layout-content-inner">
          <BalancedCardComponent />
          {children}
        </div>
        </div>
        <div>
          <ExtratoCard />
        </div>
      </div>
    </div>
  );
}
