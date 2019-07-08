import React from 'react';

class SearchBar extends React.Component {

	render() {
  return (
    <div className="searchbar">
      This is the search bar
      <form onSubmit={this.props.handleSubmit}>
      	<label>Search by Name:
      	<input type="text"
      		   value={this.props.value}
      		   onChange={this.props.handleOnChange} />
      	</label>
      </form>
    </div>
  );
}
}
export default SearchBar;
