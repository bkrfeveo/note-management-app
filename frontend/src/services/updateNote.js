import api from "./api";


const updateNoteService = async (note, id) => {
    try {
        const response = await api.put(`/notes/${id}`, note);
        // console.log(response.data);

        return response.data;
    } catch (err) {
        console.error("Erreur lors de la mise a jour d'une note : ", err);
        throw err;
    }
};

export default updateNoteService;