import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/posts';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => setPosts(response.data))
      .catch((error) => console.log('Error retrieving posts', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setPosts(posts.filter((post) => post._id !== id));
      })
      .catch((error) => console.log('Error deleting post', error));
  };

  return (
    <div>
      <h1>Post App</h1>
      <Link to="/create">Create Post</Link>
      <hr />
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <Link to={`/post/${post._id}`}>View Details</Link>
          <Link to={`/edit/${post._id}`}>Edit</Link>
          <button onClick={() => handleDelete(post._id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Home;
