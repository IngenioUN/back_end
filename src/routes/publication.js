const { Router } = require( "express" );
const router = Router( );

const {
    // Juan

    // Valeria

    // Carlos

    // Tatiana
    getSummaryOfPublications,
    getPublication,
    addPublication
} = require( "../controllers/publication.controller" );

const {
    addPublicationToAuthor
} = require( "../controllers/user.controller" )

// Juan

// Valeria

// Carlos

// Tatiana

router
    .route( "/get-publication" )
    .get( getPublication );

router
    .route( "/get-all-publications/:categoryId" )
    .get( getSummaryOfPublications );

const { isAuthenticated } = require( "../helpers/authenticated" );

// Juan

// Valeria

// Carlos

// Tatiana
router
    .route( "/add-publication" )
    .post( isAuthenticated, addPublication,addPublicationToAuthor );

module.exports = router;