const express = require('express');
const router = express.Router();
const pool = require('../../db/db.js');
// GET - תגובות לפי post_id
router.get('/:postId', async (req, res) => {
  const [comments] = await pool.query('SELECT * FROM comments WHERE post_id = ? ORDER BY id ASC', [req.params.postId]);
  res.json(comments);
});

// POST - תגובה חדשה
router.post('/', async (req, res) => {
  const { post_id, name, email, body } = req.body;
  await pool.query('INSERT INTO comments (post_id, name, email, body) VALUES (?, ?, ?, ?)', [post_id, name, email, body]);
  res.status(201).json({ message: 'Comment created' });
});

// PUT - עדכון תגובה (אם שייכת למשתמש)
router.put('/:id', async (req, res) => {
  const { body, email } = req.body;
  await pool.query('UPDATE comments SET body = ? WHERE id = ? AND email = ?', [body, req.params.id, email]);
  res.json({ message: 'Comment updated (if owned)' });
});

// DELETE - מחיקת תגובה (אם שייכת למשתמש)
router.delete('/:id', async (req, res) => {
  const { email } = req.body;
  await pool.query('DELETE FROM comments WHERE id = ? AND email = ?', [req.params.id, email]);
  res.json({ message: 'Comment deleted (if owned)' });
});

module.exports = router;
