import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar'

import BreweryRender from './BreweryRender'

class App extends React.Component {

  render() {

  return (
    <div className="homepage">
      <NavBar />
      <BreweryRender />
    </div>
    );
  }
}

export default App;