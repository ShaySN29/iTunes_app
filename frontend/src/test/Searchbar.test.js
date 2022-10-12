import React from "react";
import renderer from "react-test-renderer";
import SearchBar from '../components/Searchbar.js'; // Importing component to test render


it('renders correctly', () => {
    const tree = renderer.create(<SearchBar />)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 


