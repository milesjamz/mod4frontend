import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import BreweryPage from "./BreweryPage";
import BreweryRender from "./BreweryRender";
import LoginPage from "./LoginPage";
import AltNavBar from "./AltNavBar";
import SignupPage from "./SignupPage";

const breweryAPI = "http://localhost:3000/breweries";

class App extends React.Component {
  state = {
    loggedIn: false,
    breweries: [],
    firstFilterBrews: [],
    secondFilterBrews: [],
    allFilterBrews: [],
    dropdownTypes: [],
    dropdownTwoTypes: [],
    current_user: {}
  };

  // --- sets state with brewery data, and makes list of all the types of breweries ---
  componentDidMount() {
    fetch("http://localhost:3000/breweries")
      .then(resp => resp.json())
      .then(listOBreweries => {
        this.setState({ breweries: listOBreweries });
        this.setState({ firstFilterBrews: listOBreweries });
        this.setState({ secondFilterBrews: listOBreweries });
        const myTypes = listOBreweries.map(brewery => brewery.brewery_type);
        const myStates = listOBreweries.map(brewery => brewery.state);
        this.setState({ dropdownTypes: [...new Set(myTypes)] });
        this.setState({ dropdownTwoTypes: [...new Set(myStates)] });
      });

    // if (localStorage.token) {
    //   fetch("http://localhost:3000/profile", {
    //     headers: {
    //       Authorization: localStorage.token
    //     }
    //   })
    //     .then(res => res.json())
    //     .then(profileData => {
    //       this.setState({
    //         username: profileData.username,
    //         name: profileData.name,
    //         avatar: profileData.avatar
    //       });
    //     });
    // }
  }


  postAReview = (review) => {
      let newReview = {...review, user_id: this.state.current_user.id}
    fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newReview)
    })
      .then(res => res.json())
      .then(response => {
          console.log(response)
      });
  }

  // --- these two take info from search bar and apply to brewery list ---
  passedDownHandleSubmit = searchForm => {
    let myBrews = this.state.breweries.filter(brewery =>
      brewery.name.toLowerCase().includes(searchForm.toLowerCase())
    );
    myBrews.length === 0
      ? alert("No breweries matched your search!")
      : this.setState({ firstFilterBrews: myBrews });
  };

  // --- handles change in the brewery type drop down filter ---
  dropdownTypeChange = brewType => {
    const typeFilteredBreweries = this.state.breweries.filter(
      brewery => brewery.brewery_type === brewType
    );
    brewType === "reset"
      ? this.setState({ firstFilterBrews: this.state.breweries })
      : this.setState({ firstFilterBrews: typeFilteredBreweries });
    this.setState({
      allFilterBrews: this.state.firstFilterBrews.filter(brew =>
        this.state.secondFilterBrews.includes(brew)
      )
    });
  };

  // --- handles change in the search by state drop down filter ---

  dropdownStateChange = brewType => {
    const stateFilteredBreweries = this.state.breweries.filter(
      brewery => brewery.state === brewType
    );
    brewType === "reset"
      ? this.setState({ secondFilterBrews: this.state.breweries })
      : this.setState({ secondFilterBrews: stateFilteredBreweries });
  };


// --- log in, log out ---
  logIn = (user) => {
    this.setState({ loggedIn: !this.state.loggedIn });
    this.setState({ current_user: user })
  };

  logOut = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    });
  };

  render() {
    return (
      <div className="homepage">
        {this.state.loggedIn ? <AltNavBar logOut={this.logOut} user={this.state.current_user} /> : <NavBar />}

        {this.state.loggedIn ? (
          <BreweryRender
            breweries={this.state.breweries}
            firstDrop={this.state.dropdownTypes}
            secondDrop={this.state.dropdownTwoTypes}
            firstFilter={this.state.firstFilterBrews}
            secondFilter={this.state.secondFilterBrews}
            submitProp={this.passedDownHandleSubmit}
            typeChangeProp={this.dropdownTypeChange}
            stateChangeProp={this.dropdownStateChange}
          />
        ) : (
          <div>
            <Route
              exact
              path="/login"
              render={() => <LoginPage logIn={this.logIn} />}
            />
            <Route
              exact
              path="/signup"
              render={() => <SignupPage logIn={this.logIn} />}
            />
          </div>
        )}
        {this.state.loggedIn ? (
          <Route
            exact
            path="/brewery/:breweryId"
            render={routerProps => (
              <BreweryPage postReview={this.postAReview} breweries={this.state.breweries} {...routerProps} />
            )}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
