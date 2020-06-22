const User = require( '../models/User' );
const AuthorRequest = require( '../models/AuthorRequest' );
const logger = require( '../log/facadeLogger');
const passport = require( 'passport' );
const { populate } = require('../models/User');


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

usersCtrl.getAllAuthors = async ( req, res ) => {
    try {
        if ( req.user.role != 2 )
            throw "You do not have the required permissions";

        const author = await User.find({'role' : 1}).select(['firstName','lastName','myPublications']);
        logger.info( "The requests requested by the user have been successfully retrieved" );
        return res.status( 200 ).json( author );
    } catch ( err ) {
        if( !err.message ) {
            logger.warn( err );
            return res.status( 400 ).json({ message: err });
        } else {
            logger.error( "A problem occurred while trying to retrieve requests for authorship" );
            return res.status( 400 ).json({
                message: "Could not access"
            });
        }
    }
}

usersCtrl.addPublicationToAuthor = async ( req, res ) => {
    try {
        console.log("esta aqui")
        if( req.user.role != 1 )
            throw "You do not have the required permissions";

        var user = await User.findById( req.user.id )
        user.myPublications.push( req.body.publicationId );
        await User.findByIdAndUpdate( req.user.id, user );

        logger.info( "User successfully added a mypublication" );
        return res.status( 200 ).json({
            message: "The publication was successfully added"
        })
    } catch (err) {
        if ( !err.message ) {
            logger.warn( err );
            return res.status( 400 ).json({ message: err });
        } else {
            logger.error( "Could not create author request successfully" );
            return res.status( 400 ).json({
                message: "The author request could not be created"
            });
        }
    }
};

usersCtrl.addMySavePublications = async ( req, res ) => {
    try {
        if( req.user.role == 2 )
            throw "You do not have the required permissions";

        var user = await User.findById( req.user.id )
        console.log("ahora aqui")
        user.savedPublications.push( req.body.publicationId);
        await User.findByIdAndUpdate( req.user.id, user );

        logger.info( "User successfully save a publication" );
        return res.status( 200 ).json({
            message: "The publication was successfully added"
        })
    } catch ( err ) {
        logger.error( "The category ID does not exist on the platform" );
        return res.status( 400 ).json({
            message: "Category does no exist"
        })
    }
}


usersCtrl.getAllSavedPublications = async ( req, res ) => {
    try {
        if ( req.user.role == 2 )
            throw "You do not have the required permissions";

        const user = await User.findById(req.user.id).populate({
            path:'savedPublications',
            select:[ 'title','listCategories','abstract','authorId']
        }).select('savedPublications')
        logger.info( "The requests requested by the user have been successfully retrieved" );
        return res.status( 200 ).json(user);
    } catch ( err ) {
        if( !err.message ) {
            logger.warn( err );
            return res.status( 400 ).json({ message: err });
        } else {
            logger.error( "A problem occurred while trying to retrieve requests for authorship" );
            return res.status( 400 ).json({
                message: "Could not access"
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

usersCtrl.startFollowing = async ( req, res, next ) => {
    try {
        if( req.user.role == 2 )
            throw "You do not have the required permissions";

        const user = await User.findById( req.user.id )

        if( req.body.categoryId ){          // for category subscription
            if ( user.subscriptionToCategories.includes( req.body.categoryId ) )
                throw "You are already subscribed to this category"

            user.subscriptionToCategories.push( req.body.categoryId );
            await User.findByIdAndUpdate( req.user.id, user );
            return next( );
        } else if ( req.body.authorId ) {   //for author subscription
            if ( user.subscriptionToAuthors.includes( req.body.authorId ) )
                throw "You are already subscribed to this author"

            user.subscriptionToAuthors.push( req.body.authorId );
            await User.findByIdAndUpdate( req.user.id, user );
            return next( );
        } else if ( req.body.userId ) {                // follow user
            if ( user.following.includes( req.body.userId ) )
                throw "You are already following this user"

            user.following.push( req.body.userId)
            await User.findByIdAndUpdate( req.user.id, user);

            const otherUser = await User.findById( req.body.userId )  //update followers list of the following user
            otherUser.followers.push( req.user.id);
            await User.findByIdAndUpdate( req.body.userId, otherUser);
            logger.info("User now following another user" )
            return res.status( 200 ).json({
                message: "The subscription has been successful"
            })
        }
    } catch ( err ) {
        if( !err.message ){
            logger.warn( err );
            return res.status( 400 ).json({ message: err });
        } else {
            var message;
            logger.error( "The user entered a wrong id" );
            if (req.body.categoryId)
                message = "The category you are trying to subscribe to does not exist"
            else if ( req.body.authorId )
                message = "The author you are trying to subscribe to does not exist"
            else if ( req.body.userId)
                message = "The user you are trying to follow does not exist"
            else
                message = "Sorry! but our Princess is in another castle!"

            return res.status( 400 ).json({
                message: message
            });
        }
    }
}

module.exports = usersCtrl;