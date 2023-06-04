import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Post.css";
import "./Home.css";

const API_URL = 'https://post-app-2vb8.onrender.com/posts';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch((error) => console.log('Error retrieving post', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPost = { title, content };

    axios.put(`${API_URL}/${id}`, updatedPost)
      .then(() => {
        navigate('/');
      })
      .catch((error) => console.log('Error updating post', error));
  };

  return (
    <div className='edit-card' >
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <button type="submit" className='card-btn'>Update</button>
      </form>
    </div>
  );
};

export default EditPost;
