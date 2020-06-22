const { Router } = require( "express" );
const router = Router( );

const {
    // Juan

    // Valeria
    addAuthor,
    getAllUsers,
    getAllAuthors,
    // Carlos

    // Tatiana
    getPersonalData,
    startFollowing
} = require( "../controllers/user.controller" );

const {
    startSubscription
} = require( "../controllers/notification.controller" )
// Juan

// Valeria

// Carlos

// Tatiana

const { isAuthenticated } = require( "../helpers/authenticated" );

// Juan

// Valeria
router
    .route( "/add-author" )
    .put( isAuthenticated, addAuthor )

router
    .route( "/get-users" )
    .get( isAuthenticated, getAllUsers )

router
    .route( "/get-authors" )
    .get( isAuthenticated, getAllAuthors )
// Carlos

// Tatiana
router
    .route( "/get-personal-data" )
    .get( isAuthenticated, getPersonalData )

router
    .route( "/start-following" )
    .post( isAuthenticated, startFollowing, startSubscription )

module.exports = router;