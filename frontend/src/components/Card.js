import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Card = ({ post, handleDelete }) => {
  return (
    <div key={post._id} className="card">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <div className="card-buttons">
        <Link className="card-btn" style={{margin: 0}} to={`/post/${post._id}`}>
          Details
        </Link>
        <Link className="card-btn" style={{margin: 0}} to={`/edit/${post._id}`}>
          Edit
        </Link>
        <button className="card-btn" style={{margin: 0}} onClick={() => handleDelete(post._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
