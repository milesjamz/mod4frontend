import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import BreweryPage from "./BreweryPage";
import BreweryRender from "./BreweryRender";
import LoginPage from "./LoginPage";
import AltNavBar from "./AltNavBar";
import SignupPage from "./SignupPage";
import ProfilePage from "./ProfilePage";

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
    current_user: {},
    reviews: []
  };

  // --- sets state with brewery data, and makes a list of all the types of breweries ---
  componentDidMount() {
    fetch(breweryAPI)
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

    // --- fetch all the reviews and set to current state ---  
    fetch('http://localhost:3000/reviews')
      .then(resp => resp.json())
      .then(listOfReviews => {
        this.setState({ reviews: listOfReviews })
      })

    // --- fetch the user's profile with JWT Authorization ---
    this.getProfileFromServer();
  }

  getProfileFromServer = () => {
    if (localStorage.token) {
      fetch("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })
        .then(res => res.json())
        .then(profileData => {
          console.log(profileData);
          this.setState({
            current_user: profileData,
            loggedIn: true
          });
        });
    }
  };

  // --- posts a review to the brewery show page ---
  postAReview = review => {
    let newReview = { ...review, user_id: this.state.current_user.id, name: this.state.current_user.name};
    fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify(newReview)
    })
      .then(res => res.json())
      .then(response => {
        console.log(response)
        this.setState({
          reviews: [...this.state.reviews, response]
        });
      });
  };

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
  logIn = () => {
    this.getProfileFromServer();
  };

  logOut = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    });
    localStorage.clear();
  };

  // --- render ---
  render() {
    return (
      <div className="homepage">
        {this.state.loggedIn ? (
          <AltNavBar logOut={this.logOut} user={this.state.current_user} />
        ) : (
          <NavBar />
        )}
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
        {this.state.current_user ? (
          <Route
            exact
            path="/profile"
            render={() => <ProfilePage user={this.state.current_user} reviews={this.state.reviews} />}
          />
        ) : null}
        {this.state.loggedIn ? (
          <Route
            exact
            path="/brewery/:breweryId"
            render={routerProps => (
              <BreweryPage
                reviews={this.state.reviews}
                postReview={this.postAReview}
                breweries={this.state.breweries}
                {...routerProps}
              />
            )}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
