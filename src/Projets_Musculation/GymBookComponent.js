import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Bar } from 'react-chartjs-2';

const WeeklySessionsChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Fonction pour lire le fichier CSV
    const fetchCSV = async () => {
      const response = await fetch('./GymBook.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-16');
      const csv = decoder.decode(result.value);

      // Parser le CSV avec papaparse
      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          processSessions(results.data);
        },
      });
    };

    // Fonction pour traiter les données et préparer le graphique
    const processSessions = (data) => {
      // Filtrer les lignes avec une date définie
      const validSessions = data.filter(item => item.Date);
      const sessions = validSessions.map(item => new Date(item.Date));
      const weeks = {};

      sessions.forEach(date => {
        const week = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;
        weeks[week] = (weeks[week] || 0) + 1;
      });

      const labels = Object.keys(weeks);
      const values = Object.values(weeks);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Séances par semaine',
            data: values,
          },
        ],
      });
    };

    fetchCSV();
  }, []);

  return (
    <div>
      <h2>Nombre de séances par semaine</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default WeeklySessionsChart;
