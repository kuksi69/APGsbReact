import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; 

export const getMedicamentsBySearch = async (term) => {
    try {
        const response = await axios.get(`${API_URL}/rechercheMedic`, {
            params: { recherche: term }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};