const pool = require('../../db/db.js');

const postsService = {
  getAllPosts: async () => {
    return pool.query('SELECT * FROM posts ORDER BY id ASC');
  },

  getAllPostsByUser : async (user_id) => {
    return pool.query('SELECT * FROM posts WHERE user_id = ?', [user_id]);
  },
  createPost: async (user_id, title, body) => {
    if (!user_id || !title || !body) {
      throw new Error('Missing required fields');
    }
    console.log('Executing query:', 'INSERT INTO posts (user_id, title, body) VALUES (?, ?, ?)', [user_id, title, body]);
    const result = await pool.query('INSERT INTO posts (user_id, title, body) VALUES (?, ?, ?)', [user_id, title, body]); // שימוש ב-userId
    return result;
  },

  updatePost : async (id, user_id, title, body) => {
    try {
      // בדוק אם הפוסט שייך למשתמש
      const [posts] = await pool.query('SELECT * FROM posts WHERE id = ? AND user_id = ?', [id, user_id]);
      
      if (posts.length === 0) {
        throw new Error('Post not found or unauthorized');
      }
  
      // עדכן את הפוסט
      await pool.query(
        'UPDATE posts SET title = ?, body = ? WHERE id = ?',
        [title, body, id]
      );
    } catch (error) {
      throw error;
    }
  },

  deletePost : async (id, user_id) => {
    try {
      // בדוק אם הפוסט שייך למשתמש
      const [posts] = await pool.query('SELECT * FROM posts WHERE id = ? AND user_id = ?', [id, user_id]);
      
      if (posts.length === 0) {
        throw new Error('Post not found or unauthorized');
      }
  
      // מחק את הפוסט
      await pool.query('DELETE FROM posts WHERE id = ?', [id]);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = postsService;