const File = require('../models/File');
const ImageService = require('../services/imageService');
const fs = require('fs');
const path = require('path');

// Uploader un fichier
exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier uploadé' });
        };

        const { noteId } = req.body;
        const user = req.user;
        const category = File.determineCategory(req.file.mimetype);

        // Generer l'url
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const fileUrl = `${baseUrl}/api/files/${req.file.filename}`;

        let metadata = {};
        if (category === 'image') {
            const imageMetadata = await ImageService.getImageMetadata(req.file.path);
            if (imageMetadata) {
                metadata = imageMetadata;
            };

            // Générer une miniature
            try {
                const thumbnailPath = await ImageService.generateThumbnail(req.file.path);
                metadata.thumbnail = path.basename(thumbnailPath);
            } catch (err) {
                console.error('Erreur de creation de miniature', err.message);
            }
        }

        // Creer le fichier
        const file = new File({ 
            filename: req.file.filename,
            originalName: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: req.file.path,
            url: fileUrl,
            uploadedBy: user._id,
            note: noteId,
            category,
            metadata
        });
        
        // Enregistrer le fichier
        await file.save();
        await file.populate('uploadedBy', 'name email');
        // Si un noteId est fourni, lier le fichier à la tâche
        if (noteId) {
            await file.populate('note', 'content');
            const Note = require('../models/Note');
            await Note.findByIdAndUpdate(
                noteId,
                { $push: { files: file._id } }
            );
        };

        res.status(201).json({
            message: 'Fichier uploadé avec succès !',
            file
        });
    } catch (err) {
        //  Supprimer le fichier en cas d'erreur
        fs.unlink(req.file.path);
        // Reponse avec code 500
        res.status(500).json({
            message: 'Erreur lors de l\'upload du fichier',
            error: err.message
        });
    }
};

// Uploader plusieurs fichiers
exports.uploadMultipleFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Aucun fichier uploadé' });
    }

    const { noteId } = req.body;
    const user = req.user;
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const uploadedFiles = [];

    for (const file of req.files) {
      const category = File.determineCategory(file.mimetype);
      const fileUrl = `${baseUrl}/api/files/${file.filename}`;

      const fileDoc = new File({
        filename: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path,
        url: fileUrl,
        uploadedBy: user._id,
        note: noteId || null,
        category
      });

      await fileDoc.save();
      await fileDoc.populate('uploadedBy', 'name email');
      uploadedFiles.push(fileDoc);
    }

    res.status(201).json({
      message: `${uploadedFiles.length} fichier(s) uploadé(s) avec succès`,
      files: uploadedFiles
    });

  } catch (error) {
    // Nettoyer tous les fichiers en cas d'erreur
    if (req.files) {
      for (const file of req.files) {
        fs.unlink(file.path);
      }
    }
    
    res.status(500).json({
      message: 'Erreur lors de l\'upload des fichiers',
      error: error.message
    });
  }
};


// Recuperer un fichier
exports.getFile = async (req,res) => {
    try {
        const file = await File.find({ filename: req.params.filename })
        // .populate('uploadedBy', 'name email')
        .populate('note', 'content');

        if (!file) {
           return res.status(404).json({ message: 'Fichier non trouvé' });
        };

        if (file.uploadedBy._id.toString() !== req.user._id.toString()) {
           return res.status(403).json({ message: 'Accès non autorisé à ce fichier' });
        };

        res.status(200).json({
            message: "Fichier recuperer avec succes !",
            file
        });
    } catch (err) {
        res.status(500).json({
            message: 'Erreur lors de la récupération du fichier',
            error: err.message
        });
    }
};

// Recuperer les fichiers d'un user
exports.getUserFiles = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, noteId } = req.query;
        const userId = req.user._id;
        const filter = { uploadedBy: userId };
        if (category) filter.category = category;
        if (noteId) filter.note = noteId;

        const files = await File.find(filter)
        .populate('note', 'content')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

        const total = await File.countDocuments(filter);

        res.status(200).json({
            files,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des fichiers',
            error: error.message
        });
    }
};

// Supprimer un fichier
exports.deleteFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
        return res.status(404).json({ message: 'Fichier non trouvé' });
        }

        // Vérifier que l'utilisateur est le propriétaire
        if (file.uploadedBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Accès non autorisé' });
        }

        // La suppression du fichier physique est gérée par le middleware pre('deleteOne')
        await File.findByIdAndDelete(req.params.id);

        res.json({ message: 'Fichier supprimé avec succès' });

    } catch (error) {
        res.status(500).json({
        message: 'Erreur lors de la suppression du fichier',
        error: error.message
        });
    }
}