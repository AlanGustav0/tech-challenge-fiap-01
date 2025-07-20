'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import './Navbar.css'; // Importando o CSS do Navbar
import { useSelector } from 'react-redux';

export default function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  
  const user = useSelector((state) => state.user);

  console.log(user);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <span className="username">{user.name}</span>
        <Image
          className="user-icon"
          src="/icone_user.png"
          alt="User Icon"
          width={40}
          height={40}
          onClick={toggleMenu} // Abre/fecha o menu ao clicar
        />
      </div>
      {menuVisible && (
        <div className="user-menu">
          <ul className="user-menu-list">
            <li className="user-menu-item">Minha conta</li>
            <hr />

            <li className="user-menu-item">Configurações</li>
            <hr />
            <li className="user-menu-item">Sair</li>
          </ul>
        </div>
      )}
    </div>
  );
}
