import React from "react";
import { NavLink } from 'react-router-dom';
import "./NavBar.css";


// The navigation bar for every page
export default function NavBar() {
  return (
    <div className="NavBar">
      <NavLink
        className="NavBarElement"
        to="/login"
      >
        Login
      </NavLink>
      <NavLink
        className="NavBarElement"
        to="/register"
      >
        Register
      </NavLink>
      <NavLink
        className="NavBarElement"
        to="/secret"
      >
        Secret
      </NavLink>
      <NavLink
        className="NavBarElement"
        to="/logout"
      >
        Logout
      </NavLink>
    </div>
  );
}
