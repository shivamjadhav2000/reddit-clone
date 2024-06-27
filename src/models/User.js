
// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscribedSubreddits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subreddit' }],
});

module.exports = mongoose.model('User', UserSchema);
