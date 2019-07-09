import React from 'react';
import ReviewData from './ReviewData'


///	eventually, this will FETCH to the backend using routerprops to get the ID

const BreweryPage = (props) => {
	// console.log(props.brewList)
	// console.log(props.match.params.breweryId )
		let thisOne = props.brewList.filter(brewery => brewery.id === parseInt(props.match.params.breweryId) )
		let theseReviews = ReviewData.filter(review => review.brewery_id === parseInt(props.match.params.breweryId) )
    console.log(ReviewData.map(review => review.brewery_id) )
    console.log(props.match.params.breweryId)
    console.log(theseReviews)
  return (
  	<div className="breweryShow">
    <h2>Brewery Page</h2>
    <h3>{thisOne[0].name}</h3>
    <p>Is a {thisOne[0].brewery_type} brewery located at {thisOne[0].street}, {thisOne[0].city}, {thisOne[0].state}.</p>
    <a href={thisOne[0].website_url}>Visit their website!</a>
    <br /><br /><br />
    <ul>
    {theseReviews.map(review => <li key={review.id}>User {review.user_id} says "{review.content}" </li> ) }
    </ul>
    </div>
  );
};

export default BreweryPage;
