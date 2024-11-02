import React from 'react';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import './styles/App.css'
import Home from './Home';
import Musculation from './Projets_Musculation/Musculation';
import Finance from './Projets_Finance/Finance';
import ProjetsJS from './ProjetsJS/ProjetsJS';

const App = () => {
  return (
    <HashRouter >
      <div>
      <header className="app-header">
        <h1>MON PORTEFOLIO DE PROJETS</h1>
        <Link to="/" className="home-button">
            Accueil
          </Link>
      </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/musculation/" element={<Musculation />} />
          <Route path="/finance/" element={<Finance />} />
          <Route path="/projetsjs/" element={<ProjetsJS />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
