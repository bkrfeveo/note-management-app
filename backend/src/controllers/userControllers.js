const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
};


// Inscrire un nouveau user
exports.register =  async (req, res) => {
    try {
        const newUser = { 
            name: req.body.name,
            email: req.body.email,
            // Le mot de passe est hashé dans /models/User.js a la ligne 40
            password: req.body.password
        };
        
        // Voir si l'utilisateur existe
        const user = await User.findOne({ email: newUser.email });

        // Si l'utilisateur n'a jamais eu de compte alors on l'inscrit
        if(!user){
            // controle de saisie en verifiant si les champs sont vides ou absents
            if(
                !newUser.name || newUser.name === "" ||
                !newUser.email || newUser.email === "" ||
                !newUser.password || newUser.password === ""
            ) {
                res.status(400).json({ message: "Vous devez remplir tous les champs" });
            } else {
                const user = new User(newUser);
                await user.save();
                const accessToken = generateToken(user._id)
                res.status(201).json({
                    message: "Incription reussie !",
                    token: accessToken,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        password: user.password
                    }
                });
            };
        // Sinon message d'erreur disant que l'utilisateur existe deja
        } else {
            res.status(404).json({ message: "Erreur un utilisateur avec cet email a deja un compte" });
        }
    } catch(err) {
        res.status(500).json({
            message: "Erreur lors de l'inscription",
            error: err.message
        });
    }
};


// Connexion d'un utilisateur
exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if(!email || !password) {
            res.status(404).json({ message: "Veuillez remplir tous les champs" });
        };
        
        // Vérifier si l'utilisateur avec cette email existe
        const user = await User.findOne({ email });
        
        // Vérified si le password entré est correct grace à bcrypt
        const verifiedPassword = bcrypt.compareSync(password, user.password); // True or false 


        // Si email et password sont verifiés alors on génère un jwt access token
        if(user && verifiedPassword) {
            // console.log(user._id);
            
            const accessToken = generateToken(user._id)

            res.status(200).json({
                message: "Utilisateur connectee avec succès !",
                token: accessToken,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                }
            });
        } else {
            res.status(400).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
        };
    } catch(err) {
        res.status(500).json({
            message: 'Erreur lors de la connexion',
            error: err.message
        });
    }

};


exports.profile = async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la recuperation des donnees',
      error: error.message
    });
  }
};
