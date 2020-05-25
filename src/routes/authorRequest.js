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

// Valeria

// Carlos

// Tatiana

const { isAuthenticated } = require("../helpers/authenticated");

// Juan

// Valeria
router
    //with params
    //.route("/get-author-request/:id")
    //.get(isAuthenticated, getAuthorRequest)

    .route("/get-author-request")
    .get( getAuthorRequest)
router
    .route("/get-all-author-requests")
    .get(isAuthenticated, getAllAuthorRequest);

router
    .route("/add-author-request")
    .post(isAuthenticated, addAuthorRequest);
// Carlos

// Tatiana

module.exports = router;