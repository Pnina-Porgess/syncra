const pool = require('../../db/db.js');

const todosService = {
  getAllTodosByUser: async (userId) => {
    return pool.query('SELECT * FROM todos WHERE user_id = ? ORDER BY id ASC', [userId]);
  },

  createTodo: async (userId, title, completed = false) => {
    return pool.query('INSERT INTO todos (user_id, title, completed) VALUES (?, ?, ?)', [userId, title, completed]);
  },

  updateTodo: async (id, title, completed) => {
    return pool.query('UPDATE todos SET title = ?, completed = ?  WHERE id = ?', [title, completed, id]);
  },

  deleteTodo: async (id) => {
    return pool.query('DELETE FROM todos WHERE id = ?', [id]);
  },
};

module.exports = todosService;