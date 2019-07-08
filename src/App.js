import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import NavBar from './NavBar'
import BreweryPage from './BreweryPage'
import BreweryRender from './BreweryRender'
import BreweryList from './data'

class App extends React.Component {

  render() {

  return (
    <Router>
      <div className="homepage">
         <NavBar />
         <Route exact path='/' render={() => <div>Home</div>} />
         
         <BreweryRender />

         <Route exact path='/brewery/:breweryId' render={routerProps => <BreweryPage brewList={BreweryList} {...routerProps} /> } />
      </div>
    </Router>
    );
  }
}

export default App;