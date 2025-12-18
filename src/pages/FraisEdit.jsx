import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FraisForm from "../components/FraisForm";
import { API_URL } from "../services/authService";

export default function FraisEdit() {
    const { id } = useParams();
    const [frais, setFrais] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFrais = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}frais/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFrais(response.data);
            } catch (error) {
                console.error('Erreur:', error);
                setFrais(null);
            } finally {
                setLoading(false);
            }
        };

        fetchFrais();
    }, [id]);

    if (loading) return <div>Chargement...</div>;

    if (!frais) return <div>Frais non trouvé</div>;

    return <FraisForm frais={frais} />;
}


