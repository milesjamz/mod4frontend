import React from 'react';
import { Link } from 'react-router-dom';


///	eventually, this will FETCH to the backend using routerprops to get the ID

const BreweryPage = (props) => {
	// console.log(props.brewList)
	// console.log(props.match.params.breweryId )
		let thisOne = props.brewList.filter(brewery => brewery.id === parseInt(props.match.params.breweryId) )
		console.log(thisOne[0])
  return (
  	<div>
    <h2>Brewery Page</h2>
    <h3>{thisOne[0].name}</h3>
    <p>Is a {thisOne[0].brewery_type} brewery located at {thisOne[0].street}, {thisOne[0].city}, {thisOne[0].state}.</p>
    <Link key={props.match.params.breweryId} to={thisOne[0].website_url}>Visit their website!</Link>
    </div>
  );
};

export default BreweryPage;
