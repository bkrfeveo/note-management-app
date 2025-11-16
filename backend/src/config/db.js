const mongoose = require('mongoose');


const connectDB = async () => {
  console.log("Variable env : ", process.env.MONGODB_URI);
  
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connectée: ${conn.connection.host}`);
  } catch (error) {
    console.error('Erreur de connexion de la base de donnees:', error);
  }
};

module.exports = connectDB;