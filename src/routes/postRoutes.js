// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const { createPost, getPosts, upvotePost, addComment, getMyPosts } = require('../controllers/postController');

router.post('/', createPost);
router.get('/', getMyPosts)
router.get('/:subredditId', getPosts);
router.post('/upvote/:postId', upvotePost);
router.post('/comment/:postId', addComment);

module.exports = router;