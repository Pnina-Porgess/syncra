const express = require('express');
const router = express.Router();
const pool = require('../../db/db.js');
// GET - כל הטודואים של משתמש לפי user_id
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const [todos] = await pool.query('SELECT * FROM todos WHERE user_id = ? ORDER BY id ASC', [userId]);
  res.json(todos);
});

// POST - יצירת todo חדש
router.post('/', async (req, res) => {
  const { user_id, title, completed } = req.body;
  await pool.query('INSERT INTO todos (user_id, title, completed) VALUES (?, ?, ?)', [user_id, title, completed]);
  res.status(201).json({ message: 'Todo created' });
});

// PUT - עדכון todo
router.put('/:id', async (req, res) => {
  const { title, completed } = req.body;
  await pool.query('UPDATE todos SET title = ?, completed = ? WHERE id = ?', [title, completed, req.params.id]);
  res.json({ message: 'Todo updated' });
});

// DELETE - מחיקת todo
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM todos WHERE id = ?', [req.params.id]);
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
