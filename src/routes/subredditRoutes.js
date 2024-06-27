// routes/subredditRoutes.js
const express = require('express');
const router = express.Router();
const { createSubreddit, getSubreddits, subscribeSubreddit } = require('../controllers/subredditController');

router.post('/', createSubreddit);
router.get('/', getSubreddits);
router.post('/subscribe', subscribeSubreddit);

module.exports = router;