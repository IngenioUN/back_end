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

        console.log(req.body );
        if ( req.body.categoryId )
            notification = await Notification.findOne({ categoryId: req.body.categoryId });
        else if ( req.body.authorId )
            notification = await Notification.findOne({ authorId: req.body.authorId });
        else
            throw "Incomplete data"

        if ( !notification ) {
            const newNotification = new Notification( req.body );
            newNotification.subscribers.push( req.user.id );
            console.log(newNotification);
            await newNotification.save();
        } else {
            notification.subscribers.push( req.user.id );
            console.log(notification);
            await Notification.findByIdAndUpdate( notification.id, notification );
        }

        if( req.body.categoryId )
            logger.info( "User subscribed to a category" )
        else if ( req.body.authorId )
            logger.info( "User subscribed to an author" )

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
        var notification;
        if ( req.user.role == 2 )
            throw "You do not have the required permissions";

        if ( req.body.categoryId )
            notification = await Notification.findOne({ categoryId: req.body.categoryId });
        else if ( req.body.authorId )
            notification = await Notification.findOne({ authorId: req.body.authorId });
        else
            throw "Incomplete data"
        console.log(notification);
        if ( notification ) {
            for ( var i = 0; i < notification.subscribers.length; i++ ) {
                if ( notification.subscribers[ i ] == req.user.id ) {
                    notification.subscribers.splice( i, 1 );
                    break;
                }
            }
            await Notification.findByIdAndUpdate( notification.id, notification );
        } else {
            if ( req.body.categoryId )
                throw "You are not subscribed to this category"
            else if ( req.body.authorId )
                throw "You are not subscribed to this author"
        }

        if( req.body.categoryId )
            logger.info( "User unsubscribed to a category" )
        else if ( req.body.authorId )
            logger.info( "User unsubscribed to an author" )

        return res.status( 200 ).json({
            message: "The unsubscription has been successful"
        })
    } catch ( err ) {
        if( !err.message ){
            logger.warn( err );
            return res.status( 400 ).json({ message: err });
        } else {
        logger.error( "There is a problem deleting the subscription" );
            return res.status( 400 ).json({
                message: "There was a problem with the requested unsubscription"
            })
        }
    }
}
module.exports = notificationCtrl;