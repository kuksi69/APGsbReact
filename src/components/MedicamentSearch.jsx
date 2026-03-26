import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../styles/FraisTable.css";

export default function MedicamentSearch() {
  const [medicamentList, setMedicamentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrix, setMaxPrix] = useState("");
  const navigate = useNavigate();

  const { token } = useAuth();

  // --- LOGIQUE DE FILTRAGE (Identique à FraisTable) ---
  const filteredMedicaments = medicamentList.filter((m) => {
    const term = searchTerm.toLowerCase();
    return (
      m.nom_commercial.toLowerCase().includes(term) ||
      m.depot_legal.toLowerCase().includes(term) ||
      (m.lib_famille && m.lib_famille.toLowerCase().includes(term))
    );
  }).filter((m) => 
    maxPrix === "" || Number(m.prix_echantillon) <= Number(maxPrix)
  );

  // --- CHARGEMENT INITIAL (Comme FraisTable) ---
  useEffect(() => {
    const fetchMedicaments = async () => {
      try {
        const response = await axios.get(`${API_URL}medicaments/liste`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Données reçues :", response.data);
        setMedicamentList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur API:', error);
        setLoading(false);
      }
    };

    if (token) fetchMedicaments();
  }, [token]);

  if (loading) return <div className="container"><b>Chargement des médicaments...</b></div>;

  return (
    <div className="frais-table-container">
      <h2>Recherche de Médicaments</h2>

      {/* Barre de Recherche */}
      <div className="search-container" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher par nom ou famille..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Le bouton s'affiche ici, même si le filtre est dynamique */}
        <button className="btn btn-primary">Rechercher</button>
      </div>

      {/* Filtre Prix */}
      <div className="filter-container">
        <input
          type="number"
          placeholder="Prix maximum (€)"
          value={maxPrix}
          onChange={(e) => setMaxPrix(e.target.value)}
        />
      </div>

      <table className="frais-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Dépôt Légal</th>
            <th>Nom Commercial</th>
            <th>Effets</th>
            <th>Indication</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMedicaments.length > 0 ? (
            filteredMedicaments.map((m) => (
              <tr key={m.id_medicament}>
                <td>{m.id_medicament}</td>
                <td>{m.depot_legal}</td>
                <td>{m.nom_commercial}</td>
                <td>{m.effets.substring(0, 50)}...</td>
                <td>{m.contre_indication.substring(0, 50)}...</td>
                <td>{m.prix_echantillon} €</td>
                <td>
                  <button
                    onClick={() => navigate(`/medicaments/prescriptions/${m.id_medicament}`)}
                    className="edit-button"
                  >
                    Prescriptions
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>Aucun médicament trouvé.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}