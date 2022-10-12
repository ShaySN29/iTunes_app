import React from 'react';
import { useState, useEffect } from 'react';
// Import Icon
import homeIcon from '../images/homeIcon.png'
// Import from bootstrap
import { Card, Button } from 'react-bootstrap';

function DisplayFavouritesList({ handleHomeButtonClick }) {
  // Setting state of the favourite items array to an empty array to store the favouriteList from session storage in
  const [favouriteItems, setFavouriteItems] = useState([]);

  // If the favouritesList is not in storage then it gets set in storage
  // If the favouritesList is in storage then it is retrieved and parsed and set in state
  function initialiseFavouritesList() {
    if (sessionStorage.getItem("favouritesList") === null) {
      sessionStorage.setItem("favouritesList", JSON.stringify(favouriteItems));
    } else {
      setFavouriteItems(JSON.parse(sessionStorage.getItem("favouritesList")));
    };
  };

  /* useEffect used to prevent an infinite loop.
    I used this link to help: https://www.w3schools.com/react/react_useeffect.asp
  */
  useEffect(() => {
    initialiseFavouritesList();
  }, []);

  //  Function below maps through the favouriteItems array and displays it in a Card
  //  Delete button calls the deleteFavouriteitem function
  function getListOfFavourites() {
    return (
      favouriteItems.map((result, index) => {
        return (
          <div className='individualCard' key={result.myKey}>
            <Card style={{ width: '18rem' }} border="success" className="displayCard mb-3 ms-2">
              <Card.Body>
                <Card.Title>{result.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{result.artist}</Card.Subtitle>
                <Card.Img variant="top" src={result.artwork} />
                <Card.Link href={result.link}>More Details</Card.Link>
              </Card.Body>
              <Button variant="outline-success" onClick={() => deleteFavouriteItem(index)}>Remove</Button>
            </Card>
          </div>
        )
      }
    ));
  };

  // The function belows deletes an item from the favourites list
  function deleteFavouriteItem(itemIndex) {
    // Deleting the selected item from favourites using the index
    favouriteItems.splice(itemIndex, 1);

    // updating session storage
    sessionStorage.setItem("favouritesList", JSON.stringify(favouriteItems));

    // setting state of the updated list
    setFavouriteItems(favouriteItems);
    
    // Updating the list of the displayed items
    initialiseFavouritesList();

    alert("Your item has been deleted");
  };

  return (
    <div>
      <div className="iconDiv">
        <img src={homeIcon} height={40} className="mt-1 mb-3" />
      </div>
      <div>
        <Button variant="success" className="mt-2 mb-3" onClick={(e) => handleHomeButtonClick()}>Home</Button>
        <h3 className="favouritesHeading bg-success">My Favourites</h3>
      </div>
      <div>
        {/* The consitional operator below sets the condition that when the length of the favouriteItems array is greater than 0 then 
            the list of favourites will be displayed else the message telling the user to add favourites  is displayed */}
        {favouriteItems.length !== 0 ? getListOfFavourites() : <h3 className="emptyListOfFavouritesText"> You don't have anything in your favourites yet. <br /> You can search for items by clicking the home button above. <br /> Happy Searching!!! </h3>}
      </div>
    </div>
  );
};

export default DisplayFavouritesList;

/* ACKNOWLEDGMENTS
Home Icon: https://www.vecteezy.com/vector-art/2276894-vector-illustration-of-home-icon */
