const { Router } = require( "express" );
const router = Router( );

const {
    // Juan

    // Valeria

    // Carlos

    // Tatiana
    removeAllNotifications,
    removeNotification,
    getAllNotifications

} = require( "../controllers/notification.controller" );

const { getInfoPublications } = require( "../controllers/publication.controller" );
const { getInfoCategories } = require( "../controllers/category.controller" );
const { getInfoAuthor } = require( "../controllers/user.controller" );
// Juan

// Valeria

// Carlos

// Tatiana

const { isAuthenticated } = require( "../helpers/authenticated" );

// Juan

// Valeria

// Carlos

// Tatiana

router
    .route( '/get-notifications/:auhtorId/:categoryId' )
    .get( isAuthenticated, getAllNotifications, getInfoPublications, getInfoCategories, getInfoAuthor );

router
    .route( '/remove-notification' )
    .post( isAuthenticated, removeNotification );

router
    .route( '/remove-all-notifications' )
    .post( isAuthenticated, removeAllNotifications );

module.exports = router;