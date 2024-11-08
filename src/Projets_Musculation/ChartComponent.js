import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import chartData from './typeProgram.json'; // Import du fichier JSON

// Initialiser les composants nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const ChartComponent = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Comparaison des ventes sur plusieurs années',
      },
    },
    maintainAspectRatio: false // Pour que le CSS contrôle la taille du graphique
  };

  return (
    <div style={{ width: '80vw', height: '70vh', margin: '0 auto' }}> {/* Limitation de taille */}
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
