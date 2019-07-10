import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import BreweryPage from "./BreweryPage";
import BreweryRender from "./BreweryRender";
import LoginPage from "./LoginPage";
import AltNavBar from "./AltNavBar";

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
    username: "",
    name: "",
    avatar: ""
  };

  // --- sets state with brewery data, and makes list of all the types of breweries ---
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

    if (localStorage.token) {
      fetch("http://localhost:3000/profile", {
        headers: {
          Authorization: localStorage.token
        }
      })
        .then(res => res.json())
        .then(profileData => {
          this.setState({
            username: profileData.username,
            name: profileData.name,
            avatar: profileData.avatar
          });
        });
    }
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

  // --- handles change in the drop down filter ---
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

  dropdownStateChange = brewType => {
    const stateFilteredBreweries = this.state.breweries.filter(
      brewery => brewery.state === brewType
    );
    brewType === "reset"
      ? this.setState({ secondFilterBrews: this.state.breweries })
      : this.setState({ secondFilterBrews: stateFilteredBreweries });
  };

  logIn = () => {
    this.setState({ loggedIn: !this.state.loggedIn });
  };

  logOut = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    });
  };

  render() {
    return (
      <div className="homepage">
        {this.state.loggedIn ? <AltNavBar logOut={this.logOut} /> : <NavBar />}

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
          <Route
            exact
            path="/login"
            render={() => <LoginPage logIn={this.logIn} />}
          />
        )}
        {this.state.loggedIn ? (
          <Route
            exact
            path="/brewery/:breweryId"
            render={routerProps => (
              <BreweryPage breweries={this.state.breweries} {...routerProps} />
            )}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
