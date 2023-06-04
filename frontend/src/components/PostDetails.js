import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import "./PostDetails.css";

const API_URL = "http://localhost:5000/posts";

const PostDetails = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setPost(response.data);
      } catch (error) {
        console.log("Error retrieving post", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      navigate("/");
    } catch (error) {
      console.log("Error deleting post", error);
    }
  };

  const handleCommentSubmit = async (comment) => {
    try {
      await axios.post(`${API_URL}/${id}/comments`, comment);

      // Refresh the post after adding the comment
      await refreshPost();
    } catch (error) {
      console.log("Error adding comment", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
        alert("Are you sure you ?")
      await axios.delete(`${API_URL}/${id}/comments/${commentId}`);
  
      const updatedPost = { ...post };
      updatedPost.comments = updatedPost.comments.filter(
        (comment) => comment._id !== commentId
      );
      setPost(updatedPost);
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
      console.log("Error editing comment", error);
    }
  };

  const handleReplySubmit = async (commentId, reply) => {
    try {
      const newReply = {
        text: reply,
        commentId: commentId,
      };

      await axios.post(
        `${API_URL}/${id}/comments/${commentId}/replies`,
        newReply
      );

      // Refresh the post after adding the reply
      await refreshPost();
    } catch (error) {
      console.log("Error adding reply", error);
    }
  };

  const refreshPost = async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setPost(response.data);
    } catch (error) {
      console.log("Error retrieving post", error);
    }
  };

  return (
    <div className="detail-card">
      <div className="details">
        <div>
          <h3 style={{ margin: "0.5em 0", padding: 0 }}>{post.title}</h3>
          <p style={{ margin: "0.5em 0", padding: 0 }}>{post.content}</p>
        </div>
        <button className="detail-btn" onClick={handleDeletePost}>
          Delete
        </button>
      </div>

      <h4>Comments</h4>
      <CommentForm onCommentSubmit={handleCommentSubmit} />

      <ul style={{ width: "100%" }}>
        {post.comments &&
          post.comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onDeleteComment={handleDeleteComment}
              onEditComment={handleEditComment}
              onReplySubmit={handleReplySubmit}
            />
          ))}
      </ul>
    </div>
  );
};

export default PostDetails;
