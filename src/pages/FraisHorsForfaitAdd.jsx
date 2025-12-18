import { useParams } from "react-router-dom";
import FraisHorsForfaitForm from "../components/FraisHorsForfaitForm";

function FraisHorsForfaitAdd () {
  const { id } = useParams();

  return (
    <div>
      <h2>Ajouter un frais hors forfait pour le frais n°{id}</h2>
      <FraisHorsForfaitForm fraisId={id} />
    </div>
  );
};

export default FraisHorsForfaitAdd;
