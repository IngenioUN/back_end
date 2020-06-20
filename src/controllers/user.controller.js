const User = require( '../models/User' );
const AuthorRequest = require( '../models/AuthorRequest' );
const logger = require( '../log/facadeLogger');
const passport = require( 'passport' );


const usersCtrl = { };

usersCtrl.signup = function ( req, res, next ) {
    passport.authenticate( "local-signup", function( err, user, info ) {
        if ( user ) {
            req.logIn( user, function ( error ) {
                if ( error )
                    return next ( error );
            })
            logger.info(info.message);
            return res.status( info.status ).json({
                id: user.id,
                role: user.role,
                message: info.message
            });
        }
        logger.warn(info.message);
        return res.status( info.status ).json({ message: info.message });
    })( req, res, next );
}

usersCtrl.signin = function ( req, res, next ) {
    passport.authenticate( "local-signin", function ( err, user, info ) {
        if ( user ) {
            req.logIn( user, function ( error ) {
                if( error )
                    return next ( error );
            })
            logger.info(info.message);
            return res.status( info.status ).json({
                message: info.message,
                role: user.role,
                id: user.id
            });
        }
        logger.warn(info.message);
        return res.status( info.status ).json({ message: info.message });
    })( req, res, next );
}

usersCtrl.signout = ( req, res ) => {
    req.logout( );
    logger.info( "The user has successfully logged out" );
    return res.status( 200 ).json({ message: "Bye" });
}

// Valeria

usersCtrl.addAuthor = async ( req, res ) => {
    try {
        if ( req.user.role != 2 ) {
            logger.warn( "The user does not have the required permissions" );
            return res.status( 401 ).json({
                message: "You do not have the required permissions"
            });
        }

        const { userId } = req.body;
        if ( !userId )
            throw "Incomplete data";
        const request = await AuthorRequest.findOne({ userId: userId });

        if ( !request )
            throw "No exist request";
        var user = await User.findById( userId );
        if ( !user )
            throw "no exits";

        user.role = 1;
        user.email2 = request.email2;
        user.professionalCard = request.professionalCard;
        user.employmentHistory = request.employmentHistory;
        user.academicHistory = request.academicHistory;

        await User.findByIdAndUpdate( userId, user );

        logger.info( "A new author has been added to the system" );
        return res.status( 200 ).json({
            message: "The operation was successful"
        });
    } catch ( err ) {
        if ( !err.message ) {
            logger.warn(err);
            return res.status( 400 ).json({ message: err });
        } else {
            logger.error( "Problem with the database" );
            return res.status( 400 ).json({
                message: err.message
            });
        }
    }
};

usersCtrl.getAllUsers = async ( req, res ) => {
    try {
        if ( req.user.role != 2 )
            throw "You do not have the required permissions";

        const user = await User.find({'role' : 0}).select(['firstName','lastName','email1']);

        logger.info( "The requests requested by the user have been successfully retrieved" );
        return res.status( 200 ).json( user );
    } catch ( err ) {
        if( !err.message ) {
            logger.warn( err );
            return res.status( 400 ).json({ message: err });
        } else {
            logger.error( "A problem occurred while trying to retrieve requests for authorship" );
            return res.status( 400 ).json({
                message: "Could not access"
            });
        }
    }
}
// Carlos

// Juan

// Tatiana

// Any type of user can access this information
usersCtrl.getPersonalData = async ( req, res ) => {
    try{
        var user;
        if ( req.body.id )
            user = await User.findById( req.body.id );
        else
            user = await User.findById( req.user.id );
        const { firstName, lastName, email1, description, role } = user;

        logger.info("The required data has been successfully obtained");
        return res.status( 200 ).json({
            firstName, lastName, email1, description, role
        });
    }catch ( err ) {
        logger.warn("The data you are requesting does not exist on the platform");
        return res.status( 400 ).json({
            message: "The user is not registered on the platform"
        });
    }
}

module.exports = usersCtrl;