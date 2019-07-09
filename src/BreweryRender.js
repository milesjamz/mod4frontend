import React from 'react';
import SearchBar from './SearchBar'
import BreweryList from './data'
import { Link } from 'react-router-dom';

class BreweryRender extends React.Component {

  state = {
    breweries: [],
    firstFilterBrews: [],
    secondFilterBrews: [],
    searchField: '',
    dropdown: '',
    dropdownTypes: [],
    dropdownTwo: '',
    dropdownTwoTypes: []
  }

// --- sets state with brewery data, and makes list of all the types of breweries ---
  componentDidMount() {
    this.setState({ breweries: BreweryList})
    this.setState({ firstFilterBrews: BreweryList })
    this.setState({ secondFilterBrews: BreweryList })
    const myTypes = BreweryList.map(brewery => brewery.brewery_type)
    const myStates = BreweryList.map(brewery => brewery.state)
    this.setState({ dropdownTypes: [...new Set(myTypes)] })
    this.setState({ dropdownTwoTypes: [...new Set(myStates)] })
  }


// --- makes brewery LIs and puts them in the brewery render area ---
  showBreweries = () => {
    const allFilteredBrews = this.state.firstFilterBrews.filter(brew => this.state.secondFilterBrews.includes(brew) ) 
    return allFilteredBrews.map(brewery => 
      <li className="brewLink" key={brewery.id} > <Link key={brewery.id} to={`/brewery/${brewery.id}`}> {brewery.name} </Link> </li> )
  }


// --- these two take info from search bar and apply to brewery list --- 
  handleSubmit = (e) => {
    e.preventDefault()
    let myBrews = this.state.breweries.filter(brewery => brewery.name.toLowerCase().includes(this.state.searchField.toLowerCase()) )
    myBrews.length === 0 ? alert('No breweries matched your search!') : this.setState({ firstFilterBrews: myBrews })
  }

  handleOnChange = (e) => {
    this.setState({ searchField: e.target.value })
  }

// --- handles change in the drop down filter ---
  dropdownChange = (e) => {
    this.setState({ dropdown: e.target.value })
    const typeFilteredBreweries = this.state.breweries.filter(brewery => brewery.brewery_type === e.target.value)
    e.target.value === 'reset' ? this.setState({ firstFilterBrews: BreweryList }) : this.setState({ firstFilterBrews: typeFilteredBreweries })
  }

  dropdownTwoChange = (e) => {
    this.setState({ dropdownTwo: e.target.value })
    const stateFilteredBreweries = this.state.breweries.filter(brewery => brewery.state === e.target.value)
    e.target.value === 'reset' ? this.setState({ secondFilterBrews: BreweryList }) : this.setState({ secondFilterBrews: stateFilteredBreweries })
  }

  render() {
  return (
    <div className="breweryrender">
      <SearchBar handleSubmit={this.handleSubmit} handleOnChange={this.handleOnChange} value={this.state.searchField} />
      <select value={this.state.dropdownTwo} 
              onChange={this.dropdownTwoChange} >
        <option value="reset">Filter By State</option>
        {this.state.dropdownTwoTypes.map((state, index) => (
          <option key={index} value={state}>{state}</option>
          ))}
        </select>

      <select value={this.state.dropdown}
              onChange={this.dropdownChange} >
        <option value="reset">Filter by Brewery Type</option>
          {this.state.dropdownTypes.map((typeOption, index) => (
          <option key={index} value={typeOption}>{typeOption}</option>
          ))}
      </select>

      <ul>
        {this.showBreweries()}
      </ul>
    </div>
    );
  }
}

export default BreweryRender;