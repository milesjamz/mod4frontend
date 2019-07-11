import React from "react";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";

const BreweryPage = props => {
  let thisOne = props.breweries.find(
    brewery => brewery.id === parseInt(props.match.params.breweryId)
  );

  const addBreweryId = review => {
    let newReview = { ...review, brewery_id: thisOne.id };
    props.postReview(newReview);
  };

  const renderBreweries = () => {
    fetch("http://localhost:3000/reviews")
      .then(resp => resp.json())
      .then(reviewList => {
        // console.log(reviewList)
        // console.log(thisOne.id)
        let theReviews = reviewList.filter(
          review => review.brewery_id === thisOne.id
        );
        console.log(theReviews);
        return theReviews.map((review, index) => {
          return <ReviewCard key={index} thisReview={review} />;
        });
      });
  };
  if (thisOne) {
    return (
      <div className="breweryShow">
        {renderBreweries()}
        <h2>Brewery Page</h2>
        <h3>{thisOne.name}</h3>
        <p>
          Is a {thisOne.brewery_type} brewery located at {thisOne.street},{" "}
          {thisOne.city}, {thisOne.state}.
        </p>
        <a href={thisOne.website_url} target="_blank" rel="noopener noreferrer">
          Visit their website!
        </a>
        <br />
        <br />
        <ReviewForm addBreweryId={addBreweryId} />
        <br />
      </div>
    );
  } else {
    return <div>getting info...</div>;
  }
};

export default BreweryPage;
