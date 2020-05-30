const { Router } = require("express");
const router = Router();

const {
    // Juan

    // Valeria

    // Carlos

    // Tatiana
    addPublication
} = require("../controllers/publication.controller");

// Juan

// Valeria

// Carlos

// Tatiana

const { isAuthenticated } = require("../helpers/authenticated");

// Juan

// Valeria

// Carlos

// Tatiana
router
    .route("/add-publication")
    .post(isAuthenticated, addPublication);

module.exports = router;