const { Router } = require( "express" );
const passport = require( 'passport' );
const router = Router( );

const {
    signup,
    signin,
    signout
} = require( "../controllers/user.controller" );

router
    .route( "/signup" )
    .post( signup );

const { isLogged, isAuthenticated } = require( "../helpers/authenticated" );

router
    .route( "/signin" )
    .post( isLogged, signin );

router
    .route( "/signout" )
    .get( isAuthenticated, signout );

module.exports = router;