import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/posts';

const PostDetails = () => {
  const [post, setPost] = useState({});
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setPost(response.data);
      } catch (error) {
        console.log('Error retrieving post', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      navigate('/');
    } catch (error) {
      console.log('Error deleting post', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const newComment = {
        text: comment,
        postId: post._id,
      };

      await axios.post(`${API_URL}/${id}/comments`, newComment);
      setComment('');

      // Refresh the post after adding the comment
      await refreshPost();
    } catch (error) {
      console.log('Error adding comment', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${API_URL}/${id}/comments/${commentId}`);

      // Refresh the post after deleting the comment
      await refreshPost();
    } catch (error) {
      console.log('Error deleting comment', error);
    }
  };

  const handleEditComment = async (commentId, newText) => {
    try {
      const updatedComment = {
        text: newText,
      };

      await axios.put(`${API_URL}/${id}/comments/${commentId}`, updatedComment);

      // Refresh the post after editing the comment
      await refreshPost();
    } catch (error) {
      console.log('Error editing comment', error);
    }
  };

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();

    try {
      // Find the comment by its id
      const comment = post.comments.find((c) => c._id === commentId);

      const newReply = {
        text: comment.reply,
        commentId: comment._id,
      };

      await axios.post(`${API_URL}/${id}/comments/${commentId}/replies`, newReply);

      // Refresh the post after adding the reply
      await refreshPost();
    } catch (error) {
      console.log('Error adding reply', error);
    }
  };

  const refreshPost = async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setPost(response.data);
    } catch (error) {
      console.log('Error retrieving post', error);
    }
  };

  return (
    <div>
      <h2>Post Details</h2>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <button onClick={handleDeletePost}>Delete</button>

      <hr />

      <h4>Comments</h4>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Comment</button>
      </form>

      <ul>
        {post.comments &&
          post.comments.map((comment) => (
            <li key={comment._id}>
              {comment.text}
              <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
              <button onClick={() => handleEditComment(comment._id, 'Updated Comment')}>Edit</button>
              <button onClick={(e) => handleReplySubmit(e, comment._id)}>Reply</button>
              {comment.replies && (
                <ul>
                  {comment.replies.map((reply) => (
                    <li key={reply._id}>{reply.text}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PostDetails;
