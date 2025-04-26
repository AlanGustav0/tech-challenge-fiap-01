'use client';

import React, { useState } from 'react';
import Image from 'next/image'; // Ajuste conforme necessário
import './userPageHome.css'; // Estilos

const UserPageHome = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <div className="user-page">
            <div className="navbar">
                <div className="navbar-content">
                    <span className="username">Joana da Silva Olivens</span>
                    <Image 
                        className="user-icon" 
                        src="/icone_user.png" 
                        alt="User Icon" 
                        width={40} 
                        height={40} 
                        onClick={toggleMenu} // Abre/fecha o menu ao clicar
                    />
                </div>
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

            <div className="content">
                <div className="sidebar">
                    <ul className="menu-list">
                        <li className="menu-item">Início</li>
                        <hr />
                        <li className="menu-item">Transferências</li>
                        <hr />
                        <li className="menu-item">Investimentos</li>
                        <hr />
                        <li className="menu-item">Outros serviços</li>
                    </ul>
                </div>
                <div className="main-content">
                    <h1>Bem-vindo à Página do Usuário</h1>
                    {/* Outros conteúdos da página */}
                </div>
            </div>
        </div>
    );
};

export default UserPageHome;