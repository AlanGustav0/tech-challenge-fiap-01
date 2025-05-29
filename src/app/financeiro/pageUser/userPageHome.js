"use client";

import "./userPageHome.css"; // Estilos
import { useState, useEffect } from "react";
import {
  getAccountUserById,
  updateAccountById,
} from "../../financeiro/util-services";

const UserPageHome = (userId) => {
  const [account, setAccount] = useState({
    userName: "",
    saldo: 0,
    extrato: [],
  });

  useEffect(() => {
    getAccountUserById(userId.id).then((data) => {
      if (data)
        setAccount({
          userName: data.userName,
          saldo: data.saldo,
          extrato: data.extrato,
        });
    });
  }, [userId.id]);

  const handleTransaction = async () => {
    const transactionType = document.getElementById("tipoTransacao").value;
    const transactionValue = document.getElementById("valorTransacao").value;

    console.log(`Tipo de transação: ${transactionType}`);
    console.log(`Valor da transação: ${transactionValue}`);

    if (transactionType === "Depósito") {
      account.saldo += parseFloat(transactionValue);
      account.extrato.push({
        tipo: transactionType,
        valor: parseFloat(transactionValue),
        data: new Date().toISOString(),
      });

      const response = await updateAccountById(userId.id, account);

      if (response.ok) {
        alert(`Depósito de R$ ${transactionValue} realizado com sucesso!`);
        window.location.reload();
      } else {
        alert("Erro ao realizar depósito. Tente novamente.");
      }
    } else if (transactionType === "Saque") {
      if (account.saldo >= parseFloat(transactionValue)) {
        account.saldo -= parseFloat(transactionValue);
        account.extrato.push({
          tipo: transactionType,
          valor: parseFloat(transactionValue),
          data: new Date().toISOString(),
        });

        const response = await updateAccountById(userId.id, account);

        if (response.ok) {
          alert(`Saque de R$ ${transactionValue} realizado com sucesso!`);
          window.location.reload();
        } else {
          alert("Erro ao realizar saque. Tente novamente.");
        }
      } else {
        alert("Saldo insuficiente para realizar o saque.");
      }
    }
  };

  return (
    <div className="user-page">
      <div className="content">
        <div className="main-content">
          <div className="left-column">
            <div className="bloco-transacao">
              <h3 className="novaTrasacao">Nova Transação</h3>
              <div className="select-container">
                <select id="tipoTransacao">
                  <option value="">Selecione o tipo de transação</option>
                  <option value="Saque">Saque</option>
                  <option value="Depósito">DOC/TED</option>
                </select>
              </div>
              <label htmlFor="valorTransacao" style={{ color: "#DEE9EA" }}>
                Valor
              </label>
              <input type="text" id="valorTransacao" placeholder="00,00" />
              <button className="concluirTransacao" onClick={handleTransaction}>
                Concluir transação
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPageHome;
