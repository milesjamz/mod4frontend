import React from "react";
import ReviewForm from "./ReviewForm";

const BreweryPage = props => {
  let thisOne = props.breweries.filter(
    brewery => brewery.id === parseInt(props.match.params.breweryId)
  );
  // let rating = "🍺"
  return (
    <div className="breweryShow">
      <h2>Brewery Page</h2>
      <h3>{thisOne[0].name}</h3>
      <p>
        Is a {thisOne[0].brewery_type} brewery located at {thisOne[0].street},{" "}
        {thisOne[0].city}, {thisOne[0].state}.
      </p>
      <a
        href={thisOne[0].website_url}
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
