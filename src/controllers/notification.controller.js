const Notification = require( '../models/Notification' );
const logger = require( '../log/facadeLogger');

const notificationCtrl = { };

// Juan

// Valeria

// Carlos

// Tatiana

notificationCtrl.startSubscription = ( req, res ) => {
    try {
        if ( req.user.role == 2 )
            throw "You do not have the required permissions";

        const newNotification = new Notification( req.body );
        newNotification.userId = req.user.id;
        newNotification.save();

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

module.exports = notificationCtrl;