'use client';

import './userPageHome.css'; // Estilos

const UserPageHome = () => {
    const handleTransaction = () => {
        const transactionType = document.getElementById("tipoTransacao").value;
        const transactionValue = document.getElementById("valorTransacao").value;
    };

    return (
        <div className="user-page">
            <div className="content">
                <div className="main-content">
                    <div className="left-column">
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