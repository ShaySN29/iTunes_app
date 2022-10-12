import React from 'react';
// Imports from React Bootstrap
import { Button } from 'react-bootstrap';
// Importing the favourite icon
import favouriteIcon from '../images/favouriteIcon.png'

/* The FavouritesButton functional component displays the favourites button
  When the favourites button is clicked the state of the display favouritesList is set to true and the favourites list is shown */
function FavouritesButton({handleFavouriteButtonClick}) {
  return (
    <div className="favouriteBarDiv">
      <div className="iconDiv">
        <img src={favouriteIcon} height={40} className="mt-1 mb-3"/>
      </div>
      <div>
        <Button variant="success" className="mt-2 mb-3" onClick={e => handleFavouriteButtonClick()}>Favourites</Button>
      </div>
    </div>
  )
};

export default FavouritesButton;

/* ACKNOWLEDGEMENTS
Favourites icon used from: https://www.vecteezy.com/vector-art/379885-favorite-vector-icon */