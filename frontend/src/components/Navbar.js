import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Post App</Link>
      </div>
      <div className="navbar-right">
      <Link className='create-btn' to="/create">Create Post</Link>
      </div>
    </nav>
  );
};

export default Navbar;
