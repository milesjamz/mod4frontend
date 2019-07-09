import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginPage from "./LoginPage";

function NavBar() {
  return (
    <div className="navbar">
      Welcome! <Link to="/login">LOGIN</Link> |<Link to="/login">SIGNUP</Link>|
      BREWERIES | CREDITS
    </div>
  );
}

export default NavBar;
