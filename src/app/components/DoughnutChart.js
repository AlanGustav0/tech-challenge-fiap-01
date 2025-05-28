// components/DoughnutChart.js
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { styleText } from 'util';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
  const data = {
    labels: ['Fundos de investimento', 'Tesouro Direto', 'Previdência Privada', 'Bolsa de Valores'],
    datasets: [
      {
        label: 'Percentual',
        data: [25, 25, 25, 25],
        backgroundColor: [
          'rgba(37, 103, 249, 1)',
          'rgba(143, 60, 255, 1)',
          'rgba(255, 60, 130, 1)',
          'rgba(241, 130, 61, 1)',
        ],
        borderColor: [
          'rgba(37, 103, 249, 1)',
          'rgba(143, 60, 255, 1)',
          'rgba(255, 60, 130, 1)',
          'rgba(241, 130, 61, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    borderAlign: 'inner',
    plugins: {
      legend: {
        position: 'right',
        fullSize: true,
        maxWidth: 160,
        boxHeight: 16,
        labels: {
          color: '#fff',
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      title: {
        display: false,
      },
    },
    cutout: '70%', // Adjust this to change the doughnut thickness (percentage)
  };

  return <Doughnut data={data} options={options} />;
}