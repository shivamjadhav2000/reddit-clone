// models/Subreddit.js
const mongoose = require('mongoose');
const { create } = require('./Post');

const SubredditSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Subreddit', SubredditSchema);
