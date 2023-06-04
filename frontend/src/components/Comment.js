import React, { useState } from "react";
import "./PostDetails.css";

const Comment = ({
  comment,
  onDeleteComment,
  onEditComment,
  onReplySubmit,
}) => {
  const [editingComment, setEditingComment] = useState(false);
  const [editedCommentText, setEditedCommentText] = useState(comment.text);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [reply, setReply] = useState("");

  const handleDelete = async () => {
    try {
      await onDeleteComment(comment._id);
    } catch (error) {
      console.log("Error deleting comment", error);
    }
  };

  const handleEdit = async () => {
    if (editingComment) {
      try {
        await onEditComment(comment._id, editedCommentText);
        setEditingComment(false);
      } catch (error) {
        console.log("Error editing comment", error);
      }
    } else {
      setEditingComment(true);
    }
  };

  const handleReplySubmit = async () => {
    try {
      await onReplySubmit(comment._id, reply);
      setReply("");
      setShowReplyInput(false);
    } catch (error) {
      console.log("Error adding reply", error);
    }
  };

  return (
    <li>
      {editingComment ? (
        <div className="commentForm">
          <input
            type="text"
            value={editedCommentText}
            onChange={(e) => setEditedCommentText(e.target.value)}
          />
          <button className="card-btn" onClick={handleEdit}>
            Save
          </button>
        </div>
      ) : (
        <div className="comment">
          {comment.text}
          <div>
            <button className="card-btn" onClick={handleEdit}>
              Edit
            </button>
            <button className="card-btn" onClick={handleDelete}>
              Delete
            </button>
            <button
              className="card-btn"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              Reply
            </button>
          </div>
        </div>
      )}

      {showReplyInput && (
        <div className="replyForm">
          <input
            type="text"
            placeholder="Add a reply"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <button className="card-btn" onClick={handleReplySubmit}>
            Reply
          </button>
        </div>
      )}

      {comment.replies && (
        <ul className="replies">
          {comment.replies.map((reply) => (
            <li className="reply" key={reply._id}>
              {reply.text}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Comment;
