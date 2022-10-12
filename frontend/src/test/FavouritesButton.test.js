import React from "react";
import renderer from "react-test-renderer";
// Importing component to test render
import FavouritesButton from '../components/FavouritesButton.js';


it('renders correctly', () => {
    const tree = renderer.create(<FavouritesButton />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  }); 
