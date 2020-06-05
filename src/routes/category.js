const { Router } = require("express");
const router = Router();

const {
    // Juan

    // Valeria

    // Carlos

    // Tatiana
    getListCategories,
    getCategories,
    addCategory,
    welcomeCategories
} = require("../controllers/category.controller");

// Juan

// Valeria

// Carlos
//Para probar funcionamiento en Heroku
router
    .route("/welcomeCategories")
    .get(welcomeCategories);
// Tatiana
router
    .route("/get-all-categories")
    .get(getCategories);

router
    .route("/get-list-categories")
    .get(getListCategories);

const { isAuthenticated } = require("../helpers/authenticated");

// Juan

// Valeria

// Carlos

// Tatiana
router
    .route("/add-category")
    .post(isAuthenticated, addCategory);

module.exports = router;