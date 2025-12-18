import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css"; // Assurez-vous que Navbar.css contient les classes nécessaires
import "../styles/FraisForm.css";

function Navbar() {
    const { user, logoutUser } = useAuth(); // Récupération du user et logoutUser
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();       // déconnexion
        navigate("/login"); // redirection vers la page de login
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">Accueil</Link>
                {user && <Link to="/dashboard">Tableau de bord</Link>} {/* conditionnel */}
                {user && <Link to="/ajouter">Saisir une node de frais</Link>}
            </div>

            <div className="navbar-right">
                {user ? (
                    <>
                        <span className="navbar-user">Bonjour, {user.login}</span>
                        <button onClick={handleLogout}>Déconnexion</button>
                    </>
                ) : (
                    <Link to="/login">Connexion</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;


