import React from 'react';
import SearchBar from './SearchBar'
import BreweryList from './data'

class BreweryRender extends React.Component {

  state = {
    breweries: [],
    searchField: '',
    filteredBrews: [],
    dropdown: ''
  }

  componentDidMount() {
    this.setState({ breweries: BreweryList})
    this.setState({ filteredBrews: BreweryList})
  }

  showBreweries = () => {
    return this.state.filteredBrews.map(brewery => <li key={brewery.id}> {brewery.name} </li>)
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
      console.log(myTypes)
        const uniqueTypes = [...new Set(myTypes)]
          console.log(uniqueTypes)
  }

  dropdownChange = (e) => {
    console.log(e.target.value)
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
        <option value="micro">Micro</option>
        <option value="brewpub">BrewPub</option>
      </select>
      <ul>
        {this.showBreweries()}
      </ul>
    </div>
    );
  }
}

export default BreweryRender;