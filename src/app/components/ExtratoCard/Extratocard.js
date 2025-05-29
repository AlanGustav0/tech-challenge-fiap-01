import "./ExtratoCard.css"; // Estilos
import { getAccountUserById } from "../../financeiro/util-services";
import React, { useState, useEffect } from "react";
import { getformattedDate, getMonthName } from "../../shared/utils/date-utils.ts"

export default function ExtratoCard(userId) {
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

  return (
    <div className="extrato-card">
      <div className="headerExtrato">
        <h2>Extrato</h2>
        <button className="botaoEditar"></button>
        <button className="botaoExcluir"></button>
      </div>

      {account.extrato.map((item, index) => (
        <div className="extrato-item" key={index}>
          <div className="mesExtrato">
            <span>{getMonthName(new Date(item.data))}</span>
            <input type="checkbox" />
          </div>
          <div className="depositoExtrato">
            <span>{item.tipo}</span>
            <span className="dataExtrato">{getformattedDate(new Date(item.data))}</span>
          </div>
          <span className="valorExtrato">{item.valor ? `R$ ${item.valor.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          : "0,00"}</span>
        </div>
      ))}
    </div>
  );
}
