"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import "./balancedCard.css"; // Estilos

export async function getUser(id) {
  const response = await fetch(`http://localhost:4000/usuarios?id=${id}`);

  if (response.ok) {
    const user = await response.json();

    return user[0];
  }

  return null;
}

export async function getAccountUser(id) {
  const response = await fetch(`http://localhost:4000/contas?id=${id}`);

  if (response.ok) {
    const account = await response.json();

    return account[0];
  }

  return null;
}

const BalancedCardComponent = (userId) => {
  const [user, setUser] = useState({ id: 0, userName: "", email: "" });
  const [account, setAccount] = useState({ userName: "", saldo: 0, extrato: [] });

  useEffect(() => {
    getUser(userId.id).then((data) => {
      if (data) setUser({
        id: data.id,
        userName: data.userName,
        email: data.email,
      });
    });
  }, [userId.id]);

  useEffect(() => {
    getAccountUser(userId.id).then((data) => {
      if (data) setAccount({
        userName: data.userName,
        saldo: data.saldo,
        extrato: data.extrato,
      });
    });
  }, [userId.id]);

  console.log("User:", account);
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
