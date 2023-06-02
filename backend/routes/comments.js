const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Create a new comment
router.post('/', async (req, res, next) => {
  try {
    const { postId, content } = req.body;
    const comment = await Comment.create({ postId, content });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

// Update a comment
router.put('/:commentId', async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    next(error);
  }
});

// Delete a comment
router.delete('/:commentId', async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
