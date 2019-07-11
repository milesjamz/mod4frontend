import React from "react";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";

const BreweryPage = props => {
  
  let thisBrewery = props.breweries.find(
    brewery => brewery.id === parseInt(props.match.params.breweryId)
  );

  const thisBreweriesReviews = props.reviews.filter(
      review => review.brewery_id === parseInt(props.match.params.breweryId)
    )

  const getAvg = () => {
    let reviewStars = thisBreweriesReviews.map(review => review.stars)
      const total = reviewStars.reduce((acc, c) => acc + c, 0);
      if (total) {
        return "This brewery has an average rating of " + (total / reviewStars.length).toFixed(2);
      } else {
        return "This brewery has no ratings yet. Add your own!"
      }
}

  const addBreweryId = review => {
    let newReview = { ...review, brewery_id: thisBrewery.id };
    props.postReview(newReview);
  };

  const renderReviews = () => {
      return thisBreweriesReviews.map(review => <ReviewCard thisReview={review} /> )
  };

  if (thisBrewery) {
    return (
      <div className="breweryShow">
        <h2>{thisBrewery.name}</h2>
        <p>
          Is a {thisBrewery.brewery_type} brewery located at {thisBrewery.street},{" "}
          {thisBrewery.city}, {thisBrewery.state}.
        </p>
        <p>
          {getAvg()}!
        </p>
        <a href={thisBrewery.website_url} target="_blank" rel="noopener noreferrer">
          Visit their website!
        </a>
        <br />
        <br />
        <ReviewForm addBreweryId={addBreweryId} />
        <br />
        {renderReviews()}
      </div>
    );
  } else {
    return <div>getting info...</div>;
  }
};

export default BreweryPage;