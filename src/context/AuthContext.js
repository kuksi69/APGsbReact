import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // État local pour stocker l'utilisateur (null = non connecté)
    const [user, setUser] = useState(null);

    // Fonction de connexion
    const loginUser = (login, password) => {
        // Vérification simplifiée : login = "Andre" et password = "secret"
        if (login === "Andre" && password === "secret") {
            setUser({ login }); // met à jour l'état avec l'utilisateur connecté
            return true;        // connexion réussie
        } else {
            return false;       // connexion échouée
        }
    };

    // Fonction de déconnexion
    const logoutUser = () => {
        setUser(null); // réinitialise l'état à null
    };

    // Valeurs exposées aux composants enfants
    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children} 
        </AuthContext.Provider>
    );
}

// Hook personnalisé pour utiliser le contexte facilement
export function useAuth() {
    return useContext(AuthContext);
}
