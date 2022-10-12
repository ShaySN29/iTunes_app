import React, { useEffect } from 'react';
// Import from Bootstrap
import { Button, Card } from 'react-bootstrap';

    /* Functions below checks if item is in favourites by comparing the myKey property (unique property) 
        it returns true or false depending on if the item exist in the favourite list.

        The function is outside of the functional component so I could test the function.
        I used the below links:
        https://waresix.engineering/testing-your-react-component-with-react-testing-library-e40062abaf36
        https://medium.com/the-fours/writing-functions-outside-vs-inside-in-react-c9044ea31ee2#:~:text=Writing%20functions%20outside%20component%20makes,does%20not%20rely%20on%20props.
    */
        function checkIfFavouriteItemExists(favouriteItems, myKey) {
            return favouriteItems.some(element => {
                if (element.myKey === myKey) {
                    return true;
                } else {
                    return false;
                }
            });
        };

// The DisplayResult component displays each of the results from the search into a card
// Props are passed from the SearchBar component
function DisplayResult(props) {
    let favouriteItems = []; // Empty array to store the favourite items in
    
    // If the favouritesList is not in storage then it gets set in storage
    // If the favouritesList is in storage then it is retrieved and parsed
    function initialiseFavouritesList() {
        if (sessionStorage.getItem("favouritesList") === null) {
            sessionStorage.setItem("favouritesList", JSON.stringify(favouriteItems));
        } else {
            favouriteItems = JSON.parse(sessionStorage.getItem("favouritesList"));
        };
    };

    /* useEffect used to prevent an infinite loop.
    I used this link to help: https://www.w3schools.com/react/react_useeffect.asp
    */
    useEffect(() => {
        initialiseFavouritesList();
    }, []);
    


    /* The function below calls the checkIfFavouriteItemExists that is outside the functional
    If the item is in favourites - the user is alerted the item is already in favourites
    If the item is not in favourites then the addToFavourites function is called
    I used this link to assist: https://bobbyhadz.com/blog/javascript-check-if-array-contains-object 
    */
    function isItemInFavourites() {        
        const isFound = checkIfFavouriteItemExists(favouriteItems, props.myKey);

        // If is found is true then the user is alerted that the item is already in favourites else the item is added to favourites
        if (isFound) {
            alert("The item is already in your favourites!");
        } else {
            addToFavourites();
        };
    };

    // The function below adds the item to the favourites list if it does not already exist in the list
    function addToFavourites() {
        // Creating a new object that will be passed into our session storage.
        const newFavouriteItem = {
            id: props.id,
            myKey: props.myKey, 
            link: props.link,
            name: props.name,
            artist: props.artist,
            artwork: props.artwork,
        };

        // Using the array.push() method to add the new favourite item in the favourites array
        favouriteItems.push(newFavouriteItem); 

        // updating session storage
        sessionStorage.setItem("favouritesList", JSON.stringify(favouriteItems));
        
        // Alerting the user that the item has been added
        alert("Your item has been added to Favourites!");
    };

    return (
        <div className="individualCard" key={props.key}>
            <Card style={{ width: '18rem' }} border="success" className="displayCard mb-3 ms-2">
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.artist}</Card.Subtitle>
                    <Card.Img variant="top" src={props.artwork} />
                    <Card.Link href={props.link}>More Details</Card.Link>
                </Card.Body>
                <Button variant="outline-success" onClick={() => isItemInFavourites()}>Add to Favourites</Button>
            </Card>
        </div>
    );
};

// export { DisplayResult, checkIfFavouriteItemExists };
export { DisplayResult, checkIfFavouriteItemExists };