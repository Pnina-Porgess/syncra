const albumsService = require('../services/albumsService');

const albumsController = {
  getAllAlbums: async (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'Missing userId' });
    try {
      const [albums] = await albumsService.getAllAlbumsByUser(userId);
      res.status(200).json(albums);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch albums' });
    }
  },
  getAlbumById: async (req, res) => {
    try {
      const album = await albumsService.getAlbumById(req.params.id);
      if (!album) return res.status(404).json({ error: 'Album not found' });
      res.status(200).json(album);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch album' });
    }
  },
  createAlbum: async (req, res) => {
    const { title, userId } = req.body;
    if (!title || !userId) return res.status(400).json({ error: 'Missing title or userId' });
    try {
      const [result] = await albumsService.createAlbum(title, userId);
      res.status(201).json({ id: result.insertId, title, userId });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create album' });
    }
  },
  updateAlbum: async (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Missing title' });
    try {
      const result = await albumsService.updateAlbum(req.params.id, title);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Album not found' });
      res.status(200).json({ message: 'Album updated' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update album' });
    }
  },
  deleteAlbum: async (req, res) => {
    try {
      const result = await albumsService.deleteAlbum(req.params.id);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Album not found' });
      res.status(200).json({ message: 'Album deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete album' });
    }
  },
};

module.exports = albumsController;