// controllers/subredditController.js
const Subreddit = require('../models/Subreddit');
const User = require('../models/User');
const Post = require('../models/Post');

exports.createSubreddit = async (req, res) => {
  const { name, description, user } = req.body;
  try {
    const subreddit = new Subreddit({ name, description, createdBy: user });
    await subreddit.save();
    res.status(201).json(subreddit);
  } catch (error) {
    res.status(500).json({ error: 'Error creating subreddit' });
  }
};

exports.getSubreddits = async (req, res) => {
  try {
    const subreddits = await Subreddit.find().sort({ createdAt: -1 });
    res.status(200).json(subreddits);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching subreddits' });
  }
};

exports.subscribeSubreddit = async (req, res) => {
  const { userId, subredditId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user.subscribedSubreddits.includes(subredditId)) {
      user.subscribedSubreddits.push(subredditId);
      await user.save();
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error subscribing to subreddit' });
  }
};
