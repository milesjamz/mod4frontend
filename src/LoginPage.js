import React from "react";

class LoginPage extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          this.props.logIn();
        } else {
          alert("yo dawg... login with real shit. k thx.");
        }
      });
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
              placeholder="Username"
            />
            Password{" "}
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
              placeholder="Password"
            />
            <br />
            <input type="submit" value="Log In!" />
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
