import { createContext, use, useContext, useEffect, useState } from 'react';
import { signIn, logout, getCurrentUser, getAuthToken } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState("")
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = getCurrentUser();
        const token = getAuthToken();
        if (user && token) {
            setUser(user);
            setToken(token);
            setLoading(false);
        }
    })

    // Fonction de connexion
    const loginUser = async (login, password) => {
        const data = await signIn(login, password);
        setUser(data.visiteur);
        setToken(data.access_token);
        return data;
    };

    // Fonction de déconnexion
    const logoutUser = () => {
        logout();
        setUser(null);
        setToken(null);
    };

    // Valeurs exposées aux composants enfants
    return (
        <AuthContext.Provider value={{ user, token, loading, loginUser, logoutUser }}>
            {children} 
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte facilement
export function useAuth() {
    return useContext(AuthContext);
};
