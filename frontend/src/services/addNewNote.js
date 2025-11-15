import api from "./api";


const addNewNoteService = async (note) => {

    try {
        const response = await api.post('/notes', note);
        // console.log(response.data);

        return response.data;
    } catch (err) {
        console.error("Erreur lors de la connexion : ", err);
        throw err;
    }
    
};

export default addNewNoteService;