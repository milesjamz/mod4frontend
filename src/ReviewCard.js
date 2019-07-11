import React from "react";

const ReviewCard = props => {
  let rating = "🍺";

  return (
    <div className="reviewCard">
      {props.thisReview.name} said, "{props.thisReview.content}"
      <br />
      Rating: {rating.repeat(props.thisReview.stars)}
    </div>
  );
};

export default ReviewCard;
