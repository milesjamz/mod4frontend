import React from "react";

class SearchBar extends React.Component {
  render() {
    return (
      <div className="searchbar">
        <form onSubmit={this.props.handleSubmit}>
          <label>
            Search by Name:
            <input
              type="text"
              value={this.props.value}
              onChange={this.props.handleOnChange}
            />
          </label>
        </form>
      </div>
    );
  }
}
export default SearchBar;
