//Besoin de express pour créer un router 
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

//routes pour s'inscrire et se connecter
router.post('/signup', userCtrl.singup);
router.post('/login', userCtrl.login);

module.exports = router;
