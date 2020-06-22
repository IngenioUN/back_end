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
} = require( "../controllers/user.controller" );

const {
    updateNotifications
} = require( "../controllers/notification.controller" );

const {
    updatePublications
} = require( "../controllers/category.controller" );
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
    .post( isAuthenticated, addPublication, addPublicationToAuthor, updateNotifications, updatePublications );

module.exports = router;