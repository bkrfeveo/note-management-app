import api from './api';



// Uploader un fichier
const uploadFile = async (file, data = {}) => {
try {
    const formData = new FormData();
    formData.append('file', file);
    
    Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
    });

    const response = await api.post('/files/upload', formData, {
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
const uploadMultipleFiles = async (files, data = {}) => {
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
const getUserFiles = async (filters = {}) => {
try {
    const response = await api.get('/files/my-files', { params: filters });
    return response.data;
} catch (error) {
    throw error.response?.data || error.message;
}
};


// Recuperer les infos d'un fichier
const getFileInfo = async (filename) => {
try {
    const response = await api.get(`/files/info/${filename}`);
    return response.data;
} catch (error) {
    throw error.response?.data || error.message;
}
};


// Supprimer un fichier
const deleteFile = async (id) => {
try {
    const response = await api.delete(`/files/${id}`);
    return response.data;
} catch (error) {
    throw error.response?.data || error.message;
}
};


export {
    uploadFile,
    uploadMultipleFiles, 
    getUserFiles,
    getFileInfo, 
    deleteFile
};