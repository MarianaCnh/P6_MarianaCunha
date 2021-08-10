const express = require('express');
const router = express.Router();
//constante qui appelle les contrôleurs
const stuffCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const usersauce = require('../middleware/usersauce');

//Routes pour gérer les sauces

router.post('/' , auth , multer, stuffCtrl.createSauce);
router.put('/:id', auth, usersauce, multer,stuffCtrl.modifySauce);
router.delete('/:id', auth, usersauce, stuffCtrl.deleteSauce);
router.get('/:id', auth,stuffCtrl.getOneSauce);
router.get('/', auth,stuffCtrl.getAllSauces);
router.post('/:id/like', auth, stuffCtrl.likeSauce);


module.exports = router;
