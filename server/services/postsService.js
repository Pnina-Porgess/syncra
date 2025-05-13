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
    const result = await pool.query('INSERT INTO posts (user_id, title, body) VALUES (?, ?, ?)', [user_id, title, body]);
    return result;
  },

  updatePost : async (id, user_id, title, body) => {
    try {
      const [posts] = await pool.query('SELECT * FROM posts WHERE id = ? AND user_id = ?', [id, user_id]);
      
      if (posts.length === 0) {
        throw new Error('Post not found or unauthorized');
      }
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
      const [posts] = await pool.query('SELECT * FROM posts WHERE id = ? AND user_id = ?', [id, user_id]);
      
      if (posts.length === 0) {
        throw new Error('Post not found or unauthorized');
      }
      await pool.query('DELETE FROM posts WHERE id = ?', [id]);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = postsService;