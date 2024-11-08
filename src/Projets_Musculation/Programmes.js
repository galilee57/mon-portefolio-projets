import ChartComponent  from "./ChartComponent";

const Programmes = () => {
  

  return (
    <div>
      <h2>Programmes d'Entraînement</h2>
      <h3>L'objectif de ce module est d'évaluer ma progression : plateaux atteints, travail en hypertrophie par groupe musculaire.<br></br>
      Pour calculer la contribution de chaque séance à l'hypertrophie, j'utilise un splitage qui dépend du nombre de répétitions.
      </h3>
      <ChartComponent />
      <h3>Le fichier issu de GymBook est traité pour afficher les exercices par période et par région musculaire.<br></br>
      Je rajoute 3 colonnes F-H-E qui calcule la répartition du volume selon chaque type.<br></br>
      La 1RM est calculée par la formule d'Epley : j'affiche la 1RM max sur la période, selon le groupe musculaire.
      </h3>
    </div>
  );
};

export default Programmes;
