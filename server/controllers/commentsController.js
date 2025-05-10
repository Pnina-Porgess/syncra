const commentsService = require('../services/commentsService');

const commentsController = {
  getAllCommentsByPost: async (req, res) => {
    const { postId } = req.params;
    try {
      const [comments] = await commentsService.getAllCommentsByPost(postId);
      res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  },

  createComment: async (req, res) => {
    const { postId, user_id, content } = req.body;
    if (!postId || !user_id || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      await commentsService.createComment(postId, user_id, content);
      res.status(201).json({ message: 'Comment created' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create comment' });
    }
  },

  deleteComment: async (req, res) => {
    const { id } = req.params;

    try {
      await commentsService.deleteComment(id);
      res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  },
};

module.exports = commentsController;