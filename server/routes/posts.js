const express = require('express');
const postsController = require('../controllers/postsController');
const router = express.Router();

router.get('/', postsController.getAllPosts);
router.get('/user/:userId', postsController.getAllPostsByUser);
router.post('/', postsController.createPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);
// router.get('/users/:userId/posts', postsController.getAllPosts);

module.exports = router;