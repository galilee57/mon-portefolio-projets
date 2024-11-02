import React, { useEffect, useState } from 'react';
import ProjectCard from './components/ProjectCard';
import projectsData from './projects.json';
import './styles/Home.css'

// Charger toutes les images du dossier assets/projects
const images = require.context('./assets/projects', false, /\.(jpg|png|jpeg|gif)$/);

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Ajouter les images correspondantes aux données JSON
    const projectsWithImages = projectsData.map(project => ({
      ...project,
      image: images(`./${project.image}`)
    }));

    // Trier les projets par ordre alphabétique de 'theme'
    projectsWithImages.sort((a, b) => a.theme.localeCompare(b.theme));

    // Mettre à jour le state avec les projets triés
    setProjects(projectsWithImages);
  }, []);

  // Fonction pour gérer la saisie dans le champ de recherche
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrer les projets en fonction du terme de recherche
  const filteredProjects = projects.filter(project =>
    project.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      
      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Rechercher des projets..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      <div className="project-cards-container">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={index}
            theme={project.theme}
            title={project.title}
            description={project.description}
            image={project.image}
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;