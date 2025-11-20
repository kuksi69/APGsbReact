import React, { useState, useEffect } from "react";
import { fraisData } from "../data/frais.json";

export default function FraisTable() {
  const [fraisListe, setFraisListe] = useState([]);

  // Initialiser l'état avec les données importées
  useEffect(() => {
    setFraisListe(fraisData);
  }, []);

  return (
    <div className="frais-table-container">
      <h2>Liste des Frais</h2>
      <table className="frais-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID État</th>
            <th>Année-Mois</th>
            <th>ID Visiteur</th>
            <th>Nombre de justificatifs</th>
            <th>Date de modification</th>
            <th>Montant validé</th>
          </tr>
        </thead>
        <tbody>
          {fraisListe.map((frais) => (
            <tr key={frais.id}>
              <td>{id_frais}</td>
              <td>{id_Etat}</td>
              <td>{anneemois}</td>
              <td>{id_visiteur}</td>
              <td>{nbjustificatifs}</td>
              <td>{datemodification}</td>
              <td>{montantvalide}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

