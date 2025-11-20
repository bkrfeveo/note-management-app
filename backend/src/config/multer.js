const multer = require('multer');
const path = require('path');
const fs = require('fs');


const uploadDir = 'uploads';
// Verifier si /uploads existe sinon le creer
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration du stockage
const storage = multer.diskStorage({
    // destination est utilisé pour déterminer dans quel dossier
    //  les fichiers téléchargés doivent être stocké ('/uploads')
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  // filename est utilisé pour déterminer le nom du fichier dans le dossier. 
  filename: (req, file, cb) => {
    // Générer un nom de fichier unique
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});
   

// Filtrage des types de fichiers
const fileFilter = (req, file, cb) => {
  // Images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  }
  // Documents pdf
  else if (
    file.mimetype === 'application/pdf'
  ) {
    cb(null, true);
  }
  else {
    cb(new Error('Type de fichier non supporté'), false);
  }
};
     
  
// Configuration de Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  }
});


// Middleware pour gérer les erreurs Multer
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'Fichier trop volumineux. Taille maximale: 10MB'
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        message: 'Trop de fichiers ou champ incorrect'
      });
    }
  }
  next(error);
};

module.exports = { upload, handleMulterError };