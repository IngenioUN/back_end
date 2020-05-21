const { Router } = require("express");
const router = Router();

const {
    // Juan

    // Valeria

    // Carlos

    // Tatiana
    getPersonalData
} = require("../controllers/user.controller");

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
    .route("/get-personal-data")
    .get(isAuthenticated, getPersonalData)

module.exports = router;