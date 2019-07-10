import React, { Component } from "react";

export default class ProfilePage extends Component {
  render() {
    return (
      <div className="breweryShow">
        <h2>{this.props.user.name}</h2>
        <img src={this.props.profilePicture} alt="Your Profile" />
        <li>Your Reviews:</li>
        <button>Log Out</button>
      </div>
    );
  }
}
