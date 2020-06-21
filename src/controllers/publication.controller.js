const Publication = require( '../models/Publication' );
const logger = require( '../log/facadeLogger');

const publicationsCtrl = { };

// Juan

// Valeria

// Carlos

// Tatiana
publicationsCtrl.addPublication = async ( req, res ) => {
    try{
        if ( req.user.role != 1 )
            throw "You do not have the required permissions";

        const { title, abstract, keyWords, text } = req.body;
        if( !title || !abstract || !keyWords || !text )
            throw "The required data is incomplete";

        const newPublication = new Publication(req.body);
        newPublication.authorId = req.user.id;
        await newPublication.save( );

        logger.info( "User successfully added a publication" );
        return res.status( 200 ).json({
            message: "The publication was successfully added"
        })
    }catch ( err ) {
        if( !err.message ){
            logger.warn( err );
            return res.status( 400 ).json({ message: err });
        } else {
            logger.error( "There was a problem creating a post" );
            return res.status( 400 ).json({
                message: "Some of the categories do not exist on the platform"
            });
        }
    }
};

// Any user can make this request
publicationsCtrl.getSummaryOfPublications = async ( req, res ) => {
    try {
        var publications;
        if( req.params.categoryId != "null" )
            publications = await Publication.find({
                listCategories: req.params.categoryId
            }, {
                date: 1,
                title: 1,
                abstract: 1,
                listCategories: 1
            });
        else
            publications = await Publication.find({ },{
                date: 1,
                title: 1,
                abstract: 1,
                listCategories: 1
            });
        logger.info( "The publications required by the user have been successfully retrieved" );
        return res.status( 200 ).json( publications );
    } catch ( err ) {
        logger.error( "The category ID does not exist on the platform" );
        return res.status( 400 ).json({
            message: "Category does no exist"
        })
    }
}

// Any user can make this request
publicationsCtrl.getPublication = async ( req, res ) => {
    try {
        const publicationId = req.body.id;
        if ( !publicationId )
            throw "Incomplate data";
        const publication = await Publication.findById( publicationId );

        logger.info( "The publication required by the user has been successfully retrieved" );
        return res.status( 200 ).json( publication );
    } catch ( err ) {
        if( !err.message ) {
            logger.warn( "The user has not sent all the required data" );
            return res.status( 400 ).json({ message: err });
         } else {
            logger.error( "The id of the required post does not exist in the system" );
            return res.status( 400 ).json({
                message: "The publication you request does not exist"
            });
         }
    }
}

module.exports = publicationsCtrl;