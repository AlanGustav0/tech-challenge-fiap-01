"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import "./balancedCard.css"; // Estilos
import {
  getAccountUserById,
  getUserById,
} from "../../financeiro/util-services";

const BalancedCardComponent = (userId) => {
  const [user, setUser] = useState({ id: 0, userName: "", email: "" });
  const [account, setAccount] = useState({
    userName: "",
    saldo: 0,
    extrato: [],
  });

  useEffect(() => {
    getUserById(userId.id).then((data) => {
      if (data)
        setUser({
          id: data.id,
          userName: data.userName,
          email: data.email,
        });
    });
  }, [userId.id]);

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
      <h2>Olá, {user.userName}! :)</h2>
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
