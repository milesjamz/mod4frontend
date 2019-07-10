import React from "react";
import ReviewForm from "./ReviewForm";

const BreweryPage = props => {
  let thisOne = props.breweries.find(
    brewery => brewery.id === parseInt(props.match.params.breweryId)
  );
  // let rating = "🍺"
  return (
    <div className="breweryShow">
      <h2>Brewery Page</h2>
      <h3>{thisOne.name}</h3>
      <p>
        Is a {thisOne.brewery_type} brewery located at {thisOne.street},{" "}
        {thisOne.city}, {thisOne.state}.
      </p>
      <a
        href={thisOne.website_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit their website!
      </a>
      <br />
      <br />
      <br />
      <ReviewForm />
    </div>
  );
};

export default BreweryPage;
