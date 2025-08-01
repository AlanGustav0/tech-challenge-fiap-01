'use client';

import "./ExtratoCard.css"; // Estilos
import { getAccountUserById } from "../../financeiro/util-services";
import React, { useState, useEffect } from "react";
import {
  getformattedDate,
  getMonthName,
} from "../../shared/utils/date-utils.ts";
import { updateAccountById } from "../../financeiro/util-services";
import { useSelector } from "react-redux";
import FiltroExtrato from "./FiltroExtrato";

export default function ExtratoCard() {
  const user = useSelector((state => state.user));
  const [isChecked, setIsChecked] = useState(false);
  const [code, codeSet] = useState(0);
  const [newDate, setDate] = useState("");
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

  const handleExtract = async (event) => {
    if (!isChecked) {
      setIsChecked(true);
      codeSet(event.codigoTransacao);
    } else {

      if (!newDate) {
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
        account.extrato.splice(index, 1, account.extrato[index]);
        const response = await updateAccountById(user.id, account);

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
      const response = await updateAccountById(user.id, account);

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

  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = account.extrato && account.extrato.length > 0 ? 
        account.extrato.filter((item, index) =>  item.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.valor.toLowerCase().includes(searchTerm.toLowerCase())) : [];

  

  return (
    <div className="extrato-card">
      <div className="headerExtrato">
        <h2>Extrato</h2>
      </div>

      <div>
        <label for="Search">
          <div class="relative">
            <input
              type="text"
              id="Search"
              placeholder="Buscar"
              class="mt-1 w-full rounded border-gray-300 p-1.5 shadow-sm md:text-md"
              value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
            />

            <span class="absolute inset-y-0 right-2 grid w-8 place-content-center">
              <button
                type="button"
                aria-label="Submit"
                class="rounded-full p-1.5 text-gray-700 transition-colors hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </span>
          </div>
        </label>
      </div>

      <div>
        <FiltroExtrato/>
      </div>

      {filteredData.length ? filteredData.map((item, index) => (
          <div className="extrato-item" key={index}>
            {/* <div>
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
            </div> */}
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
       : (
        <div className="sem-transacao">Nenhuma Transação realizada</div>
      )}
    </div>
  );
}
