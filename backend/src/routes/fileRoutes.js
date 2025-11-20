const express = require('express');
const { 
    uploadFile, 
    uploadMultipleFiles,
    getFile, 
    getUserFiles, 
    deleteFile 
} = require('../controllers/fileControllers');
const authMiddleware = require('../middleware/authMiddleware');
const { upload, handleMulterError } = require('../config/multer');

const router = express.Router();

// Demander l'authentification a tous les routes
router.use(authMiddleware);

// upload de fichier(s)
router.post(
    '/upload', 
    upload.single('file'), 
    handleMulterError, 
    uploadFile
);

router.post(
    '/upload', 
    upload.array('file', 5), // 5 fichiers max
    handleMulterError, 
    uploadMultipleFiles
);

// route infos du fichier
router.get('/info/:filename', getFile);

// Recuperer les fichiers du user
router.get('/', getUserFiles);

// Supprimer un fichier
router.delete('/:id', deleteFile);

module.exports = router;