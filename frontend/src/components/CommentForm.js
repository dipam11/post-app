import React, { useState } from 'react';
import "./PostDetails.css";

const CommentForm = ({ onCommentSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onCommentSubmit({ text: comment });
      setComment('');
    } catch (error) {
      console.log('Error adding comment', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='commentForm'>
      <input
        type="text"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className='card-btn' type="submit">Comment</button>
    </form>
  );
};

export default CommentForm;
