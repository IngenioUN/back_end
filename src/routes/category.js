const { Router } = require( "express" );
const router = Router( );

const {
    // Juan

    // Valeria

    // Carlos

    // Tatiana
    getListCategories,
    getCategories,
    addCategory
} = require( "../controllers/category.controller" );

// Juan

// Valeria

// Carlos

// Tatiana
router
    .route( "/get-all-categories" )
    .get( getCategories );

router
    .route( "/get-list-categories" )
    .get( getListCategories );

const { isAuthenticated } = require( "../helpers/authenticated" );

// Juan

// Valeria

// Carlos

// Tatiana
router
    .route( "/add-category" )
    .post( isAuthenticated, addCategory );

module.exports = router;