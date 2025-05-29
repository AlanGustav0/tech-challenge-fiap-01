import "./ExtratoCard.css"; // Estilos
import { getAccountUserById } from "../../financeiro/util-services";
import React, { useState, useEffect } from "react";
import {
  getformattedDate,
  getMonthName,
} from "../../shared/utils/date-utils.ts";

export default function ExtratoCard(userId) {
  const [isChecked, setIsChecked] = useState(false);
  const [code, codeSet] = useState(0);
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

  const handleExtract = (event) => {
    if (!isChecked) {
      console.log("Extrato alterado:", event);
      setIsChecked(true);
      codeSet(event.codigoTransacao);
    } else {
      setIsChecked(false);
      codeSet(event.codigoTransacao);
    }
  };

  const handleDelete = (item) => {
    console.log(item)
    }

  return (
    <div className="extrato-card">
      <div className="headerExtrato">
        <h2>Extrato</h2>
      </div>

      {account.extrato && account.extrato.length > 0 ? (
        account.extrato.map((item, index) => (
          <div className="extrato-item" key={index}>
            <div>
              <button
                className={
                  !isChecked
                    ? "botaoEditar"
                    : isChecked && code == item.codigoTransacao
                    ? "botaoEditarChecked"
                    : "botaoEditar"
                }
                onClick={() => handleExtract(item)}
              ></button>
              <button className="botaoExcluir" onClick={() => handleDelete(item)}></button>
            </div>
            <div className="mesExtrato">
              <span>{getMonthName(new Date(item.data))}</span>
            </div>
            <div className="depositoExtrato">
              <span>{item.tipo}</span>
              <span className="dataExtrato">
                {!(item.codigoTransacao == code) ? (
                  `${getformattedDate(new Date(item.data))}`
                ) : item.codigoTransacao == code && isChecked ? (
                  <input type="date" />
                ) : (
                  `${getformattedDate(new Date(item.data))}`
                )}
              </span>
            </div>
            <span className="valorExtrato">
              {item.valor
                ? `R$ ${item.valor.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                : "0,00"}
            </span>
          </div>
        ))
      ) : (
        <div className="sem-transacao">Nenhuma Transação realizada</div>
      )}
    </div>
  );
}
