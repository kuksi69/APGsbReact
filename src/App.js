import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import FraisAdd from "./pages/FraisAdd";
import FraisEdit from "./pages/FraisEdit";
import FraisHorsForfait from "./pages/FraisHorsForfait";
import FraisHorsForfaitAdd from "./pages/FraisHorsForfaitAdd";
import FraisHorsForfaitEdit from "./pages/FraisHorsForfaitEdit";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Frais généraux */}
          <Route path="/frais/ajouter" element={<FraisAdd />} />
          <Route path="/frais/modifier/:id" element={<FraisEdit />} />

          {/* Frais hors forfait */}
          <Route path="/frais/:id/hors-forfait" element={<FraisHorsForfait />} />

          {/* Route protégée pour ajouter un frais hors forfait */}
          <Route 
            path="/frais/:id/hors-forfait/ajouter" 
            element={
              <PrivateRoute>
                <FraisHorsForfaitAdd />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/frais/:id/hors-forfait/modifier/:idHF" 
            element={
              <PrivateRoute>
                <FraisHorsForfaitEdit />
              </PrivateRoute>
            } 
          />

          {/* Routes protégées */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/ajouter" 
            element={
              <PrivateRoute>
                <FraisAdd />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
