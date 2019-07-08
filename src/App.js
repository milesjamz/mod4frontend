import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import NavBar from './NavBar'
import BreweryPage from './BreweryPage'
import BreweryRender from './BreweryRender'
import BreweryList from './data'
import LoginPage from './LoginPage'

class App extends React.Component {

  state = {
    loggedIn: false
  }

  logIn = () => {
    this.setState({ loggedIn: !this.state.loggedIn })
  }

  render() {

  return (
    <Router>
      <div className="homepage">
        <NavBar />
        {this.state.loggedIn ? <BreweryRender /> : <LoginPage logIn={this.logIn} /> }
        {this.state.loggedIn ? <Route 
                                  exact path='/brewery/:breweryId' 
                                  render={routerProps => <BreweryPage brewList={BreweryList} {...routerProps} /> } /> : null }
      </div>
    </Router>
    );
  }
}

export default App;