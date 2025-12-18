import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
    const { token, loading } = useAuth(); // récupère l'utilisateur connecté
    if (loading) {
        return (<div>Chargement...</div>);
    }
    // Si l'utilisateur est connecté, afficher le composant enfant (ex: Dashboard)
    if (token) {
        return children;
    }

    // Sinon, rediriger vers la page de connexion
    return <Navigate to="/login" />;
}
