import React from "react";

class SignupPage extends React.Component {
  state = {
    name: "",
    username: "",
    password: "",
    avatar: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const newUser = this.state;
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        localStorage.setItem("token", data.token);
      });
    // fetch("http://localhost:3000/users")
    //   .then(res => res.json())
    //   .then(allUsers => {
    //     const ourGuy = allUsers[allUsers.length-1]
    {
      this.props.logIn(newUser);
    }
  };
  // );
  // };

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
            Name{" "}
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              name="name"
            />
            <br />
            Username{" "}
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
              name="username"
            />
            <br />
            Password{" "}
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
            />
            <br />
            Avatar{" "}
            <input
              type="url"
              value={this.state.avatar}
              onChange={this.handleChange}
              name="avatar"
            />
            <br />
            <input type="submit" value="Sign Up!" />
          </form>{" "}
        </div>
      </div>
    );
  }
}

export default SignupPage;
