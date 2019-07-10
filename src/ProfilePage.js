import React, { Component } from "react";

export default class ProfilePage extends Component {
  state = {
    usernameEntry: "",
    passwordEntry: ""
  };

  render() {
    return (
      <div className="profile">
        <h2>{this.props.username}</h2>
        <img src={this.props.profilePicture} alt="Your Profile" />
        <li>Your Reviews:</li>
        <button>Log Out</button>
      </div>
    );
  }
}
