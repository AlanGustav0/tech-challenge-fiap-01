'use client';

import "./ExtratoCard.css"; // Estilos
import { getAccountUserById } from "../../financeiro/util-services";
import React, { useState, useEffect, useMemo } from "react";
import {
  getformattedDate,
  getMonthName,
} from "../../shared/utils/date-utils.ts";
import { updateAccountById } from "../../financeiro/util-services";
import { useSelector } from "react-redux";

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
  const [filters, setFilters] = useState({
    month: 'all',
    transactionType: 'all',
    searchText: ''
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

  const availableMonths = account.extrato.reduce((acc, item) => {
    const date = new Date(item.data);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!acc.includes(monthYear)) {
      acc.push(monthYear);
    }
    return acc;
  }, []);

  const formatMonth = (monthStr) => {
    if (monthStr === 'all') return 'Todos';
    const [year, month] = monthStr.split('-');
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outurbo', 'Novembro', 'Dezembro'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const handleDate = (event) => {
    const [year, month, day] = event.target.value.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    setDate(date);
  }

  const filteredData = useMemo(() => {
    console.log('account', account.extrato)
    return account.extrato.filter(item => {
      if (filters.month !== 'all') {
        const date = new Date(item.data);
        const itemMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (itemMonth !== filters.month) return false;
      }

      if (filters.transactionType !== 'all') {
        const transactionTypeLower = filters.transactionType.toLowerCase();
        return item.tipo.toLowerCase().includes(transactionTypeLower);
      }

      if (filters.searchText) {
        const searchLower = filters.searchText.toLowerCase();
        return (
          item.tipo.toLowerCase().includes(searchLower) ||
          item.valor === Number(filters.searchText)
        );
      }
      return true;
    });
  }, [account.extrato, filters.month, filters.transactionType, filters.searchText]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="extrato-card">
      <div className="headerExtrato">
        <h2>Extrato</h2>
      </div>

      <div className="search-container">
        <div className="search-form">
          <input type="text" id="searchText"
            name="searchText" placeholder="Buscar" className="search-input" value={filters.searchText}
            onChange={handleFilterChange} />
          <button className="search-button">
            <img src="../../../md-search.svg" />
          </button>
        </div>
      </div>

      <div className="filter-container">
        <div className="custom-select">
          <select
            id="month"
            name="month"
            value={filters.month}
            onChange={handleFilterChange}
          >
            <option value="all">Mês</option>
            {availableMonths.map(month => (
              <option key={month} value={month}>
                {formatMonth(month)}
              </option>
            ))}
          </select>
        </div>

        <div className="custom-select">
          <select
            id="transactionType"
            name="transactionType"
            value={filters.transactionType}
            onChange={handleFilterChange}
          >
            <option value="all" className="select-selected">Tipo</option>
            <option value="depósito" className="select-items">Depósito</option>
            <option value="saque" className="select-items">Saque</option>
            <option value="transferência" className="select-items">Transferência</option>
          </select>
        </div>

      </div>

      <div className="transaction-list">
  <div className="transaction-content">
    {filteredData.length ? filteredData.map((item, index) => (
      <div className="extrato-item" key={index}>
        <div className={`mesExtrato ${item.tipo === 'Saque' ? 'texto-vermelho' : ''}`}>
          <span>{getMonthName(new Date(item.data))}</span>
        </div>
        <div className={`depositoExtrato ${item.tipo === 'Saque' ? 'texto-vermelho' : ''}`}>
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
    ? `R$ ${item.tipo === 'Saque' ? '- ' : ''}${item.valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "0,00"}
</span>


        <span className="divider-custom"></span>
      </div>
    ))
      : (
        <div className="sem-transacao">Nenhuma Transação realizada</div>
      )}
  </div>
</div>



    </div>
  );
}
