import React from "react";
import renderer from "react-test-renderer";
// Importing component to test render
import DisplayFavouritesList from '../components/DisplayFavouritesList';

// Test if the component renders correctly
it('renders correctly', () => {
    const tree = renderer.create(<DisplayFavouritesList />)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 
 
// Test if the delete item from the sessionStorage works correctly
it("function to delete favourite works", () => {
  let favouriteItems = ["Blue", "Hello"]
  favouriteItems.splice(1, 1);
  sessionStorage.setItem('favouriteList', JSON.stringify(favouriteItems));
  let testFavouriteListDeleteItem = JSON.parse(sessionStorage.getItem('favouriteList'));
  expect(testFavouriteListDeleteItem).toHaveLength(1);
});
