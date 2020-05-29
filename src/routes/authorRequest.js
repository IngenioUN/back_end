const { Router } = require("express");
const router = Router();

const {
    // Juan
    addAuthorRequest,
    // Valeria
    getAuthorRequest,
    getAllAuthorRequest
    // Carlos
    
    // Tatiana

} = require("../controllers/authorRequest.controller");

// Juan
const { isAuthenticated } = require("../helpers/authenticated");

router
    .route("/add-author-request")
    .post(isAuthenticated, addAuthorRequest)
// Valeria

// Carlos

// Tatiana



// Juan

// Valeria
router
    .route("/get-author-request")
    .get(  getAuthorRequest)
router
    .route("/get-all-author-requests")
    .get( getAllAuthorRequest);

// Carlos

// Tatiana

module.exports = router;