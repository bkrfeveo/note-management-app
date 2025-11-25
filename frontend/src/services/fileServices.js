import api from './api';



// Uploader un fichier
const uploadFileService = async (file) => {
try {
    console.log(file);
    
    const response = await api.post(
        '/files/upload', 
        file, 
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
    );
    return response.data;
} catch (error) {
    throw error.response?.data || error.message;
}
};


// Uploader plusieurs fichiers
const uploadMultipleFilesService = async (files = {}) => {
try {
    const formData = new FormData();
    
    files.forEach(file => {
    formData.append('files', file);
    });
    

    const response = await api.post('/files/upload-multiple', files, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    });
    return response.data;
} catch (error) {
    throw error.response?.data || error.message;
}
};


// Recuperer les fichiers de l'utilisateur concerne
const getUserFilesService = async (filters = {}) => {
try {
    const response = await api.get('/files/my-files', { params: filters });
    return response.data;
} catch (error) {
    throw error.response?.data || error.message;
}
};


// Recuperer les infos d'un fichier
const getFileInfoService = async (filename) => {
try {
    const response = await api.get(`/files/info/${filename}`);
    return response.data;
} catch (error) {
    throw error.response?.data || error.message;
}
};


// Supprimer un fichier
const deleteFileService = async (id) => {
try {
    const response = await api.delete(`/files/${id}`);
    return response.data;
} catch (error) {
    throw error.response?.data || error.message;
}
};


export {
    uploadFileService,
    uploadMultipleFilesService, 
    getUserFilesService,
    getFileInfoService, 
    deleteFileService
};