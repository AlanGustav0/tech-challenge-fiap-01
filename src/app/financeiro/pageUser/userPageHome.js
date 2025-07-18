"use client";

import { useEffect, useState, useRef } from "react";
import { mountRootParcel } from "single-spa";
import "./userPageHome.css";
import {
  getAccountUserById,
  updateAccountById,
  getUserById,
} from "../../financeiro/util-services";

export default function UserPageHome(userId) {
  const [account, setAccount] = useState({
    userName: "",
    saldo: 0,
    extrato: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [senhaDigitada, setSenhaDigitada] = useState("");
  const [senhaCorreta, setSenhaCorreta] = useState("");
  const [mensagemModal, setMensagemModal] = useState(
    "Para concluir a transação, insira a senha cadastrada no login."
  );
  const [transacaoFinalizada, setTransacaoFinalizada] = useState(false);
  const [erroTransacao, setErroTransacao] = useState(false);
  const [valorTransacao, setValorTransacao] = useState(""); // Valor real sem formatação
  const [valorFormatado, setValorFormatado] = useState(""); // Valor formatado para exibição

  const angularRef = useRef(null);

  useEffect(() => {
    getAccountUserById(userId.id).then((data) => {
      if (data) {
        setAccount({
          userName: data.userName,
          saldo: data.saldo,
          extrato: data.extrato,
        });
      }
    });

    getUserById(userId.id).then((user) => {
      if (user && user.password) {
        setSenhaCorreta(user.password);
      }
    });

    if (angularRef.current) {
      mountRootParcel(() => System.import("mfe-angular"), {
        domElement: angularRef.current,
      });
    }
  }, [userId.id]);

  const handleTransaction = () => {
    setSenhaDigitada("");
    setMensagemModal("Para concluir a transação, insira a senha cadastrada no login.");
    setTransacaoFinalizada(false);
    setErroTransacao(false);
    setShowModal(true);
  };

  const formatarValor = (valor) => {
    const numericValue = valor.replace(/\D/g, "");
    const valorFinal = (parseFloat(numericValue) / 100).toFixed(2);
    setValorTransacao(valorFinal);
    setValorFormatado(
      Number(valorFinal).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    );
  };

  const confirmarTransacao = async () => {
    if (senhaDigitada !== senhaCorreta) {
      setMensagemModal("Senha incorreta. Tente novamente.");
      setErroTransacao(true);
      return;
    }

    const transactionType = document.getElementById("tipoTransacao").value;
    const valor = parseFloat(valorTransacao);

    if (!transactionType || isNaN(valor)) {
      alert("Selecione o tipo de transação e insira um valor válido.");
      return;
    }

    if (transactionType === "Saque" && account.saldo < valor) {
      alert("Saldo insuficiente.");
      return;
    }

    const novaTransacao = {
      tipo: transactionType,
      valor,
      data: new Date().toISOString(),
      codigoTransacao: Math.floor(Math.random() * 100000),
    };

    const novoSaldo =
      transactionType === "Depósito"
        ? account.saldo + valor
        : account.saldo - valor;

    const novaConta = {
      ...account,
      saldo: novoSaldo,
      extrato: [...account.extrato, novaTransacao],
    };

    const response = await updateAccountById(userId.id, novaConta);

    if (response.ok) {
      setMensagemModal("Transação concluída com sucesso!");
      setErroTransacao(false);
      setTransacaoFinalizada(true);
      setTimeout(() => {
        setShowModal(false);
        window.location.reload();
      }, 2000);
    } else {
      setMensagemModal("Erro ao processar a transação.");
      setErroTransacao(true);
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

              <input
                type="text"
                placeholder="R$ 0,00"
                value={valorFormatado}
                onChange={(e) => formatarValor(e.target.value)}
              />

              <button className="concluirTransacao" onClick={handleTransaction}>
                Concluir transação
              </button>
            </div>
          </div>
        </div>

        <div id="angular-mfe" ref={angularRef}></div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <p className={`mensagem-modal ${erroTransacao ? "erro" : ""}`}>
                {mensagemModal}
                {transacaoFinalizada && <span className="check-icon">✅</span>}
              </p>

              {!transacaoFinalizada && (
                <>
                  <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={senhaDigitada}
                    onChange={(e) => setSenhaDigitada(e.target.value)}
                    className="input-senha"
                  />
                  <div className="botoes-modal">
                    <button onClick={confirmarTransacao} className="botao-confirmar">
                      Confirmar
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="botao-fechar"
                    >
                      Fechar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
