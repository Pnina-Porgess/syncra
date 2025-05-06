const pool = require('../../db/db.js');

const commentsService = {
  getAllCommentsByPost: async (postId) => {
    return pool.query('SELECT * FROM comments WHERE post_id = ?', [postId]);
  },

  createComment: async (postId, userId, content) => {
    return pool.query('INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)', [postId, userId, content]);
  },

  deleteComment: async (id) => {
    return pool.query('DELETE FROM comments WHERE id = ?', [id]);
  },
};

module.exports = commentsService;