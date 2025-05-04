const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/api/posts', postController.getAllPosts);
router.get('/api/user-posts', postController.getUserPosts);
router.post('/add-post', postController.addPost);
router.delete('/api/posts/:id', postController.deletePost);

module.exports = router;