import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="container">
        <NavLink to="/">
          <h1>Studieoversikten</h1>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
