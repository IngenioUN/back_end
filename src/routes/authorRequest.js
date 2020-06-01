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
/*
router
    .route("/add-author-request")
    .post(addAuthorRequest);
*/
// Valeria

// Carlos

// Tatiana

const { isAuthenticated } = require("../helpers/authenticated");

// Juan

// Valeria
router
    .route("/get-author-request/:userId")
    .get(getAuthorRequest);
router
    .route("/get-all-author-requests")
    .get(getAllAuthorRequest);

// Carlos

// Tatiana

module.exports = router;