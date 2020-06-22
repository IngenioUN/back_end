const { Router } = require( "express" );
const router = Router( );

const {
    // Juan
    addAuthorRequest,
    // Valeria
    getAuthorRequest,
    getAllAuthorRequest,
    removeAuthorRequest,
    // Carlos

    // Tatiana
    newAuthorRequest
} = require( "../controllers/authorRequest.controller" );

// Juan

// Valeria

// Carlos

// Tatiana

const { isAuthenticated } = require( "../helpers/authenticated" );

// Juan

router
    .route("/add-author-request")
    .post( isAuthenticated, addAuthorRequest);

// Valeria
router
    .route( "/get-author-request/:userId" )
    .get( isAuthenticated, getAuthorRequest );
router
    .route( "/get-all-author-requests" )
    .get( isAuthenticated, getAllAuthorRequest );
router
    .route("/remove-author-request")
    .delete( isAuthenticated, removeAuthorRequest);

// Carlos

// Tatiana

module.exports = router;