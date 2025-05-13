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

  getAllPostsByUser: async (req, res) => {
    const { user_id } = req.params;
    try {
      const [posts] = await postsService.getAllPostsByUser(user_id);
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts by user:', error);
      res.status(500).json({ error: 'Failed to fetch posts by user' });
    }
  },

  createPost: async (req, res) => {
    const { user_id, title, body } = req.body;
    if (!user_id || !title || !body) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
      const [result] = await postsService.createPost(user_id, title, body);
      res.status(201).json({id: result.insertId, user_id, title, body });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  },

  updatePost: async (req, res) => {
    const { id } = req.params;
    const { user_id, title, body } = req.body;
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