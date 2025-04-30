'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import './userPageHome.css'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const UserPageHome = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [isBalanceVisible, setIsBalanceVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };
    
    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    };

   const balance = 2500.00;

   const getCurrentDate = () => {
    const now = new Date();
    const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
    return now.toLocaleDateString('pt-BR', options);
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
                        onClick={toggleMenu} 
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
                <div className="balance-card">
                    <h2>Olá, Joana! :)</h2>
                    <p>{getCurrentDate()}</p> 
                    <div className="balance-info">
                        <span>Saldo</span>
                        <button onClick={toggleBalanceVisibility}>
                            {isBalanceVisible ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                    <p className='contaCorrente'>
                        Conta Corrente
                    </p>
                    <p className='valorSaldo'>
    {isBalanceVisible ? `R$ ${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '●●●,●●'}
</p>
                </div>
                </div>
            </div>
        </div>
    );
};

export default UserPageHome;