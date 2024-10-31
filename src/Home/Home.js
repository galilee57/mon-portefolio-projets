// src/Home/Home.js
import React from 'react';
import ProjectCard from '../components/ProjectCard';

// Charger toutes les images du dossier assets/projects
const images = require.context('../assets/projects', false, /\.(jpg|png|jpeg|gif)$/);

const Home = () => {
  const projects = [
    {
      title: "Projet Musculation",
      description: "Une application pour suivre votre programme de musculation.",
      image: images('./projectMusculation.jpg'), // correspond au nom du fichier dans le dossier
      link: "/musculation",
    },
    {
      title: "Projet Finance",
      description: "Une application pour gérer vos finances de manière efficace.",
      image: images('./projectFinance.jpg'),
      link: "/finance",
    },
    {
      title: "Projet JavaScript",
      description: "Une collection de projets JavaScript pour améliorer vos compétences.",
      image: images('./projectJS.jpg'),
      link: "/projetsjs",
    },
  ];

  return (
    <div className="home-page">
      <h1>MON PORTEFOLIO DE PROJETS</h1>
      <div className="project-cards-container">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
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
