const { Router } = require( "express" );
const router = Router( );

const {
    // Juan
    getAllUserCategories,
    getAllFollowings,
    // Valeria
    addAuthor,
    getAllUsers,
    getAllAuthors,
    addMySavePublications,
    getAllSavedPublications,
    // Carlos

    // Tatiana
    getPersonalData,
    startFollowing,
    stopFollowing
} = require( "../controllers/user.controller" );

const {
    subscribe,
    unsubscribe,
    createSubscribers
} = require( "../controllers/notification.controller" )

// Juan

// Valeria

// Carlos

// Tatiana

const { isAuthenticated } = require( "../helpers/authenticated" );
const { route } = require("./session");

// Juan
router
    .route( "/get-user-categories/:userId")
    .get( isAuthenticated, getAllUserCategories)

 router
    .route( "/get-following/:userId")
    .get( isAuthenticated, getAllFollowings)
// Valeria
router
    .route( "/add-author" )
    .put( isAuthenticated, addAuthor, createSubscribers )

router
    .route( "/get-users" )
    .get( isAuthenticated, getAllUsers )

router
    .route( "/get-authors" )
    .get( isAuthenticated, getAllAuthors )

router
    .route( "/add-save-publication" )
    .post( isAuthenticated, addMySavePublications );

router
    .route( "/get-save-publication" )
    .get( isAuthenticated, getAllSavedPublications );
// Carlos

// Tatiana
router
    .route( "/get-personal-data" )
    .get( isAuthenticated, getPersonalData )

router
    .route( "/start-following" )
    .post( isAuthenticated, startFollowing, subscribe )

router
    .route( "/stop-following" )
    .post( isAuthenticated, stopFollowing, unsubscribe )

module.exports = router;