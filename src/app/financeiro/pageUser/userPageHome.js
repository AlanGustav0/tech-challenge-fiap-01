"use client";

import { useEffect, useState, useRef } from "react";
import { mountRootParcel } from "single-spa";
import "./userPageHome.css";
import {
  getAccountUserById,
  updateAccountById,
} from "../../financeiro/util-services";

export default function UserPageHome(userId) {
  const [account, setAccount] = useState({
    userName: "",
    saldo: 0,
    extrato: [],
  });

  const angularRef = useRef(null);

  useEffect(() => {
    // 1. Buscar dados do usuário
    getAccountUserById(userId.id).then((data) => {
      if (data) {
        setAccount({
          userName: data.userName,
          saldo: data.saldo,
          extrato: data.extrato,
        });
      }
    });

    // 2. Montar microfrontend Angular corretamente
    if (angularRef.current) {
      mountRootParcel(() => System.import("mfe-angular"), {
        domElement: angularRef.current,
      });
    }
  }, [userId.id]);

  const handleTransaction = async () => {
    const transactionType = document.getElementById("tipoTransacao").value;
    const transactionValue = document.getElementById("valorTransacao").value;

    if (!transactionType || isNaN(parseFloat(transactionValue))) {
      alert("Por favor, selecione o tipo de transação e insira um valor válido.");
      return;
    }

    const valor = parseFloat(transactionValue);

    if (transactionType === "Depósito") {
      account.saldo += valor;
      account.extrato.push({
        codigoTransacao: Math.floor(Math.random() * 100000),
        tipo: transactionType,
        valor: valor,
        data: new Date().toISOString(),
      });

      const response = await updateAccountById(userId.id, account);

      if (response.ok) {
        alert(`Depósito de R$ ${valor} realizado com sucesso!`);
        window.location.reload();
      } else {
        alert("Erro ao realizar depósito. Tente novamente.");
      }
    } else if (transactionType === "Saque") {
      if (account.saldo >= valor) {
        account.saldo -= valor;
        account.extrato.push({
          tipo: transactionType,
          valor: valor,
          data: new Date().toISOString(),
        });

        const response = await updateAccountById(userId.id, account);

        if (response.ok) {
          alert(`Saque de R$ ${valor} realizado com sucesso!`);
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
              <select id="tipoTransacao">
                <option value="">Selecione o tipo de transação</option>
                <option value="Saque">Saque</option>
                <option value="Depósito">DOC/TED</option>
              </select>
              <input type="text" id="valorTransacao" placeholder="00,00" />
              <button className="concluirTransacao" onClick={handleTransaction}>
                Concluir transação
              </button>
            </div>
          </div>
        </div>

        {/* Componente Angular será injetado aqui via Single SPA */}
        <div id="angular-mfe" ref={angularRef}></div>
      </div>
    </div>
  );
}
