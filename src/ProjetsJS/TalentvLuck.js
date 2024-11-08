import React, { useState, useEffect } from 'react';
import { Bar, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, Tooltip, Legend } from 'chart.js';
import '../styles/TalentvLuck.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, Tooltip, Legend);

const TalentvChanceJS = () => {
  // Paramètres du modèle
  const N = 1000;
  const mT = 0.6;
  const σT = 0.1;
  const C0 = 10;
  const NE = 500;
  const pL = 0.5;
  const chance = 0.5;
  const perte = 0.9;
  const iterations = 80;

  const [capitalData, setCapitalData] = useState([]);
  const [talentCapitalData, setTalentCapitalData] = useState([]);

  // Fonction pour générer un nombre aléatoire suivant une distribution normale
  const randn_bm = () => {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  };

  useEffect(() => {
    // Création des agents
    const agents = [];
    for (let i = 0; i < N; i++) {
      let talent = randn_bm() * σT + mT;
      talent = Math.max(0, Math.min(1, talent));
      agents.push({
        talent: talent,
        capital: C0,
        position: Math.random() // Ajout de la position initiale aléatoire pour chaque agent
      });
    }

    // Création des événements
    const events = [];
    for (let i = 0; i < NE; i++) {
      events.push({
        type: Math.random() < pL ? 'chanceux' : 'malchanceux',
        position: Math.random()
      });
    }

    // Simulation de l'évolution du modèle
    for (let i = 0; i < iterations; i++) {
      // Déplacement aléatoire des événements
      events.forEach(event => {
        event.position = Math.random();
      });

      // Interaction entre agents et événements
      agents.forEach(agent => {
        events.forEach(event => {
          if (Math.abs(agent.position - event.position) < 0.1) {
            if (event.type === 'chanceux' && Math.random() < agent.talent) {
              agent.capital *= chance;
            } else if (event.type === 'malchanceux') {
              agent.capital *= perte;
            }
          }
        });
      });
    }

    // Collecte des données de capital et talent vs capital
    const capitalDataSorted = agents.map(agent => agent.capital).sort((a, b) => a - b);
    setCapitalData(capitalDataSorted);

    const talentCapitalDataFormatted = agents.map(agent => ({
      x: agent.talent,
      y: agent.capital
    }));
    setTalentCapitalData(talentCapitalDataFormatted);
  }, []);

  // Données pour l'histogramme de la distribution du capital
  const capitalHistogramData = {
    labels: capitalData.map((_, i) => i),
    datasets: [
      {
        label: 'Distribution du capital',
        data: capitalData,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  // Données pour le nuage de points talent vs capital
  const talentCapitalScatterData = {
    datasets: [
      {
        label: 'Talent vs Capital',
        data: talentCapitalData,
        backgroundColor: 'rgba(255, 99, 132, 1)'
      }
    ]
  };

  return (
    <div>
      <h2>Simulation de la Distribution du Capital</h2>
      <div className="chart-container">
        <div className="chart">
          <Bar
            data={capitalHistogramData}
            options={{
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
            width={600}
            height={400}
          />
        </div>
        <div className="chart">
          <Scatter
            data={talentCapitalScatterData}
            options={{
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Talent'
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Capital'
                  }
                }
              }
            }}
            width={600}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default TalentvChanceJS;
