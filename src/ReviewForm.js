import React, { Component } from "react";

class ReviewForm extends Component {
  state = {
    content: "",
    stars: 0,
    avatar: ""
  };

  

  handleFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const star = '🍺';
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          Please leave a Review
          <textarea
            type="text"
            name="content"
            onChange={this.handleFormChange}
            value={this.state.content}
          />
          <br />
          Please leave a Rating
          <br />
            <div className='beerz'>
          {star.repeat(this.state.stars)}
            </div>
          <br />
          <input
            type="range"
            min="0"
            max="6"
            step="1"
            name="stars"
            onChange={this.handleFormChange}
            value={this.state.stars}
          />
          <br />
          Please upload an image (optional)
          <br />
          URL:
          <input
            type="url"
            name="image"
            onChange={this.handleFormChange}
            value={this.state.avatar}
          />
        </form>
      </div>
    );
  }
}

export default ReviewForm;