import React, { Component } from "react";

class ReviewForm extends Component {
  render() {
    return (
      <div>
        Please leave a Review
        <textarea type="text" name="content" />
        <br />
        Please leave a Rating
        <br />
        <input type="range" min="0" max="10" step="1" name="ratings" />
        <br />
        Please upload an image (optional)
        <br />
        URL:
        <input type="url" name="image" />
      </div>
    );
  }
}

export default ReviewForm;
