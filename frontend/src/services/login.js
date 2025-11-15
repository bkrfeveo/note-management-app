import api from "./api";


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

export default loginService;