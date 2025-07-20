"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import "./balancedCard.css"; // Estilos
import {
  getAccountUserById,
} from "../../financeiro/util-services";
import { useSelector } from "react-redux";

const BalancedCardComponent = () => {
  const user = useSelector((state) => state.user);
  const [account, setAccount] = useState({
    userName: "",
    saldo: 0,
    extrato: [],
  });

  useEffect(() => {
    getAccountUserById(user.id).then((data) => {
      if (data)
        setAccount({
          userName: data.userName,
          saldo: data.saldo,
          extrato: data.extrato,
        });
    });
  }, [user.id]);

  const balance = account.saldo;

  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const getCurrentDate = () => {
    const now = new Date();
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return now.toLocaleDateString("pt-BR", options);
  };

  return (
    <div className="balance-card">
      <h2>Olá, {user.name}! :)</h2>
      <p>{getCurrentDate()}</p>
      <div className="balance-info">
        <span>Saldo</span>
        <button onClick={toggleBalanceVisibility}>
          {isBalanceVisible ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      <p className="contaCorrente">Conta Corrente</p>
      <p className="valorSaldo">
        {isBalanceVisible
          ? `R$ ${balance.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          : "●●●,●●"}
      </p>
    </div>
  );
};

export default BalancedCardComponent;
