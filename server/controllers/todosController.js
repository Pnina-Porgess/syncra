const todosService = require('../services/todosService');

const todosController = {
  getAllTodosByUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const [todos] = await todosService.getAllTodosByUser(userId);
      res.status(200).json(todos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  },

  createTodo: async (req, res) => {
    const { userId, title, completed } = req.body;
    if (!userId || !title) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      await todosService.createTodo(userId, title, completed);
      res.status(201).json({ message: 'Todo created' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create todo' });
    }
  },

  updateTodo: async (req, res) => {
    const { title, completed } = req.body;
    const { id } = req.params;
    if (!title || completed === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      await todosService.updateTodo(id, title, completed);
      res.status(200).json({ message: 'Todo updated' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update todo' });
    }
  },

  deleteTodo: async (req, res) => {
    const { id } = req.params;

    try {
      await todosService.deleteTodo(id);
      res.status(200).json({ message: 'Todo deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  },
};

module.exports = todosController;