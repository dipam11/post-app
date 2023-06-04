import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Post.css';

const API_URL = 'http://localhost:5000/posts';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = { title, content };

    axios.post(API_URL, newPost)
      .then(() => {
        setTitle('');
        setContent('');
        navigate('/');
      })
      .catch((error) => console.log('Error creating post', error));
  };

  return (
    <div className='edit-card'>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
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
        <button style={{fontSize: "0.9em"}} className='card-btn' type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
