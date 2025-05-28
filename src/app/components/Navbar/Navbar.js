'use client';

import Image from 'next/image';
import React, { useState,useEffect } from 'react';
import './Navbar.css'; // Importando o CSS do Navbar

export async function getUser(id) {
  const response = await fetch(`http://localhost:4000/usuarios?id=${id}`);

  if (response.ok) {
    const user = await response.json();

    return user[0];
  }

  return null;
}

export default function Navbar(userId) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [user, setUser] = useState({ id: 0, userName: "", email: "" });
  
    useEffect(() => {
      getUser(userId.id).then((data) => {
        if (data) setUser({
          id: data.id,
          userName: data.userName,
          email: data.email,
        });
      });
    }, [userId.id]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <span className="username">{user.userName}</span>
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
