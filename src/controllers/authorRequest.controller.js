const AuthorRequest = require( '../models/AuthorRequest' );
const logger = require( '../log/facadeLogger');

const authorRequestCtrl = { };

// Juan
/*
authorRequestCtrl.addAuthorRequest = async ( req, res ) => {
    try{
        if ( req.user.role != 0 )
            throw "You do not have the required permissions";

        const Author = await AuthorRequest.findById( req.user._id );
​
        if( Author )
            throw "You have already send an author request";
​
        const { email2, professionalCard, employmentHistory, academicHistory } = req.body;
​
        if( !email2 || !professionalCard || !employmentHistory || !academicHistory )
            throw "Incomplete data";
​
        const newAuthorRequest = new AuthorRequest( req.body );
​
        await newAuthorRequest.save( );
​
        return res.status( 201 ).json({
            message: "The author request has been created successfully"
        });
    }catch ( err ) {
        if ( !err.message )
            return res.status( 400 ).json({ message: err });
        else
            return res.status( 400 ).json({
                message: "The author request could not be created"
            });
    }
};
*/
// Valeria
authorRequestCtrl.getAllAuthorRequest = async ( req, res ) => {
    try {
        if ( req.user.role != 2 )
            throw "You do not have the required permissions";

        const authorRequest = await AuthorRequest.find( ).populate({
            path:'userId',
            select:[ 'firstName','lastName' ]
        }).select( 'userId' );

        logger.info( "The requests requested by the user have been successfully retrieved" );
        return res.status( 200 ).json( authorRequest );
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

authorRequestCtrl.getAuthorRequest = async ( req, res ) => {
    try{
        if ( req.user.role != 2 )
            throw "You do not have the required permissions";

        const userId = req.params.userId;
        if ( !userId )
            throw "The required data is incomplete";

        const authorRequest = await AuthorRequest.findOne({ userId: userId });

        logger.info( "The requested request has been successfully retrieved" );
        return res.status( 200 ).json( authorRequest );
    }catch ( err ) {
        if( !err.message ){
            logger.warn( err );
            return res.status( 400 ).json({ message: err });
        } else {
            logger.error( "The id of the requested request does not exist in the system" );
            return res.status( 400 ).json({
                message: "The required request is not found in the system"
            });
        }
    }
};

// Carlos

// Tatiana

module.exports = authorRequestCtrl;