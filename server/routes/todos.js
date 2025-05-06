const express = require('express');
const todosController = require('../controllers/todosController');
const router = express.Router();

router.get('/:userId', todosController.getAllTodosByUser);
router.post('/', todosController.createTodo);
router.put('/:id', todosController.updateTodo);
router.delete('/:id', todosController.deleteTodo);

module.exports = router;