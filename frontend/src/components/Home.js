import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./Home.css";

const API_URL = "http://localhost:5000/posts";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setPosts(response.data))
      .catch((error) => console.log("Error retrieving posts", error));
  }, []);

  const handleDelete = (id) => {
    alert("Are you sure you want to delete post?")
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setPosts(posts.filter((post) => post._id !== id));
      })
      .catch((error) => console.log("Error deleting post", error));
  };

  return (
    <div className="card-list">
      {posts.map((post) => (
        <Card key={post._id} post= {post} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default Home;
