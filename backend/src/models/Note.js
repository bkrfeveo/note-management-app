const mongoose = require('mongoose');


// le Schema de la note
const noteSchema = new mongoose.Schema({
  //  title: {
  //   type: String,
  //   required: [true, 'le titre  est requis'],
  //   trim: true,
  // },
  content: {
    type: String,
    required: [true, 'le contenu est requis'],
    trim: true,
  },
  category: {
    type: String,
    trim: true,
    enum: ['personnel', 'travail', 'urgent', 'reunion', 'autres'],
  },
  isFavori: {
    type: Boolean,
    trim: true,
    default: false,
  },
  files: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'L\'utilisateur est requis'],
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