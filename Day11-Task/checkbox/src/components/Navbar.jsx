import React from "react";
import "./Navbar.css";
                                         //23EC036 GOWTHAM G
const Navbar = () => {
  return (
    <nav className="navbar">                               
      <div className="navbar-logo">MyApp</div>
      <ul className="navbar-links">
        <li><a href="#">Login</a></li>
        <li><a href="#">Signup</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
