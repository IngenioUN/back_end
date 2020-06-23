const User = require( '../models/User' );
const AuthorRequest = require( '../models/AuthorRequest' );
const logger = require( '../log/facadeLogger');
const passport = require( 'passport' );
const { populate } = require('../models/User');
const Category = require('../models/Category');


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

usersCtrl.addAuthor = async ( req, res, next ) => {
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
        if ( user.role == 1 )
            throw "You are already an author"

        var user2;
        for( var i = 0; i < user.followers.length; i++ ) {
            user2 = await User.findById( user.followers[ i ] );

            for ( var j = 0; j < user2.following.length; j++ ) {
                if ( user2.following[ j ] == user.id ) {
                    user2.following.splice( i, 1 );
                    break
                }
            }
            user2.subscriptionToAuthors.push( user.id );
            await User.findByIdAndUpdate( user2.id, user2 );
        }

        user.role = 1;
        user.email2 = request.email2;
        user.professionalCard = request.professionalCard;
        user.employmentHistory = request.employmentHistory;
        user.academicHistory = request.academicHistory;

        await User.findByIdAndUpdate( userId, user );

        req.body.followers = user.followers;
        return next( );
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

usersCtrl.addPublicationToAuthor = async ( req, res, next ) => {
    try {
        if( req.user.role != 1 )
            throw "You do not have the required permissions";

        var user = await User.findById( req.user.id )
        user.myPublications.push( req.body.publicationId );
        await User.findByIdAndUpdate( req.user.id, user );
        return next( );
    } catch (err) {
        if ( !err.message ) {
            logger.warn( err );
            return res.status( 400 ).json({ message: err });
        } else {
            logger.error( "There is a problem adding the post to the author list" );
            return res.status( 400 ).json({
                message: "There is a problem adding the post to your post list"
            });
        }
    }
};

usersCtrl.addMySavePublications = async ( req, res ) => {
    try {
        if( req.user.role == 2 )
            throw "You do not have the required permissions";

        var user = await User.findById( req.user.id )
        for (var i = 0; i < user.savedPublications.length; i++ ) {
            if ( req.body.publicationId == user.savedPublications[ i ] )
                throw "you already saved this publication"
        }
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
usersCtrl.getAllUserCategories = async ( req, res ) => {
        try {
            if ( req.user.role == 2 )
                throw "You do not have the required permissions";
            var categories;
            if( req.params.userId != "null" )
                categories = await User.findById(req.params.userId).select('subscriptionToCategories');
            else
                categories = await User.findById(req.user.id).select('subscriptionToCategories');

            var categoryId, i;
            var category = {};
            var listCategories = [];
            for( i in categories["subscriptionToCategories"]) {
                categoryId = categories["subscriptionToCategories"][ i ];
                category = await Category.findById( categoryId ).lean().select(['name', 'description', 'publications']);
                category.isSubscribed = 1;
                listCategories.push(category);
            }
            logger.info( "The requests requested by the user have been successfully retrieved" );
            return res.status( 200 ).json( listCategories );
        } catch ( err ) {
            if( !err.message ) {
                logger.warn( err );
                return res.status( 400 ).json({ message: err });
            } else {
                logger.error( "A problem occurred while trying to retrieve requests for all user categories" );
                return res.status( 400 ).json({
                    message: "Could not access"
                });
            }
        }
    }

    usersCtrl.getAllFollowings = async ( req, res ) => {
            try {
                if ( req.user.role == 2 )
                    throw "You do not have the required permissions";
                var followings;
                if( req.params.userId != "null" )
                    followings = await User.findById(req.params.userId).select('following');
                else
                    followings = await User.findById(req.user.id).select('following');

                var followingId, i;
                var following = {};
                var listFollowings = [];
                for( i in followings["following"]) {
                    followingId = followings["following"][ i ];
                    following = await User.findById( followingId ).select(['firstName', 'lastName']);
                    listFollowings.push(following);
                }
                logger.info( "The requests requested by the user have been successfully retrieved" );
                return res.status( 200 ).json( listFollowings );
            } catch ( err ) {
                if( !err.message ) {
                    logger.warn( err );
                    return res.status( 400 ).json({ message: err });
                } else {
                    logger.error( "A problem occurred while trying to retrieve requests for all user followings" );
                    return res.status( 400 ).json({
                        message: "Could not access"
                    });
                }
            }
        }

        usersCtrl.getAllUserAuthors = async ( req, res ) => {
                try {
                    if ( req.user.role == 2 )
                        throw "You do not have the required permissions";

                    var authors;
                    if( req.params.userId != "null" )
                        authors = await User.findById(req.params.userId).select('subscriptionToAuthors');
                    else
                        authors = await User.findById(req.user.id).select('subscriptionToAuthors');

                    var authorId, i;
                    var author = {};
                    var listAuthors = [];
                    for( i in authors["subscriptionToAuthors"]) {
                        authorId = authors["subscriptionToAuthors"][ i ];
                        author = await User.findById( authorId ).lean().select(['firstName', 'lastName']);
                        author.isSubscribed = 1;
                        listAuthors.push(author);
                    }
                    logger.info( "The requests requested by the user have been successfully retrieved" );
                    return res.status( 200 ).json( listAuthors );
                } catch ( err ) {
                    if( !err.message ) {
                        logger.warn( err );
                        return res.status( 400 ).json({ message: err });
                    } else {
                        logger.error( "A problem occurred while trying to retrieve requests for all user followers" );
                        return res.status( 400 ).json({
                            message: "Could not access"
                        });
                    }
                }
            }
// Tatiana

// Any type of user can access this information
usersCtrl.getPersonalData = async ( req, res ) => {
    try{
        console.log("entra");
        var user;
        if ( req.params.id != null )
            user = await User.findById( req.params.userId );
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

        const user = await User.findById( req.user.id );

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
        } else
            throw "Incomplete data"
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
            return res.status( 400 ).json({
                message: message
            });
        }
    }
}

usersCtrl.stopFollowing = async ( req, res, next ) => {
    try {
        if( req.user.role == 2 )
            throw "You do not have the required permissions";

        const user = await User.findById( req.user.id );
        var i = 0;
        if ( req.body.authorId ) {   //for author unsubscription
            if ( !user.subscriptionToAuthors.includes( req.body.authorId ) )
                throw "You are not subscribed to this Author"

            for ( i = 0; i < user.subscriptionToAuthors.length; i++ ) {
                if ( user.subscriptionToAuthors[ i ] == req.body.authorId ) {
                    user.subscriptionToAuthors.splice( i, 1 );
                    break;
                }
            }
            await User.findByIdAndUpdate( req.user.id, user );
            return next( );
        } else if( req.body.categoryId ){          // for category unsubscription
            if ( !user.subscriptionToCategories.includes( req.body.categoryId ) )
                throw "You are not subscribed to this category"

            for ( i = 0; i < user.subscriptionToCategories.length; i++ ) {
                if ( user.subscriptionToCategories[ i ] == req.body.categoryId ) {
                    user.subscriptionToCategories.splice( i, 1 );
                    break;
                }
            }
            await User.findByIdAndUpdate( req.user.id, user );
            return next( );

        } else if ( req.body.userId ) {     // stop following user
            if ( !user.following.includes( req.body.userId ) )
                throw "You are already not following this user"

            for ( i = 0; i < user.following.length; i++ ) {
                 if ( user.following[ i ] == req.body.userId ) {
                        user.following.splice( i, 1 );
                        break;
                    }
                }
            await User.findByIdAndUpdate( req.user.id, user);

            const otherUser = await User.findById( req.body.userId )  //update followers list of the following user
            for ( i = 0; i < otherUser.followers.length; i++ ) {
                if ( otherUser.followers[ i ] == req.body.userId ) {
                        otherUser.followers.splice( i, 1 );
                        break;
                   }
               }
            await User.findByIdAndUpdate( req.body.userId, otherUser);
            logger.info("You are not following this user" )
            return res.status( 200 ).json({
                message: "Now you follow a new user"
            })
        }
        throw "Incomplete data"
    } catch ( err ) {
        if( !err.message ){
            logger.warn( err );
            return res.status( 400 ).json({ message: err });
        } else {
            var message;
            logger.error( "The user entered a wrong id" );
            if ( req.body.authorId )
                message = "The author you are trying to unsubscribe to does not exist"
            if (req.body.categoryId)
                message = "The category you are trying to unsubscribe to does not exist"
            else if ( req.body.userId)
                message = "The user you are trying to stop following does not exist"
            return res.status( 400 ).json({
                message: message
            });
        }
    }
}

usersCtrl.getInfoAuthor = async ( req, res ) => {
    try {
        if ( req.user.role == 2 )
            throw "You do not have the required permissions";

        var author, authorName, authorLastName, authorId, i;

        for( i = 0; i < req.body.response.length; i++ ) {
            authorId = req.body.response[ i ].authorId;
            author = await User.findById( authorId );
            authorName = author.firstName;
            authorLastName = author.lastName;
            req.body.response[ i ].authorName = authorName;
            req.body.response[ i ].authorLastName = authorLastName;
        }
        logger.info( "All notifications were successfully obtained" )
        return res.status( 200 ).json({
            notificationId: req.body.notificationId,
            response: req.body.response
        });
    } catch ( err ) {
        if( !err.message ){
            logger.warn( err );
            return res.status( 400 ).json({ message: err });
        } else {
            logger.error( "The author id does not exist" );
            return res.status( 400 ).json({
                message: "The author does not exist"
            })
        }
    }
}

usersCtrl.getRandomUsers = async ( req, res ) => {
    try {
        if ( req.params.role != null )
            throw "Incomplete data"
        var users = User.find({role: req.params.role});
        var response = [];
        if ( users.length < 10 )
            return res.status( 200 ).json(users)
        else{
            for( var i = 0; i < 10; i++ ) {
                response.push( users[ i ] );
            }
            return res.status( 200 ).json(response);
        }
    } catch ( err ) {
        return res.status( 400 ).json({
            message: "Problem DB"
        })
    }
}

module.exports = usersCtrl;