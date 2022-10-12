const express = require("express");
const router = express.Router();

// Test if the server is online
router.get("/test", function(req, res, next) {
    res.send("Server is online");
});

module.exports = router;

/* This link was helpful: 
 https://medium.com/free-code-camp/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c */