const express = require('express');
const photosController = require('../controllers/photosController');
const router = express.Router();

router.get('/', photosController.getPhotosByQuery);
//  router.get('/:id', photosController.getPhotoById);
// router.get('/album/:albumId', photosController.getPhotosByAlbum);
router.post('/', photosController.createPhoto);
router.put('/:id', photosController.updatePhoto);
router.delete('/:id', photosController.deletePhoto);

module.exports = router;