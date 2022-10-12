const express = require('express');
const router = express.Router();

// Post request passes the request from the search in the frontend to the backend
// The backend then fetches the data from the API and then sends it back to the frontend
router.post('/search', (req, res) => {
    let termFromSearch = req.body.searchBar;
    let media = req.body.mediaOption;
    let term = termFromSearch.split(" ").join("+"); // Changes the format of the search to suit the API

    fetch(`https://itunes.apple.com/search?term=${term}&media=${media}`)
    .then(res => res.json())
    .then(
        (data) => {
            console.log(data)
        res.send(data)
        })
    .catch(error => {
        res.send(error);
    });
});

module.exports = router;

