import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, API_URL } from '../services/authService';
import axios from 'axios';

export default function FraisForm({ frais, onSubmit }) {
    const [idFrais, setIdFrais] = useState(null);
    const [anneeMois, setAnneeMois] = useState('');
    const [nbJustificatifs, setNbJustificatifs] = useState('');
    const [montant, setMontant] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    <Link className="frais-hors-forfait-link" to={`/frais/${idFrais}/hors-forfait`}>Frais hors forfait</Link>

    useEffect(() => {
        if (frais) {
            setIdFrais(frais.id_frais);
            setMontant(frais.montantvalide || '');
            setAnneeMois(frais.anneemois || '');
            setNbJustificatifs(frais.nbjustificatifs || '');
        }
    }, [frais]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token manquant');

            const fraisData = {
                anneemois: anneeMois,
                nbjustificatifs: parseInt(nbJustificatifs, 10),
            };

            let response;

            if (frais) {
                fraisData["id_frais"] = idFrais;
                fraisData["montantvalide"] = parseFloat(montant);

                response = await axios.post(
                    `${API_URL}frais/modif`,  
                    fraisData,                   
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                fraisData["id_visiteur"] = getCurrentUser()["id_visiteur"];

                response = await axios.post(
                    `${API_URL}frais/ajout`,
                    fraisData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }

            console.log(response);

            if (onSubmit) await onSubmit(fraisData);

            navigate('/dashboard');

        } catch (err) {
            console.error('Erreur:', err);
            setError(
                err.response?.data?.message ||
                err.message ||
                "Erreur lors de l'enregistrement"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="frais-form-container">
            <form onSubmit={handleSubmit} className="frais-form">

                {error && <p className="error-message">{error}</p>}

                <h1 className="text-2xl font-bold mb-4">
                    {frais ? 'Modifier un frais' : 'Saisir un frais'}
                </h1>

                <div className="form-group">
                    <label>Année/Mois</label>
                    <input
                        type="text"
                        value={anneeMois}
                        onChange={(e) => setAnneeMois(e.target.value)}
                        placeholder="202310"
                        disabled={!!frais}
                    />
                </div>

                <div className="form-group">
                    <label>Nombre de justificatifs</label>
                    <input
                        type="number"
                        value={nbJustificatifs}
                        onChange={(e) => setNbJustificatifs(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Montant</label>
                    <input
                        type="number"
                        step="0.01"
                        value={montant}
                        onChange={(e) => setMontant(e.target.value)}
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading
                        ? 'Enregistrement...'
                        : frais ? 'Modifier' : 'Ajouter'}
                </button>
            </form>
        </div>
    );
}

