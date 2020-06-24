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
    .route( '/get-notifications/:authorId/:categoryId' )
    .get( isAuthenticated, getAllNotifications );

router
    .route( '/remove-notification' )
    .post( isAuthenticated, removeNotification );

router
    .route( '/remove-all-notifications' )
    .post( isAuthenticated, removeAllNotifications );

module.exports = router;