import React from "react";

///	eventually, this will FETCH to the backend using routerprops to get the ID

const BreweryPage = props => {
  // console.log(props.brewList)
  // console.log(props.match.params.breweryId )
  let thisOne = props.brewList.filter(
    brewery => brewery.id === parseInt(props.match.params.breweryId)
  );
  console.log(thisOne[0]);
  return (
    <div className="breweryShow">
      <h2>Brewery Page</h2>
      <h3>{thisOne[0].name}</h3>
      <p>
        Is a {thisOne[0].brewery_type} brewery located at {thisOne[0].street},{" "}
        {thisOne[0].city}, {thisOne[0].state}.
      </p>
      <a href={thisOne[0].website_url} target="_blank">
        Visit their website!
      </a>
      <br />
      <br />
      <br />
    </div>
  );
};

export default BreweryPage;
