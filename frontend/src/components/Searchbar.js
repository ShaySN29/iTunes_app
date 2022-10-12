import React, { Component } from 'react';
// Imports from React Bootstrap
import { Navbar } from 'react-bootstrap';
import { Form, Button, Container } from 'react-bootstrap';
// Import Component
import {DisplayResult} from './DisplayResult';
require('isomorphic-fetch'); // Used to fetch API from backend

/* The SearchBar Class component contains the search bar and media option dropdown. It makes the call to the backend server to fetch the 
    input of the user. 
    Props are sent to the Display Result component from mapping through the items returned from the search 
*/
class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.handleMediaSelection = this.handleMediaSelection.bind(this);
        this.handleSearchBarSubmit = this.handleSearchBarSubmit.bind(this);
        this.displaySearchResults = this.displaySearchResults.bind(this);
        this.state = {
            searchBar: "", // The state of the search bar is an empty string
            mediaOption: "all", // Initial state of the Media selected
            itemsReturnedFromSearch: [], // Empty array to store the items returned from the search
            error: null
        }
    };

    /* When the user inputs a request into the searchBar, the state of the search bar is changed to the value of tuser input */
    handleSearchBarChange(event) {
        this.setState({ searchBar: event.target.value })
    };

    /* When the user selects a media type from the options the state is changed to the selection, if no option is selected the default is all */
    handleMediaSelection(event) {
        this.setState({mediaOption: event.target.value})
    };

    /* When the search button is clicked:
        If the search bar is empty, the user is alerted to enter an item to search for.
        If  the search bar has an input from the user the request is sent to the backend using fetch (post method) 
            the searchBar and mediaOption is set to state and sent to the backend to be used in the api query.
        The results from the API are then set in state in the itemsReturnedFromSearch array
    */
    handleSearchBarSubmit(event) {
        if (this.state.searchBar === "") {
            return alert("Oops! Looks like you're feeling indecisive. Please enter a search item.")
        } 
        this.setState({ itemsReturnedFromSearch: [] });
        event.preventDefault();
        fetch('http://localhost:3001/searchApi/search', {
            method: "POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                searchBar:this.state.searchBar,
                mediaOption:this.state.mediaOption
            })
        })
        .then(res => res.json())
        .then(results => {
            this.setState({ itemsReturnedFromSearch: results })
        })
        .catch(error => {
            alert("An error occured. Please try again later")
            this.setState(error)
        })
    };

    // The function below maps through the array that the requested items were set in state.
    displaySearchResults() {
        const items = this.state.itemsReturnedFromSearch.results;
        return (
            items.map((item) =>
                <DisplayResult
                    key={(item.collectionId + item.trackId)} // See comment below export
                    id={item.collectionId}
                    myKey={(item.artistId + item.trackId)} // myKey is passed as props (key is not passed as props)
                    link={item.trackViewUrl}
                    name={item.trackName}
                    artist={item.artistName}
                    artwork={item.artworkUrl100}
                />
            )
        );
    };

    render() {
        return (
            <div>
                <div className="navBar">
                    <Navbar bg="success" expand="lg" className="mb-4">
                        <Container>
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-3"
                                    aria-label="Search"
                                    onChange={this.handleSearchBarChange}
                                />
                        
                                <Form.Select aria-label="Default select example" className='ms-2' onChange={this.handleMediaSelection} >
                                    <option value='all'>All</option>
                                    <option value='music'>Music</option>
                                    <option value='podcast'>Podcasts</option>
                                    <option value='movie'>Movies</option>
                                    <option value='tvShow'>TV Shows</option>
                                    <option value='shortFilm'>Short Film</option>
                                    <option value='audiobook'>Audiobook</option>
                                    <option value='ebook'>Ebooks</option>
                                </Form.Select>

                                <Button
                                    variant="outline-light"
                                    className='ms-2'
                                    onClick={this.handleSearchBarSubmit}>
                                    Search
                                </Button>
                            </Form>
                        </Container>
                    </Navbar>
                </div>
                <div className='searchResults'>
                    {/* The conditional operator below sets the condition that when the
                    the length of the itemsReturnedFromSearch array is empty (less than 0) then the
                    search results will not be displayed*/}
                    {this.state.itemsReturnedFromSearch.length !== 0 ? <div>{this.displaySearchResults()}</div> : ''}
                </div>
            </div>
        );
    };
};

export default Searchbar;

/* I get this error when I add key into the component: 
    Warning: DisplayResult: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the 
    same value within the child component, you should pass it as a different prop.
 
    ***************** The below extract is taken from: https://reactjs.org/docs/lists-and-keys.html#keys *********************************
    Keys serve as a hint to React but they don’t get passed to your components. If you need the same value in your component, pass it 
    explicitly as a prop with a different name:

    const content = posts.map((post) =>
    <Post
        key={post.id}
        id={post.id}
        title={post.title} />
    );
    With the example above, the Post component can read props.id, but not props.key.
    ****************************************************************************************************************************************
   
   I need to use the key in the other components so I used the name myKey to pass as a prop.

   If I remove the key then I get the following error: 
    Warning: Each child in a list should have a unique "key" prop.
*/