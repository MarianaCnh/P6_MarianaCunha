const express = require('express');
const router = express.Router();
//constante qui appelle les contrôleurs
const stuffCtrl = require('../controllers/sauces');

//Routes pour gérer les sauces

router.post('/', stuffCtrl.createSauce);
router.put('/:id', stuffCtrl.modifySauce);
router.delete('/:id', stuffCtrl.deleteSauce);
router.get('/:id', stuffCtrl.getOneSauce);
router.get('/', stuffCtrl.getAllSauces);


module.exports = router;
