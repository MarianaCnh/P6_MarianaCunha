// dotenv pour utiliser les variables d'environnement pour définir la configuration de l'application(mdp, bases de données)
require('dotenv').config();
const express = require('express');
//importation de mongoose
const mongoose = require('mongoose');
//pour nos modéles de sauces
const Sauce = require('./models/sauces');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://user:2306@cluster0.lgu3d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();
const bodyParser = require('body-parser');



// Accés à l'API 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());


app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;