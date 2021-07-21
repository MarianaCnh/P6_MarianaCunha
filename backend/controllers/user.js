const bcrypt = require('bcrypt');
const User = require('../models/user');

//inscription
exports.singup = (req, res, next) => {
    //fonction pour crypté un mdp
    bcrypt.hash(req.body.password, 10)//"saler" le mdp 10 fois, plus ont augmente le chiffre plus cela prendra du temps(pour le hachage du mdp)
    .then(hash => {
        //création d'un nouveau user avec un mdp crypté avec l'adresse mail 
        const user = new User({
            email: req.body.email,
            password: hash
        });
        //Ensuite l'utilisateur sera enregistré
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            //Si ont ne trouve pas l'utilisateur ont retourne une erreur car l'utilisateur n'a pas été trouvé
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !'});
            }
            //ont utilise la méthode compare pour comparer les mdp haché par bcrypt
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    //Si la comparaison n'est pas bonne alors ont retourne une erreur
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !'});
                    }
                    //Mais si la comparaison est bonne c'est que l'utilisateur a rentré des identifiants valables
                    res.status(200).json({
                        //Vu que tout est bon ont lui envoie sont userId et un token(qui deviendra le token d'authentification)
                        userId: user._id,
                        token: 'TOKEN'
                    });
                })
                .catch(error => res.status(500).json({ error}));
        })
        .catch(error => res.status(500).json({ error}));
};