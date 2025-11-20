import api from "./api";

// Inscription d'un utilisateur
const registerService = async (name, email, password) => {
    try {
        const response = await api.post('auth/register', { name, email, password });
        // setDatas(response);
        console.log(response.data);

        // Stocker le token dans le localStorage
        // localStorage.setItem("token", response.data.token);
        // localStorage.setItem("user", JSON.stringify(response.data.user));

        return response.data;
    } catch (err) {
        console.error("Erreur lors de l'inscription : ", err);
        throw err;
    }
    
};


// Connexion d'un utilisateur
const loginService = async (email, password) => {
    try {
        const response = await api.post('auth/login', { email, password });
        // console.log(response.data);

        // Stocker le token dans le localStorage
        localStorage.setItem("token", response.data.token);
        // localStorage.setItem("user", JSON.stringify(response.data.user));

        return response.data;
    } catch (err) {
        console.error("Erreur lors de la connexion : ", err);
        throw err;
    }
    
};


// Deconnexion
const logoutService = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

export { registerService, loginService, logoutService  };