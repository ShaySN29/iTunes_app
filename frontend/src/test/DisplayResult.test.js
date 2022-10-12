import React from "react";
import renderer from "react-test-renderer";
// Importing component to test render
import {DisplayResult, checkIfFavouriteItemExists } from '../components/DisplayResult';

// Tests if the component renders correctly
it('renders correctly', () => {
    const tree = renderer.create(<DisplayResult />)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 

// Test if the function to add an item to favourites in sessionStorage works correctly
it("function to add to favourites works", () => {
  let favouriteItems = [{"name": "test,", "myKey": 1111}, {"name":"test2", "myKey": 2222}];
  const exists = checkIfFavouriteItemExists(favouriteItems, 1111);
  expect(exists).toBe(true);
});