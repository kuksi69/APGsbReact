import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FraisHorsForfaitForm = ({ fraisId, initialData }) => {
  const [date, setDate] = useState("");
  const [libelle, setLibelle] = useState("");
  const [montant, setMontant] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setDate(initialData.date_fraishorsforfait);
      setLibelle(initialData.libelle_fraishorsforfait);
      setMontant(initialData.montant_fraishorsforfait);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (initialData) {
        await axios.put(
          `http://gsb.julliand.etu.lmdsio.com/api/fraisHF/modifier/${initialData.id}`,
          {
            date_fraishorsforfait: date,
            libelle_fraishorsforfait: libelle,
            montant_fraishorsforfait: parseFloat(montant),
          }
        );
      } else {
        await axios.post(
          `http://gsb.julliand.etu.lmdsio.com/api/fraisHF/ajouter/${fraisId}`,
          {
            date_fraishorsforfait: date,
            libelle_fraishorsforfait: libelle,
            montant_fraishorsforfait: parseFloat(montant),
          }
        );
      }

      navigate(`/frais/${fraisId}/hors-forfait`);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du frais hors forfait :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date :</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Libellé :</label>
        <input
          type="text"
          value={libelle}
          onChange={(e) => setLibelle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Montant :</label>
        <input
          type="number"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          step="0.01"
          required
        />
      </div>

      <button type="submit">{initialData ? "Modifier" : "Ajouter"}</button>
    </form>
  );
};

export default FraisHorsForfaitForm;
