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
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("token", data.token);
      });
    {
      this.props.logIn();
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <div className="login">
          <form onSubmit={this.handleSubmit}>
            Username{" "}
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
              name="username"
            />
            Password{" "}
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
            />
            <br />
            <input type="submit" value="Log in!" />
          </form>{" "}
        </div>
      </div>
    );
  }
}

export default LoginPage;
