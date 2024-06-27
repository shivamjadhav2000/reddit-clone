const { ObjectId } = require('mongodb');
const User = require('../models/User');
const Post = require('../models/Post');
const Subreddit = require('../models/Subreddit');
const { title } = require('process');
const { json } = require('body-parser');
// controllers/userController.js

exports.createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

exports.getUserProfile = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    // Fetch user details with subscribed subreddits
    const user = await User.findById(userId).populate('subscribedSubreddits');
    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });
    const subredditsvsupvotes = {};
    for (let post of posts) {
      subredditsvsupvotes[post.subreddit] = subredditsvsupvotes[post.subreddit] + post.upvotes.length || post.upvotes.length;
    }
    // Deep copy the user object and modify it
    const newuser = JSON.parse(JSON.stringify(user));
    newuser.subscribedSubreddits = user.subscribedSubreddits.map(subreddit => ({
      ...subreddit.toObject(),
      upvotes: subredditsvsupvotes[subreddit._id] || 0
    }));

    newuser.totalupvotes = posts.reduce((acc, post) => acc + post.upvotes.length, 0);

    console.log(subredditsvsupvotes);
    res.status(200).json({ ...newuser });
  }

  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching user profile' });
  }
};