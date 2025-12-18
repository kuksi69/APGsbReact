import React, { useState, useEffect } from "react";
import "../styles/FraisTable.css";
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function FraisTable() {
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNotNull, setFilterNotNull] = useState(true);
  const [minAmount, setMinAmount] = useState("");
  const navigate = useNavigate();

  const { token, user } = useAuth();

  const filteredFrais = fraisList
    .filter((f) => !filterNotNull || f.montantvalide !== null)
    .filter((f) =>
      f.anneemois.includes(searchTerm) ||
      f.id_visiteur.toString().includes(searchTerm)
    )
    .filter((f) =>
      minAmount === "" || 
      (f.montantvalide !== null && Number(f.montantvalide) > Number(minAmount))
    );

  useEffect(() => {
    const fetchFrais = async () => {
      try {
        const response = await axios.get(`${API_URL}frais/liste/${user.id_visiteur}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFraisList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des frais:', error);
      }
    };

    fetchFrais();
  }, [token, user.id_visiteur]);

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce frais ?")) return;

    try {
      await axios.delete(`${API_URL}frais/suppr`, {
        data: { id_frais: id },
        headers: { Authorization: `Bearer ${token}` },
      });

      setFraisList(fraisList.filter((frais) => frais.id_frais !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Impossible de supprimer ce frais. Veuillez réessayer.");
    }
  };

  if (loading) return (<div><b>Chargement des frais...</b></div>);

  return (
    <div className="frais-table-container">
      <h2>Liste des Frais</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Recherche par année-mois, ID visiteur ou montant..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-container">
        <input
          type="number"
          placeholder="Montant validé minimum"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
        />
      </div>

      <div className="filter-container">
        <label>
          <input
            type="checkbox"
            checked={filterNotNull}
            onChange={(e) => setFilterNotNull(e.target.checked)} 
          />
          Afficher seulement les frais avec un montant validé
        </label>
      </div>

      <table className="frais-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID État</th>
            <th>Année-Mois</th>
            <th>ID Visiteur</th>
            <th>Nombre de justificatifs</th>
            <th>Date de modification</th>
            <th>Montant saisi</th>
            <th>Montant validé</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFrais.map((frais) => (
            <tr key={frais.id_frais}>
              <td>{frais.id_frais}</td>
              <td>{frais.id_etat}</td>
              <td>{frais.anneemois}</td>
              <td>{frais.id_visiteur}</td>
              <td>{frais.nbjustificatifs}</td>
              <td>{frais.datemodification}</td>
              <td>{frais.montantsaisi}</td>
              <td>{frais.montantvalide}</td>
              <td>
                <button
                  onClick={() => navigate(`/frais/modifier/${frais.id_frais}`)}
                  className="edit-button"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(frais.id_frais)}
                  className="delete-button"
                  style={{ marginLeft: "5px" }}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
          {filteredFrais.length === 0 && (
            <tr>
              <td colSpan="9">Aucun frais trouvé.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}


