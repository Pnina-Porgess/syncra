const photosService = require('../services/photosService');

const photosController = {
  getPhotosByQuery: async (req, res) => {
    const { albumId, _start = 0, _limit = 20 } = req.query;
    if (!albumId) return res.status(400).json({ error: 'Missing albumId' });

    try {
      const photos = await photosService.getPhotosByAlbumWithPagination(
        albumId,
        parseInt(_start),
        parseInt(_limit)
      );
      res.status(200).json(photos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch photos' });
    }
  },
  // ...שאר הפונקציו
//   getAllPhotos: async (req, res) => {
//     try {
//       const [photos] = await photosService.getAllPhotos();
//       res.status(200).json(photos);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch photos' });
//     }
//   },
  getPhotoById: async (req, res) => {
    try {
      const photo = await photosService.getPhotoById(req.params.id);
      if (!photo) return res.status(404).json({ error: 'Photo not found' });
      res.status(200).json(photo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch photo' });
    }
  },
  getPhotosByAlbum: async (req, res) => {
    try {
      const [photos] = await photosService.getPhotosByAlbum(req.params.albumId);
      res.status(200).json(photos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch photos' });
    }
  },
  createPhoto: async (req, res) => {
    const { albumId, url, thumbnailUrl, title } = req.body;
    if (!albumId || !url || !thumbnailUrl) return res.status(400).json({ error: 'Missing required fields' });
    try {
      const [result] = await photosService.createPhoto(albumId, url, thumbnailUrl, title);
      res.status(201).json({ id: result.insertId, albumId, url, thumbnailUrl, title });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create photo' });
    }
  },
  updatePhoto: async (req, res) => {
    const {  title } = req.body;
    console.log("title", title)
    if ( title === undefined)
      return res.status(400).json({ error: 'Missing fields to update' });
    try {
      const result = await photosService.updatePhoto(req.params.id, title);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Photo not found' });
      res.status(200).json({ message: 'Photo updated' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update photo' });
    }
  },
  deletePhoto: async (req, res) => {
    try {
      const result = await photosService.deletePhoto(req.params.id);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Photo not found' });
      res.status(200).json({ message: 'Photo deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete photo' });
    }
  },
};

module.exports = photosController;