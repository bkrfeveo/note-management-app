const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/db');
require('dotenv').config();

connectDB();


const app = express();
const port = process.env.PORT || 3000;



app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./src/routes/userRoutes'));
app.use('/api/notes', require('./src/routes/noteRoutes'));

// Servir les fichiers uploadés statiquement
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/files', require('./src/routes/fileRoutes'));

// Lancer le serveur sur le port 3000
app.listen(port, () => {
  console.log(`app.js est lance sur le port ${port}`);
})