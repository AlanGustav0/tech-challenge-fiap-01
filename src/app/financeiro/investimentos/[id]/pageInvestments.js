'use client';

import './pageInvestments.css'; // Estilos
import dynamic from 'next/dynamic';

const PageInvestments = () => {
  const getTotalBalance = (value=50000) => {
    return formatCurrency(value);
  };
  const getCurrentFixRent = (value=36000) => {
    return formatCurrency(value);
  };

  const getCurrentVariableRent = (value=14000) => {
    return formatCurrency(value);
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const DoughnutChart = dynamic(
    () => import('../../../components/DoughnutChart.js'),
    { ssr: false }
  );


  return (
    <div className='investments-card'>
      <div className='column'>
        <h1 className='title-card'>Investimentos</h1>
        <div className='total-balance'>Total: {getTotalBalance()}</div>
      </div>
      <div className='rent-container row'>
        <div className='rent-card'>
          <h6 className='rent-title'>Renda Fixa</h6>
          <div>
            <p className='rent-info'>{getCurrentFixRent()}</p>
          </div>
        </div>
        <div className='rent-card'>
          <h6 className='rent-title'>Renda Variável</h6>
          <div>
            <p className='rent-info'>{getCurrentVariableRent()}</p>
          </div>
        </div>
      </div>
      <div className='statistics-container column'>
        <h2 className='subtitle-card'>Estatísticas</h2>
        <div className='statistics-card'>
          <div className='chart-container'>
            <DoughnutChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageInvestments;