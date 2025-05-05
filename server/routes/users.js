// routes/users.js
const express = require('express');
const router = express.Router();
const pool = require('../../db/db.js');
// GET כל המשתמשים
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection(); // קבלת חיבור מהבריכה
    const [rows] = await connection.query('SELECT id, username, name, email FROM users');
    connection.release(); // שחרור החיבור
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
});
router.post('/', async (req, res) => {
  const { username, name, email } = req.body; // קבלת נתונים מהבקשה
  if (!username || !name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const connection = await pool.getConnection(); // קבלת חיבור מהבריכה
    const query = 'INSERT INTO users (username, name, email) VALUES (?, ?, ?)';
    const [result] = await connection.query(query, [username, name, email]);
    connection.release(); // שחרור החיבור
    res.status(201).json({ message: 'User added successfully', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
  }
});

module.exports = router;
