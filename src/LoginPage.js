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
        Accept: "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("token", data.token);
      });
    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(allUsers => {
        const selectedUser = allUsers.find(
          user =>
            user.username.toLowerCase() === this.state.username.toLowerCase()
        );
        if (selectedUser) {
          {
            this.props.logIn(selectedUser);
          }
        } else {
          alert(
            "The username you entered is not in our records. Please try again!"
          );
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
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
