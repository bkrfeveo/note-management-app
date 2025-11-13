const mongoose = require('mongoose');


// le Schema de la note
const noteSchema = new mongoose.Schema({
   title: {
    type: String,
    required: [true, 'le titre  est requis'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'la description est requise'],
    trim: true,
  },
  categorie: {
    type: String,
    trim: true,
    enum: ['personnel', 'travail', 'urgent', 'reunion', 'autres'],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


// En cas de modification de note   
noteSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});


module.exports = mongoose.model('Note', noteSchema);