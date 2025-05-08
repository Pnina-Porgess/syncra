const postsService = require('../services/postsService');

const postsController = {
  getAllPosts: async (req, res) => {
    try {
      const [posts] = await postsService.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  },

  createPost: async (req, res) => {
    const { userId, title, body } = req.body;
    console.log("req.body", req.body);
    try {
      await postsService.createPost(userId, title, body);
      res.status(201).json({ message: 'Post created' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  },

  updatePost: async (req, res) => {
    const { user_id, title, body } = req.body;
    const { id } = req.params;
    try {
      await postsService.updatePost(id, user_id, title, body);
      res.status(200).json({ message: 'Post updated' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update post' });
    }
  },

  deletePost: async (req, res) => {
    const { user_id } = req.body;
    const { id } = req.params;
    try {
      await postsService.deletePost(id, user_id);
      res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  },
};

module.exports = postsController;