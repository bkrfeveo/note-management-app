import { Navigate } from "react-router-dom";
import isAuthenticated from "../services/isAuthenticated";


const ProtectedRoute = ({ children }) => {
    const isAuth = isAuthenticated();
    // Si l'utilisateur n'est pas connecte alors on le redirige a la page de connexion
    if (!isAuth) return <Navigate to="/connexion" />;

    // Sinon retourner l'objet 
    return children;
};

export default ProtectedRoute;
