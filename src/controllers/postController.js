// controllers/postController.js
const Post = require('../models/Post');
const Subreddit = require('../models/Subreddit');

exports.createPost = async (req, res) => {
  const { title, content, subredditId, userId } = req.body;
  try {
    const post = new Post({ title, content, subreddit: subredditId, user: userId });
    await post.save();

    const subreddit = await Subreddit.findById(subredditId);
    subreddit.posts.push(post._id);
    await subreddit.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
};

exports.getPosts = async (req, res) => {
  const { subredditId } = req.params;
  try {
    const posts = await Post.find({ subreddit: subredditId }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
};

exports.getMyPosts = async (req, res) => {
  const { userId } = req.body;
  try {
    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
}

exports.upvotePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post.upvotes.includes(userId)) {
      post.upvotes.push(userId);
      await post.save();
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error upvoting post' });
  }
};

exports.addComment = async (req, res) => {
  const { postId } = req.params;
  const { content, user } = req.body;
  try {
    const post = await Post.findById(postId);
    post.comments.push({ content, user });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment' });
  }
};
