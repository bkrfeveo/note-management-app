import api from "./api";

// Recuperer toutes les notes de l'utilisateur
const getAllNotesService = async () => {
    try {
        const response = await api.get('/notes');
        // console.log(response.data);

        return response.data;
    } catch (err) {
        console.error("Erreur lors de la recuperation des notes : ", err);
        throw err;
    }
};


// Recuperer une note par son id
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


// Ajouter une nouvelle note
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

// Mettre a jour une note
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


// Supprimer une note
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

export { 
    getAllNotesService,
    getNoteIdService, 
    addNewNoteService, 
    updateNoteService, 
    deleteNoteService
};