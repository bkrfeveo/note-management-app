const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/userRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));

// Lancer le serveur sur le port 3000
app.listen(port, () => {
  console.log(`app.js est lance sur le port ${port}`);
})