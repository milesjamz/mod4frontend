import React, { Component } from "react";

export default class ProfilePage extends Component {
  state = {
    edit: false,
    name: "",
    username: "",
    password: "",
    avatar: ""
  };

  makeEditTrue = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  handleEditChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleEditSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    // let editedUser;
    // if (!this.state.username) {
    let editedUser = {
      id: this.props.user.id,
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      avatar: this.state.avatar
    };

    fetch(`http://localhost:3000/users/${editedUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify(editedUser)
    })
      .then(res => res.json())
      .then(console.log);
  };

  // showReviews = () => {
    showReviews = this.props.reviews.filter(review => {
      return review.user_id === this.props.user.id
    })
  // }

    ourReviews = this.showReviews.map(review => <li>{review.content} / {review.stars} 🍺's</li>)

  render() {
    return (
      <div className="breweryShow">
        {this.state.edit ? (
          <div>
            <form onSubmit={this.handleEditSubmit}>
              Name{" "}
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleEditChange}
                name="name"
                placeholder={this.props.user.name}
                required
              />
              <br />
              Username{" "}
              <input
                type="text"
                value={this.state.username}
                onChange={this.handleEditChange}
                name="username"
                placeholder={this.props.user.username}
                required
              />
              <br />
              Password{" "}
              <input
                type="password"
                value={this.state.password}
                onChange={this.handleEditChange}
                name="password"
                required
              />
              <br />
              Avatar{" "}
              <input
                type="url"
                value={this.state.avatar}
                onChange={this.handleEditChange}
                name="avatar"
                placeholder={this.props.user.avatar}
              />
              <br />
              <input type="submit" value="Submit Changes!" />
            </form>{" "}
          </div>
        ) : (
          <h2 contentEditable="true">{this.props.user.name}</h2>
        )}

        <img src={this.props.user.avatar} alt="Your Profile" width="237px" height="225px" />
        <li>Your Reviews:</li>
        <ul>{this.ourReviews}</ul>
        <button onClick={this.makeEditTrue}>Edit</button>
      </div>
    );
  }
}
