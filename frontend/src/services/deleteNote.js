import api from "./api";


const deleteNoteService = async (id) => {
    try {
        const response = await api.delete(`/notes/${id}`);
        // console.log(response.data);

        return response.data;
    } catch (err) {
        console.error("Erreur lors de la suppression d'une note : ", err);
        throw err;
    }
};

export default deleteNoteService;