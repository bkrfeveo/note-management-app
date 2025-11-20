const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: [true, 'Le nom du fichier est requis'],
        trim: true
    },
    originalName: {
        type: String,
        required: [true, 'Le nom original est requis']
    },
    mimetype: { // Ex: image/png, application/pdf
        type: String,
        required: [true, 'Le type MIME est requis']
    },
    size: { // taille en octets
        type: Number,
        required: [true, 'La taille est requise'],
        min: [1, 'La taille doit être supérieure à 0']
    },
    path: {
        type: String,
        required: [true, 'Le chemin est requis']
    },
    url: {
        type: String,
        required: [true, 'L\'URL est requise']
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'L\'utilisateur est requis']
    },
    note: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
        required: true // Optionnel, pour lier à une tâche
    },
    category: {
        type: String,
        enum: ['image', 'document', 'other'],
        required: [true, 'La catégorie est requise']
    }
},
{
    timestamps: true // Crée automatiquement createdAt et updatedAt
}
);



// Index pour les recherches
fileSchema.index({ uploadedBy: 1, createdAt: -1 });
fileSchema.index({ note: 1 });
fileSchema.index({ category: 1 });


// Méthode pour déterminer la catégorie
fileSchema.statics.determineCategory = function(mimetype) {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('application/')) return 'document';
  return 'other';
};


// Méthode pour formatter la taille
fileSchema.methods.getFormattedSize = function() {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = this.size;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    /**
     * Condition du while
     * size >= 1024 : continue tant que la taille peut être convertie
     * unitIndex < units.length - 1 : s'arrête avant "GB" 
     */
  
    // retourner un valeur a 1 chiffre apres la virgule
    // Ex: 1.389583 -> 1.4 unit[unitIndex] (B ou KB ou ...)
  return `${size.toFixed(1)} ${units[unitIndex]}`;
};


// Middleware pour supprimer le fichier physique lors de la suppression du document
fileSchema.pre(
    'deleteOne',
    { document: true, query: false }, //  s'applique uniquement aux documents
    async function(next) {
        try {
            // importer version async/await du module fs
            const fs = require('fs').promises; 
            // vérifier et supprimer le fichier s'il existe
            if (this.path && fs.existsSync(this.path)) {
                await fs.unlink(this.path);
            }
            // continue avec la suppression dans MongoDB
            next();
        } catch (error) {
            // annule l'opération en cas d'erreur
            next(error);
        }
    }
);

module.exports = mongoose.model('File', fileSchema);