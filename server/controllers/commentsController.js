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
    const { postId,email,body } = req.body;
    if (!postId ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
     const [result]= await commentsService.createComment(postId,email,body);
      res.status(201).json({id: result.insertId, postId, email, body });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create comment' });
    }
  },
  updateComment: async (req, res) => {
    const { id } = req.params;
    const { body } = req.body;

    if (!body) {
      return res.status(400).json({ error: 'Missing required field: content' });
    }

    try {
      const updated = await commentsService.updateComment(id, body);
      if (updated.affectedRows === 0) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.status(200).json({ message: 'Comment updated successfully' });
    } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).json({ error: 'Failed to update comment' });
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