const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
// router.post('/login', usersController.login);
router.get('/:id', usersController.getUserById);
router.get('/', usersController.getAllUsers);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;