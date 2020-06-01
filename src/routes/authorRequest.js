const { Router } = require("express");
const router = Router();

const {
    // Juan
    
    // Valeria
    getAuthorRequest,
    getAllAuthorRequest
    // Carlos
    
    // Tatiana

} = require("../controllers/authorRequest.controller");

// Juan
const { isAuthenticated } = require("../helpers/authenticated");

// Valeria

// Carlos

// Tatiana



// Juan

// Valeria
router
    .route("/get-author-request/:userId")
    .get(  getAuthorRequest)
router
    .route("/get-all-author-requests")
    .get( getAllAuthorRequest);

// Carlos

// Tatiana

module.exports = router;