// src/App.js
import React, { Suspense } from 'react';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import './styles/App.css';
import projectsConfig from './projects.json' // Importer le fichier JSON

const App = () => {
  return (
    <HashRouter>
      <div>
        <header className="app-header">
          <h1>MON PORTEFOLIO DE PROJETS</h1>
          <Link to="/" className="home-button">Accueil</Link>
        </header>
        
        <Suspense fallback={<div>Chargement...</div>}>
          <Routes>
            {projectsConfig.map((project, index) => {
              // Chargement dynamique du composant en fonction de son chemin d'importation
              const Component = React.lazy(() => import(`${project.importPath}`));
              
              return <Route key={index} path={project.path} element={<Component />} />;
            })}
          </Routes>
        </Suspense>
      </div>
    </HashRouter>
  );
}

export default App;
