import api from './api';



// Uploader un fichier
const uploadFileService = async (file, data) => {
try {
    // const [formData, setFormData] = (null);

    const response = await api.post('/files/upload', data, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    });
    return response.data;
} catch (error) {
    throw error.response?.data || error.message;
}
};


// Uploader plusieurs fichiers
const uploadMultipleFilesService = async (files, data = {}) => {
try {
    const formData = new FormData();
    
    files.forEach(file => {
    formData.append('files', file);
    });
    
    Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
    });

    const response = await api.post('/files/upload-multiple', formData, {
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