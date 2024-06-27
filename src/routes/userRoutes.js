// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { createUser, getUserProfile } = require('../controllers/userController');

router.post('/', createUser);
router.get('/:userId', getUserProfile);

module.exports = router;