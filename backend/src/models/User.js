const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// le Schema de l'utilisateur
const userSchema = new mongoose.Schema({
   name: {
    type: String,
    required: [true, 'le nom  est requis'],
    trim: true,
    minlength: [3, 'le nom doit avoir au moins 3 characters long']
  },
  email: {
    type: String,
    required: [true, 'l\'mail est requis'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez entrer un email valide']
  },
  password: {
    type: String,
    required: [true, 'le mot de passe est requis'],
    minlength: [6, 'le mot de passe doit avoir au moins 6 characters long']
  },
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hasher le mot de passe avant  de l'enregistrer
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Verifier si le mot de passe est correct
userSchema.methods.comparePassword = async function(passwordEntered) {
  return await bcrypt.compare(passwordEntered, this.password);
};

module.exports = mongoose.model('User', userSchema);