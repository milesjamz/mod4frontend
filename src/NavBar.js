import React from 'react';

function NavBar(props) {
  return (
    <div className="navbar">
      Welcome, {props.user.name}! LOGIN | SIGNUP | BREWERIES | CREDITS
    </div>
  );
}

export default NavBar;
