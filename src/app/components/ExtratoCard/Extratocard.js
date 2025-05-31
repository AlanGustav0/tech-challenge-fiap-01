import "./ExtratoCard.css"; // Estilos
import { getAccountUserById } from "../../financeiro/util-services";
import React, { useState, useEffect } from "react";
import {
  getformattedDate,
  getMonthName,
} from "../../shared/utils/date-utils.ts";
import { updateAccountById } from "../../financeiro/util-services";

export default function ExtratoCard(userId) {
  const [isChecked, setIsChecked] = useState(false);
  const [code, codeSet] = useState(0);
  const [newDate, setDate] = useState("");
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

  const handleExtract = async (event) => {
    if (!isChecked) {
      setIsChecked(true);
      codeSet(event.codigoTransacao);
    } else {

      if(!newDate){
      alert('Anteção, é necessário informar a data!');
      return;
    }
      setIsChecked(false);
      codeSet(event.codigoTransacao);

      const index = account.extrato.findIndex(
        (item) => item.codigoTransacao === event.codigoTransacao
      );

      if (index == !-1) {
        account.extrato[index].data = newDate;
        account.extrato.splice(index, 1,account.extrato[index]);
        const response = await updateAccountById(userId.id, account);

        if (response.ok) {
          alert(`Extrato editado com sucesso!`);
        }
      }
    }
  };

  const handleDelete = async (event) => {
    const index = account.extrato.findIndex(
      (item) => item.codigoTransacao === event.codigoTransacao
    );

    if (index != -1) {
      account.extrato.splice(index, 1);
      const response = await updateAccountById(userId.id, account);

      if (response.ok) {
        alert(`Extrato removido com sucesso!`);
        window.location.reload();
      }
    }
  };

  const handleDate = (event) => {
    
    const [year, month, day] = event.target.value.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    setDate(date);
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
              <button
                className="botaoExcluir"
                onClick={() => handleDelete(item)}
              ></button>
            </div>
            <div className="mesExtrato">
              <span>{getMonthName(new Date(item.data))}</span>
            </div>
            <div className="depositoExtrato">
              <span>{item.tipo}</span>
              <span className="dataExtrato" onChange={handleDate}>
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
