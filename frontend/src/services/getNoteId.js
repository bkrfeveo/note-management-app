import api from "./api";


const getNoteIdService = async (id) => {
    try {
        const response = await api.get(`/notes/${id}`);
        // console.log(response.data);

        return response.data;
    } catch (err) {
        console.error("Erreur lors de la recuperation de la note demandée : ", err);
        throw err;
    }
};

export default getNoteIdService;