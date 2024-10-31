import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Button from '../components/Button';
import Exercices from './Exercices';
import Programmes from './Programmes';

const Musculation = () => {
  return (
    <div>
      <h1>Musculation</h1>
      <nav>
        <Button text="Exercices" to="exercices" />
        <Button text="Programmes" to="programmes" />
      </nav>
      {/* Sous-routes */}
      <Routes>
        <Route path="/" element={<p>Veuillez sélectionner une option.</p>} />
        <Route path="exercices" element={<Exercices />} />
        <Route path="programmes" element={<Programmes />} />
      </Routes>
    </div>
  );
};

export default Musculation;