const Notification = require( '../models/Notification' );
const logger = require( '../log/facadeLogger');

const notificationCtrl = { };

// Juan

// Valeria

// Carlos

// Tatiana

notificationCtrl.subscribe = async ( req, res ) => {
    try {
        var notification;
        if ( req.user.role == 2 )
            throw "You do not have the required permissions";

        const newNotification = new Notification( req.body );
        newNotification.userId = req.user.id;
        await newNotification.save();

        if( req.body.categoryId )
            logger.info( "User subscribed to a category" )
        else if ( req.body.authorId )
            logger.info( "User subscribed to an author" )
        else
            throw "Incomplete data"

        return res.status( 200 ).json({
            message: "The subscription has been successful"
        })
    } catch ( err ) {
        if( !err.message ){
            logger.warn( err );
            return res.status( 400 ).json({ message: err });
        } else {
            logger.error( "there is a problem registering subscription notifications" );
            return res.status( 400 ).json({
                message: "There was a problem with the requested subscription"
            })
        }
    }
}

notificationCtrl.unsubscribe = async ( req, res ) => {
    try {
        if ( req.user.role == 2 )
            throw "You do not have the required permissions";

        if ( req.body.categoryId )
            await Notification.findOneAndRemove({
                categoryId: req.body.categoryId,
                userId: req.user.id
            });
        else if ( req.body.authorId )
            await Notification.findOneAndRemove({
                authorId: req.body.authorId,
                userId: req.user.id
            });
        else
            throw "Incomplete data"

        if ( req.body.authorId )
            logger.info( "User unsubscribed to an author" )
        if( req.body.categoryId )
            logger.info( "User unsubscribed to a category" )

        return res.status( 200 ).json({
            message: "The unsubscription has been successful"
        })
    } catch ( err ) {
        var message;
        if( err.message ){
            if ( req.body.categoryId )
                message = "You are not subscribed to this category"
            else
                message = "You are not subscribed to this author"
            logger.error( "User entered an invalid subscription id" );
            return res.status( 400 ).json({
                message: message
            })
        } else {
            logger.warn( err );
            return res.status( 400 ).json({ message: err });
        }
    }
}
module.exports = notificationCtrl;