const pool = require('../../db/db.js');

const postsService = {
  getAllPosts: async () => {
    return pool.query('SELECT * FROM posts ORDER BY id ASC');
  },

  getAllPostsByUser : async (userId) => {
    return pool.query('SELECT * FROM posts WHERE user_id = ?', [userId]);
  },

  createPost: async (user_id, title, body) => {
    return pool.query('INSERT INTO posts (user_id, title, body) VALUES (?, ?, ?)', [user_id, title, body]);
  },

  updatePost: async (id, user_id, title, body) => {
    return pool.query('UPDATE posts SET title = ?, body = ? WHERE id = ? AND user_id = ?', [title, body, id, user_id]);
  },

  deletePost: async (id, user_id) => {
    return pool.query('DELETE FROM posts WHERE id = ? AND user_id = ?', [id, user_id]);
  },
};

module.exports = postsService;