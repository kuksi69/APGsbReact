import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FraisHorsForfaitTable from "../components/FraisHorsForfaitTable";

const FraisHorsForfait = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fraisHorsForfaitList, setFraisHorsForfaitList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchFraisHorsForfaitList = async () => {
    try {
      const response = await axios.get(
        `http://gsb.julliand.etu.lmdsio.com/api/fraisHF/liste/${id}`
      );
      setFraisHorsForfaitList(response.data);

      const somme = response.data.reduce(
        (acc, frais) => acc + parseFloat(frais.montant_fraishorsforfait),
        0
      );
      setTotal(somme);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFraisHorsForfaitList();
  }, [id]);

  const handleDelete = (idHF) => {
    const nouvelleListe = fraisHorsForfaitList.filter(
      (frais) => frais.id_fraishorsforfait !== idHF
    );
    setFraisHorsForfaitList(nouvelleListe);

    const nouveauTotal = nouvelleListe.reduce(
      (acc, frais) => acc + parseFloat(frais.montant_fraishorsforfait),
      0
    );
    setTotal(nouveauTotal);
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Frais Hors Forfait du frais n°{id}</h2>

      <FraisHorsForfaitTable
        idFrais={id}
        fraisHorsForfaitList={fraisHorsForfaitList}
        total={total}
        onDelete={handleDelete}
      />

      <button onClick={() => navigate(`/frais/${id}/hors-forfait/ajouter`)}>
        Ajouter un frais hors forfait
      </button>
      <button onClick={() => navigate(`/frais/modifier/${id}`)} style={{ marginLeft: "10px" }}>
        Retour
      </button>
    </div>
  );
};

export default FraisHorsForfait;
