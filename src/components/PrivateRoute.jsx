import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
    const { user } = useAuth(); // récupère l'utilisateur connecté

    // Si l'utilisateur est connecté, afficher le composant enfant (ex: Dashboard)
    if (user) {
        return children;
    }

    // Sinon, rediriger vers la page de connexion
    return <Navigate to="/login" />;
}
