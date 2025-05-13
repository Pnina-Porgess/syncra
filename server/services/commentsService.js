const pool = require('../../db/db.js');

const commentsService = {
  getAllCommentsByPost: async (postId) => {
    return pool.query('SELECT * FROM comments WHERE post_id = ?', [postId]);
  },

  createComment: async (post_id,email,body) => {
    return pool.query('INSERT INTO comments (post_id,email,body) VALUES (?, ?, ?)', [post_id,email,body]);
  },

  deleteComment: async (id) => {
    return pool.query('DELETE FROM comments WHERE id = ?', [id]);
  },
  updateComment: async (id, body) => {
    const [result] = await pool.query('UPDATE comments SET body = ? WHERE id = ?', [body, id]);
    return result;
  },
};

module.exports = commentsService;