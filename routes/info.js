const express = require('express');
const router = express.Router();

const infoController = require('../controllers/info');
const validation = require('../middleware/validate');

router.get('/', infoController.getAll);

router.get('/:id', infoController.getSingle);

router.post('/:id', validation.saveUserInfo, infoController.createUserInfo);

router.put('/:id', validation.saveUserInfo, infoController.updateUserInfo);

router.delete('/:id', infoController.deleteUserInfo);

module.exports = router;