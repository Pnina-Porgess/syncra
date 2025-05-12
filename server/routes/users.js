const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
router.get('/check-password', usersController.checkPassword);
router.get('/:id', usersController.getUserById);
router.get('/', usersController.getAllUser);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;