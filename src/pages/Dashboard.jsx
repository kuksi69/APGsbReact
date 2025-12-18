import { useAuth } from "../context/AuthContext";
import FraisTable from "../components/FraisTable";

export default function Dashboard() {
    const { user } = useAuth();

    if (!user) {
        return <p>Vous devez être connecté pour accéder au tableau de bord.</p>;
    }

    return (
        <div className="dashboard">
            <h1>Tableau de bord</h1>
            <p>Bienvenue, {user.login} !</p> {/* message personnalisé */}
            <FraisTable />
        </div>
    );
}
