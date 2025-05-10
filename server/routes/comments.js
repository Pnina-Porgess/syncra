const express = require('express');
const commentsController = require('../controllers/commentsController');
const router = express.Router();

router.get('/:postId', commentsController.getAllCommentsByPost);
router.post('/', commentsController.createComment);
router.delete('/:id', commentsController.deleteComment);
router.put('/:id', commentsController.updateComment); // נתיב לעדכון תגובה

module.exports = router;