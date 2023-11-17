const express = require('express');
const router = express.Router();

const infoController = require('../controllers/info');

router.get('/', infoController.getAll);

router.get('/:id', infoController.getSingle);

router.post('/:id', infoController.createUserInfo);

router.put('/:id', infoController.updateUserInfo);

router.delete('/:id', infoController.deleteUserInfo);

module.exports = router;