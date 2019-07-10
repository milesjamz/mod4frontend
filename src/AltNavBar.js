import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function AltNavBar(props) {
  return (
    <div className="navbar">
      Welcome, {props.user.username}!
      <Link to="/" onClick={props.logOut}>
        LOG OUT
      </Link>
      | BREWERIES | CREDITS
    </div>
  );
}

export default AltNavBar;
