import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css'
import Home from './Home';
import Musculation from './Projets_Musculation/Musculation';
import Finance from './Projets_Finance/Finance';
import ProjetsJS from './ProjetsJS/ProjetsJS';

// Import de l'image bandeau
import bannerImage from './assets/banner.jpg';

const App = () => {
  return (
    <HashRouter >
      <div>
        <img src={bannerImage} alt="Bandeau du portfolio" className="banner-image" />
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