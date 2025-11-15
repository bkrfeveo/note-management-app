import api from "./api";


const getAllNotesService = async () => {
    try {
        const response = await api.get('/notes');
        console.log(response.data);

        return response.data;
    } catch (err) {
        console.error("Erreur lors de la recuperation des notes : ", err);
        throw err;
    }
};

export default getAllNotesService;