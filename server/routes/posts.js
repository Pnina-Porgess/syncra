const express = require('express');
const router = express.Router();
const pool = require('../../db/db.js');
// GET - כל הפוסטים
router.get('/', async (req, res) => {
  const [posts] = await pool.query('SELECT * FROM posts ORDER BY id ASC');
  res.json(posts);
});

// POST - יצירת פוסט
router.post('/', async (req, res) => {
  const { user_id, title, body } = req.body;
  await pool.query('INSERT INTO posts (user_id, title, body) VALUES (?, ?, ?)', [user_id, title, body]);
  res.status(201).json({ message: 'Post created' });
});

// PUT - עדכון פוסט (רק אם הוא של המשתמש)
router.put('/:id', async (req, res) => {
  const { user_id, title, body } = req.body;
  await pool.query('UPDATE posts SET title = ?, body = ? WHERE id = ? AND user_id = ?', [title, body, req.params.id, user_id]);
  res.json({ message: 'Post updated (if owned)' });
});

// DELETE - מחיקת פוסט (רק אם הוא של המשתמש)
router.delete('/:id', async (req, res) => {
  const { user_id } = req.body;
  await pool.query('DELETE FROM posts WHERE id = ? AND user_id = ?', [req.params.id, user_id]);
  res.json({ message: 'Post deleted (if owned)' });
});

module.exports = router;
