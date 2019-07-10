import React from "react";

const ReviewCard = (props) => {

	  let rating = "🍺";
	  console.log('can you hear me???')
	  
  return (
    <div className="reviewCard">
    	User number {props.thisReview.user_id} said, "{props.thisReview.content}"<br />
    	Rating: {rating.repeat(props.thisReview.stars)}
    </div>
  );
}

export default ReviewCard;