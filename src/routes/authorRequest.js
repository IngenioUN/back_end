const { Router } = require("express");
const router = Router();

const {
    // Juan
    addAuthorRequest
    // Valeria

    // Carlos

    // Tatiana

} = require("../controllers/authorRequest.controller");

// Juan
const { isAuthenticated } = require("../helpers/authenticated");

router
    .route("/add-author-request")
    .post(addAuthorRequest)
// Valeria

// Carlos

// Tatiana



// Juan

// Valeria

// Carlos

// Tatiana

module.exports = router;