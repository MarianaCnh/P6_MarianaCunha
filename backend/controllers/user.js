const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
                        //ont utilise la méthode sign de jsonwebtoken pour encoder un nouveau token
                        token: jwt.sign(
                            //ce token contient l'ID de l'utilisateur en tant que payload (les données encodées dans le token)
                            { userId: user._id },
                            //ont utilise une chaîne secrète de développement temporaire RANDOM_SECRET_KEY pour encoder notre token (à remplacer par une chaîne aléatoire beaucoup plus longue pour la production)
                            'RANDOM_TOKEN_SECRET',
                            //ont défini la durée de validité du token à 24 heures. L'utilisateur devra donc se reconnecter au bout de 24 heures
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error}));
        })
        .catch(error => res.status(500).json({ error}));
};