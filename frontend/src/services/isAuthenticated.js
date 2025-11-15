const isAuthenticated = () => {
    // Vérifier si le token d'authentification est présent dans le stockage local
    const token = localStorage.getItem('token');
    // Retourner true si le token est présent, sinon false
    return !!token;
};

export default isAuthenticated;