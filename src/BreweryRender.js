import React from 'react';
import SearchBar from './SearchBar'
import BreweryList from './data'
import { Link } from 'react-router-dom';

class BreweryRender extends React.Component {

  state = {
    breweries: [],
    searchField: '',
    filteredBrews: [],
    dropdown: '',
    dropdownTypes: []
  }

  componentDidMount() {
    this.setState({ breweries: BreweryList})
    this.setState({ filteredBrews: BreweryList})
    const myTypes = BreweryList.map(brewery => brewery.brewery_type)
    const uniqueTypes = [...new Set(myTypes)]
    this.setState({ dropdownTypes: uniqueTypes })
    // console.log(uniqueTypes)
  }

  showBreweries = () => {
    return this.state.filteredBrews.map(brewery => 
      <li key={brewery.id} > <Link key={brewery.id} to={`/brewery/${brewery.id}`}> {brewery.name} </Link> </li> )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let myBrews = this.state.breweries.filter(brewery => brewery.name.toLowerCase().includes(this.state.searchField.toLowerCase()) )
    myBrews.length === 0 ? alert('No breweries matched your search!') : this.setState({ filteredBrews: myBrews })
  }

  handleOnChange = (e) => {
    this.setState({ searchField: e.target.value })
  }

  handleClick = () => {
    let myTypes = this.state.breweries.map(brewery => brewery.brewery_type)
        const uniqueTypes = [...new Set(myTypes)]
  }

  dropdownChange = (e) => {
    this.setState({ dropdown: e.target.value })
    const typeFilteredBreweries = this.state.breweries.filter(brewery => brewery.brewery_type === e.target.value)
    e.target.value === 'reset' ? this.setState({ filteredBrews: BreweryList }) : this.setState({ filteredBrews: typeFilteredBreweries })
  }

  render() {
  return (
    <div className="breweryrender">
      <SearchBar handleSubmit={this.handleSubmit} handleOnChange={this.handleOnChange} value={this.state.searchField} />
      <select value={this.state.dropdown}
              onChange={this.dropdownChange} >
        <option value="reset">Filter by Option</option>
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