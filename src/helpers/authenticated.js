const helpers = { };

helpers.isAuthenticated = ( req, res, next ) => {
    if ( req.isAuthenticated( ) ) return next ( );
    return res.status( 401 ).json({
        message: "The user is not logged in to the platform"
    });
}

module.exports = helpers;