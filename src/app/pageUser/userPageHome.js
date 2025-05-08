'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './userPageHome.css'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const UserPageHome = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [isBalanceVisible, setIsBalanceVisible] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setMenuVisible((prev) => !prev);
    };

    const closeMenu = () => {
        setMenuVisible(false);
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

    const handleTransaction = () => {
        const transactionType = document.getElementById("tipoTransacao").value;
        const transactionValue = document.getElementById("valorTransacao").value;

   

    
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuVisible && menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuVisible]);

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
                <div className="user-menu" ref={menuRef}>
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
                    <div className="left-column">
                        <div className="balance-card">
                            <h2>Olá, Joana! :)</h2>
                            <p>{getCurrentDate()}</p>
                            <div className="balance-info">
                                <span>Saldo</span>
                                <button onClick={toggleBalanceVisibility}>
                                    {isBalanceVisible ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                            <p className='contaCorrente'>Conta Corrente</p>
                            <p className='valorSaldo'>
                                {isBalanceVisible ? `R$ ${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '●●●,●●'}
                            </p>
                        </div>

                        <div className="bloco-transacao">
                            <h3 className='novaTrasacao'>Nova Transação</h3>
                            <div className="select-container">
                            <select id="tipoTransacao">
                                <option value="">Selecione o tipo de transação</option>
                                <option value="deposito">Câmbio de Moeda</option>
                                <option value="saque">DOC/TED</option>
                                <option value="transferencia">Empréstimos e Financiamento</option>
                            </select>
                        </div>
                        <label htmlFor="valorTransacao" style={{ color: '#DEE9EA' }}>Valor</label>
                            <input type="text" id="valorTransacao" placeholder="00,00" />
                            <button className ='concluirTransacao'onClick={handleTransaction}>Concluir transação</button>
                        </div>
                    </div>

                    <div className="extrato-card">
                        <div className='headerExtrato'>
                            <h2>Extrato</h2>
                            <button className='botaoEditar'></button>
                            <button className='botaoExcluir'></button>
                        </div>
                        
                        <div className="extrato-item">
                            <div className='mesExtrato'>
                                <span>Novembro</span>
                                <input type="checkbox" />
                            </div>
                            <div className='depositoExtrato'>
                                <span>Depósito</span>
                                <span className='dataExtrato'>20/11/2035</span>
                            </div>                     
                            <span className='valorExtrato'>R$ 150</span>

                            <div className='mesExtrato'>
                                <span>Dezembro</span>
                                <input type="checkbox" />
                            </div>

                            <div className='depositoExtrato'>
                                <span>Depósito</span>
                                <span className='dataExtrato'>20/11/2035</span>
                            </div>                     
                            <span className='valorExtrato'>R$ 150</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPageHome;