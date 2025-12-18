import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FraisHorsForfaitForm from "../components/FraisHorsForfaitForm";

const FraisHorsForfaitEdit = () => {
  const { id, idHF } = useParams();
  const [fraisHF, setFraisHF] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFraisHF = async () => {
      try {
        const response = await axios.get(
          `http://gsb.julliand.etu.lmdsio.com/api/fraisHF/${idHF}`
        );
        setFraisHF(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération du frais hors forfait :", error);
        setLoading(false);
      }
    };

    fetchFraisHF();
  }, [idHF]);

  if (loading) return <p>Chargement...</p>;
  if (!fraisHF) return <p>Frais hors forfait introuvable</p>;

  return (
    <div>
      <h2>Modifier le frais hors forfait</h2>
      <FraisHorsForfaitForm fraisId={id} initialData={fraisHF} />
    </div>
  );
};

export default FraisHorsForfaitEdit;
