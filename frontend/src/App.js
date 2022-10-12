import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'; // Importing bootstrap
// Importing Components
import Searchbar from './components/Searchbar';
import FavouritesButton from './components/FavouritesButton';
import DisplayFavouritesList from './components/DisplayFavouritesList';


class App extends Component {
  constructor(props) {
    super(props);
    this.handleFavouriteButtonClick = this.handleFavouriteButtonClick.bind(this);
    this.handleHomeButtonClick = this.handleHomeButtonClick.bind(this);
    this.state = {
      showFavourites: false // State setting the showFavourites to false
    }
  };

  /* The function below sets the showFavourites to true when the Favourites button is clicked therefore displaying the 
      favourites list */
  handleFavouriteButtonClick() {
    this.setState({ showFavourites: true });
  };

  /* When the Home button is clicked in the Favourites page the showFavourites is set to false and the searchbar and favourites button 
    is displayed. */
  handleHomeButtonClick() {
    this.setState({ showFavourites: false });
  };

  /* If the state of the showFavourites is false then the page with the search bar and the favourites button is displayed.
     If the state of the showFavourites is true then the page with the list off favourites is displayed. */
  render() {
    if (!this.state.showFavourites) {
      return (
        <div className="App">
          <div id="navBarDiv">
            <FavouritesButton handleFavouriteButtonClick={this.handleFavouriteButtonClick}/>
            <Searchbar />
          </div>
        </div>
      )
    } else {
      return <DisplayFavouritesList handleHomeButtonClick={this.handleHomeButtonClick} />
    }
  }
};

export default App;