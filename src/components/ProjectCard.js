// src/components/ProjectCard.js
import React from 'react';
import { Link } from 'react-router-dom'; 
import './ProjectCard.css';

const ProjectCard = ({ theme, title, description, image, link }) => {
  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-card-image" />
      <div className="project-card-content">
        <h2 className="project-card-thema">{theme}</h2>
        <h2 className="project-card-title">{title}</h2>
        <p className="project-card-description">{description}</p>
        {/* Utilisez Link pour une navigation côté client */}
        <Link to={link} className="project-card-button">
          Voir le projet
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
