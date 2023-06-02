const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.post('/', async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({ title, content });
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

router.put('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.delete('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
