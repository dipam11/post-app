import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import PostDetails from './components/PostDetails';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/create" element={<CreatePost/>} />
        <Route exact path="/edit/:id" element={<EditPost/>} />
        <Route exact path="/post/:id" element={<PostDetails/>} />
      </Routes>
    </Router>
  );
};

export default App;
