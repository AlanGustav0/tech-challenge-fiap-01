'use client';

import './userPageHome.css'; // Estilos
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import React, { useState } from 'react';

const UserPageHome = () => {
    const balance = 2500.00;

    const [isBalanceVisible, setIsBalanceVisible] = useState(false);

     const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    };

    const getCurrentDate = () => {
        const now = new Date();
        const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
        return now.toLocaleDateString('pt-BR', options);
    };

    const handleTransaction = () => {
        const transactionType = document.getElementById("tipoTransacao").value;
        const transactionValue = document.getElementById("valorTransacao").value;

   

    
    };

    return (
        <div className="user-page">
            <div className="content">
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
                </div>
            </div>
        </div>
    );
};

export default UserPageHome;