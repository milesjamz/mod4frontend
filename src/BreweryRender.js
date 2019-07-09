import React from 'react';
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom';

class BreweryRender extends React.Component {

  state = {
    dropdown: '',
    dropdownTwo: '',
    searchField: '',
    index: 0,
    maxIndex: 150
  }


// --- makes brewery LIs and puts them in the brewery render area ---
  showBreweries = () => {
    const allFilteredBrews = this.props.firstFilter.filter(brew => this.props.secondFilter.includes(brew) )
    const currentBrews = allFilteredBrews.slice(this.state.index, this.state.index + 40) 
    return currentBrews.map(brewery => 
      <li className="brewLink" key={brewery.id} > <Link key={brewery.id} to={`/brewery/${brewery.id}`}> {brewery.name} </Link> </li> )
  }


// --- these two take info from search bar and apply to brewery list --- 
  handleSubmit = (e) => {
    e.preventDefault()
    {this.props.submitProp(this.state.searchField)}
  }

  handleOnChange = (e) => {
    this.setState({ searchField: e.target.value })
  }

// --- handles change in the drop down filter ---
  dropdownTypeChange = (e) => {
    this.setState({ dropdown: e.target.value })
    this.setState({ index: 0 })
    {this.props.typeChangeProp(e.target.value)}
   }

  dropdownStateChange = (e) => {
    this.setState({ dropdownTwo: e.target.value })
    this.setState({ index: 0 })
    {this.props.stateChangeProp(e.target.value)}
   }

   showMore = () => {
    this.state.index >= this.state.maxIndex ? this.setState({ index: 0 }) : this.setState({ index: this.state.index + 50 })
    console.log(this.state.index)
    console.log(this.state.maxIndex)
   }

  render() {
  return (
    <div className="breweryrender">
      <SearchBar handleSubmit={this.handleSubmit} 
                 handleOnChange={this.handleOnChange} 
                value={this.state.searchField} />

      <select value={this.state.dropdownState} 
              onChange={this.dropdownStateChange} >
        <option value="reset">Filter By State</option>
        {this.props.secondDrop.map((state, index) => (
          <option key={index} value={state}>{state}</option>
          ))}
        </select>

      <select value={this.state.dropdownType}
              onChange={this.dropdownTypeChange} >
        <option value="reset">Filter by Brewery Type</option>
          {this.props.firstDrop.map((typeOption, index) => (
          <option key={index} value={typeOption}>{typeOption}</option>
          ))}
      </select>
      <button onClick={this.showMore}>Show more Breweries!</button>
      <ul>
        {this.showBreweries()}
      </ul>
    </div>
    );
  }
}

export default BreweryRender;