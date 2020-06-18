const helpers = { };

helpers.isAuthenticated = ( req, res, next ) => {
    if ( req.isAuthenticated( ) ) return next ( );
    return res.status( 401 ).json({
        message: "The user is not logged in to the platform"
    });
}

helpers.isLogged = ( req, res, next ) => {
    if ( !req.isAuthenticated( ) ) return next ( );
    return res.status( 400 ).json({
        message: "The user has already logged in to the platform"
    });
}

module.exports = helpers;