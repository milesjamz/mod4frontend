import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProfilePage from "./ProfilePage";

function AltNavBar(props) {
  return (
    <div>
      <div className="navbar">
        Welcome {props.user.username}!
        <Link to="/" onClick={props.logOut}>
          LOG OUT
        </Link>
        |<Link to="/profile"> PROFILE </Link> | BREWERIES | CREDITS
      </div>
    </div>
  );
}

export default AltNavBar;
