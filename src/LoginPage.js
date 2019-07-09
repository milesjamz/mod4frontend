import React from "react";

class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
    newUsername: "",
    newPassword: "",
    newConfirmPassword: ""
  };

  handleSubmit = e => {
    // e.preventDefault();
    // fetch("http://localhost:3001/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //   },
    //   body: JSON.stringify(this.state)
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     localStorage.setItem("token", data.token);
    //   });
    {
      this.props.logIn();
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <div className="breweryShow">
          <form onSubmit={this.handleSubmit}>
            Username
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
              name="username"
            />
            Password
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
            />
            <br />
            <input type="submit" value="Log in!" />
          </form>
        </div>

        <div className="breweryShow">
          <form onSubmit={this.handleSubmit}>
            Username
            <input
              type="text"
              value={this.state.newUsername}
              onChange={this.handleChange}
              name="newUsername"
            />
            Password
            <input
              type="password"
              value={this.state.newPassword}
              onChange={this.handleChange}
              name="newPassword"
            />
            <br />
            Confirm Password
            <input
              type="password"
              value={this.state.newConfirmPassword}
              onChange={this.handleChange}
              name="newConfirmPassword"
            />
            <br />
            <input type="submit" value="Sign Up!" />
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
